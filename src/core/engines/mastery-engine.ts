import {
  ItemMasteryRecord,
  MasteryLevel,
  MASTERY_LEVEL_CONFIG,
  SpacedReviewQueueItem
} from '../types/learning';

export class MasteryEngine {
  /**
   * Initializes a new ItemMasteryRecord at Mastery Level 0 (New).
   */
  static createItemRecord(params: {
    id: string;
    itemId: string;
    itemType: 'vocabulary' | 'grammar' | 'phrase' | 'exercise';
    german: string;
    translation: string;
    explanation?: string;
    gender?: 'der' | 'die' | 'das';
  }): ItemMasteryRecord {
    const today = new Date().toISOString().split('T')[0];
    return {
      id: params.id,
      itemId: params.itemId,
      itemType: params.itemType,
      german: params.german,
      translation: params.translation,
      explanation: params.explanation,
      gender: params.gender,
      correctAnswers: 0,
      incorrectAnswers: 0,
      lastReview: null,
      nextReview: today, // New items are due immediately
      interval: 0,
      mastery: 0, // 0: new
      errorStreak: 0,
      easeFactor: 2.5
    };
  }

  /**
   * Updates an item's mastery metrics following a review trial.
   * Levels:
   * 0: new -> 1: learning -> 2: familiar -> 3: good -> 4: strong -> 5: mastered
   */
  static updateMastery(
    record: ItemMasteryRecord,
    isCorrect: boolean,
    now: Date = new Date()
  ): ItemMasteryRecord {
    const updated: ItemMasteryRecord = {
      ...record,
      lastReview: now.toISOString()
    };

    if (isCorrect) {
      updated.correctAnswers += 1;
      updated.errorStreak = 0;

      // Advance mastery level (0 to 5)
      const nextLevel = Math.min(5, (updated.mastery + 1) as MasteryLevel) as MasteryLevel;
      updated.mastery = nextLevel;

      // Expand interval based on configuration
      const config = MASTERY_LEVEL_CONFIG[nextLevel];
      updated.interval = config.intervalDays;
    } else {
      updated.incorrectAnswers += 1;
      updated.errorStreak += 1;

      // Demote mastery on error:
      // If was 5 (mastered), demotes to 3 (good)
      // If was 4 (strong), demotes to 2 (familiar)
      // If was 2 or 3, drops back to 1 (learning)
      // If was 0 or 1, remains at 1 (learning)
      let demotedLevel: MasteryLevel = 1;
      if (updated.mastery >= 5) {
        demotedLevel = 3;
      } else if (updated.mastery === 4) {
        demotedLevel = 2;
      } else {
        demotedLevel = 1;
      }
      updated.mastery = demotedLevel;

      // Reset interval to 1 day for prompt repetition
      updated.interval = 1;
    }

    // Compute next review date
    const nextDate = new Date(now.getTime() + updated.interval * 86400000);
    updated.nextReview = nextDate.toISOString().split('T')[0];

    return updated;
  }

  /**
   * Priority score calculation for Spaced Review Scheduler.
   * HIGHEST PRIORITY is given to items the user REPEATEDLY gets wrong.
   */
  static calculatePriorityScore(record: ItemMasteryRecord, todayStr: string): { score: number; reason: SpacedReviewQueueItem['reason']; daysOverdue: number } {
    const isDue = record.nextReview <= todayStr;
    const diffTime = new Date(todayStr).getTime() - new Date(record.nextReview).getTime();
    const daysOverdue = isDue ? Math.max(0, Math.floor(diffTime / 86400000)) : 0;

    // 1. Heavy weighting for repeated errors
    const errorRatio = record.incorrectAnswers / Math.max(1, record.correctAnswers + record.incorrectAnswers);
    const repeatedErrorPenalty = (record.incorrectAnswers * 35) + (record.errorStreak * 50) + Math.round(errorRatio * 60);

    // 2. Mastery deficit (lower mastery = higher urgency)
    const masteryDeficit = (5 - record.mastery) * 20;

    // 3. Overdue urgency
    const dueBonus = isDue ? 100 + (daysOverdue * 15) : -50;

    const score = repeatedErrorPenalty + masteryDeficit + dueBonus;

    let reason: SpacedReviewQueueItem['reason'] = 'due';
    if (record.errorStreak > 1 || record.incorrectAnswers > 2) {
      reason = 'error_streak';
    } else if (record.mastery <= 1) {
      reason = record.lastReview === null ? 'new_item' : 'low_mastery';
    } else {
      reason = 'due';
    }

    return { score, reason, daysOverdue };
  }

  /**
   * Spaced Review Scheduler:
   * Returns an ordered queue of items scheduled for review,
   * STRICTLY prioritizing items the user repeatedly gets wrong.
   */
  static scheduleSpacedReviews(
    records: ItemMasteryRecord[],
    options?: {
      maxItems?: number;
      currentDate?: string;
      includeNonDueIfEmpty?: boolean;
    }
  ): SpacedReviewQueueItem[] {
    const todayStr = options?.currentDate || new Date().toISOString().split('T')[0];
    const maxItems = options?.maxItems || 20;

    const scoredItems: SpacedReviewQueueItem[] = records.map(record => {
      const { score, reason, daysOverdue } = this.calculatePriorityScore(record, todayStr);
      return {
        record,
        priorityScore: score,
        isDue: record.nextReview <= todayStr,
        daysOverdue,
        reason
      };
    });

    // Filter candidate items: items due today OR items the user repeatedly gets wrong
    let candidateItems = scoredItems.filter(
      item => item.isDue || item.record.errorStreak > 0 || item.record.incorrectAnswers >= 2
    );

    // If no candidate items found but user requested a review session
    if (candidateItems.length === 0 && options?.includeNonDueIfEmpty) {
      candidateItems = scoredItems;
    }

    // Sort: highest priority score first (repeated errors, high error streaks, low mastery, overdue)
    candidateItems.sort((a, b) => b.priorityScore - a.priorityScore);

    return candidateItems.slice(0, maxItems);
  }

  /**
   * Summary statistics of user's mastery distribution (0-5)
   */
  static getMasteryStats(records: ItemMasteryRecord[]): {
    total: number;
    distribution: Record<MasteryLevel, number>;
    dueCount: number;
    troubleItemsCount: number; // items with repeated errors
  } {
    const todayStr = new Date().toISOString().split('T')[0];
    const distribution: Record<MasteryLevel, number> = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    let dueCount = 0;
    let troubleItemsCount = 0;

    for (const rec of records) {
      distribution[rec.mastery] = (distribution[rec.mastery] || 0) + 1;
      if (rec.nextReview <= todayStr) {
        dueCount++;
      }
      if (rec.incorrectAnswers >= 2 || rec.errorStreak >= 2) {
        troubleItemsCount++;
      }
    }

    return {
      total: records.length,
      distribution,
      dueCount,
      troubleItemsCount
    };
  }
}
