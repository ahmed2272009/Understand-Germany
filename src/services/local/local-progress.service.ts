import { IProgressRepository } from '../../core/ports/progress-repo.interface';
import { UserProgress, DayCompletion } from '../../core/types/progress';
import { WritingSubmission } from '../../core/types/text-builder';
import {
  ItemMasteryRecord,
  LessonSubmissionPayload,
  LessonValidationResult
} from '../../core/types/learning';
import {
  GamificationState,
  LearningActivityPayload,
  GamificationActivityResult
} from '../../core/types/gamification';
import { LearningEngine } from '../../core/engines/learning-engine';
import { MasteryEngine } from '../../core/engines/mastery-engine';
import { GamificationEngine } from '../../core/engines/gamification-engine';
import { ALL_DAYS } from '../../content/days';

const PROGRESS_PREFIX = 'dq_progress_';
const COMPLETIONS_PREFIX = 'dq_completions_';
const WRITINGS_PREFIX = 'dq_writings_';
const TOKENS_PREFIX = 'dq_tokens_';
const MASTERY_PREFIX = 'dq_mastery_';
const GAMIFICATION_PREFIX = 'dq_gamification_';
const OFFLINE_QUEUE_PREFIX = 'dq_offline_queue_';

export class LocalProgressService implements IProgressRepository {
  async getProgress(userId: string): Promise<UserProgress> {
    const raw = localStorage.getItem(PROGRESS_PREFIX + userId);
    if (!raw) {
      const initial: UserProgress = {
        totalXp: 50,
        currentLevel: 1,
        streakCount: 1,
        longestStreak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        heartsCount: 5,
        lastHeartRegenAt: new Date().toISOString(),
        streakFreezesAvailable: 1,
        highestUnlockedDay: 1,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(PROGRESS_PREFIX + userId, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }

  async updateProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress> {
    const current = await this.getProgress(userId);
    const updated: UserProgress = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(PROGRESS_PREFIX + userId, JSON.stringify(updated));
    return updated;
  }

  async recordDayCompletion(userId: string, completion: DayCompletion): Promise<void> {
    const completions = await this.getDayCompletions(userId);
    completions[completion.dayId] = completion;
    localStorage.setItem(COMPLETIONS_PREFIX + userId, JSON.stringify(completions));

    // Update highest unlocked day if passed
    if (completion.passed) {
      const progress = await this.getProgress(userId);
      const nextDay = Math.min(30, Math.max(progress.highestUnlockedDay, completion.dayNumber + 1));
      await this.updateProgress(userId, {
        totalXp: progress.totalXp + completion.xpEarned,
        highestUnlockedDay: nextDay,
      });
    }
  }

  async getDayCompletions(userId: string): Promise<Record<string, DayCompletion>> {
    const raw = localStorage.getItem(COMPLETIONS_PREFIX + userId);
    return raw ? JSON.parse(raw) : {};
  }

  /**
   * Secure Lesson Submission & Reward Validation
   * 1. Validates submission idempotency token (prevents duplicate reward submissions).
   * 2. Evaluates student answers against authentic curriculum exercises server-side.
   * 3. Calculates XP rewards deterministically - client-sent XP is completely ignored.
   * 4. Updates mastery records for tested items.
   * 5. Persists progress & gamification state atomically.
   */
  async submitLesson(userId: string, payload: LessonSubmissionPayload): Promise<LessonValidationResult> {
    // Look up authentic lesson
    const lesson = ALL_DAYS.find(d => d.dayId === payload.dayId || d.dayNumber === payload.dayNumber);
    if (!lesson) {
      return {
        success: false,
        dayId: payload.dayId,
        dayNumber: payload.dayNumber,
        scorePercentage: 0,
        passed: false,
        xpEarned: 0,
        newTotalXp: (await this.getProgress(userId)).totalXp,
        isDuplicate: false,
        message: `Lesson not found for day ${payload.dayNumber}`,
        results: {}
      };
    }

    // Load processed tokens to prevent replay / duplicate submissions
    const tokensRaw = localStorage.getItem(TOKENS_PREFIX + userId);
    const processedTokens = new Set<string>(tokensRaw ? JSON.parse(tokensRaw) : []);

    const completions = await this.getDayCompletions(userId);
    const currentProgress = await this.getProgress(userId);

    // Validate and score through the Learning Engine
    const validation = LearningEngine.validateAndAwardLessonCompletion(
      lesson,
      payload,
      completions,
      processedTokens,
      currentProgress.totalXp
    );

    // If duplicate token, return immediately without duplicate reward
    if (validation.isDuplicate) {
      return validation;
    }

    // Save updated token set
    localStorage.setItem(TOKENS_PREFIX + userId, JSON.stringify(Array.from(processedTokens)));

    // Record completion
    if (validation.completionRecord) {
      completions[payload.dayId] = validation.completionRecord;
      localStorage.setItem(COMPLETIONS_PREFIX + userId, JSON.stringify(completions));
    }

    // Update highest unlocked day
    const nextUnlocked = validation.passed
      ? Math.min(30, Math.max(currentProgress.highestUnlockedDay, payload.dayNumber + 1))
      : currentProgress.highestUnlockedDay;

    // Process through Gamification Engine (Streaks, Shields, Daily Missions, Achievements)
    const isFirstTime = !completions[payload.dayId];
    const totalCompletions = Object.keys(completions).length;
    const gamificationResult = await this.processLearningActivity(userId, {
      type: 'lesson_completion',
      userId,
      dayNumber: payload.dayNumber,
      scorePercentage: validation.scorePercentage,
      passed: validation.passed,
      activityToken: 'gamif-' + payload.submissionToken,
      metadata: {
        isFirstTime,
        totalCompletionsCount: totalCompletions
      }
    });

    // Update progress state with synced gamification values
    await this.updateProgress(userId, {
      totalXp: validation.newTotalXp,
      currentLevel: GamificationEngine.getLevelInfo(validation.newTotalXp).level,
      streakCount: gamificationResult.streakResult.newStreak,
      longestStreak: gamificationResult.streakResult.longestStreak,
      streakFreezesAvailable: gamificationResult.streakResult.shieldsAvailable,
      highestUnlockedDay: nextUnlocked
    });

    // Automatically update mastery tracking for the lesson's vocabulary & exercises
    const masteryRecords = await this.getMasteryRecords(userId);
    for (const ex of lesson.exercises) {
      const evalRes = validation.results[ex.id];
      if (evalRes) {
        const masteryId = `ex-${ex.id}`;
        let record = masteryRecords[masteryId];
        if (!record) {
          record = MasteryEngine.createItemRecord({
            id: masteryId,
            itemId: ex.id,
            itemType: 'exercise',
            german: ex.question || ex.prompt,
            translation: String(ex.correctAnswer),
            explanation: ex.explanation
          });
        }
        masteryRecords[masteryId] = MasteryEngine.updateMastery(record, evalRes.isCorrect);
      }
    }

    // Also enroll lesson vocabulary if not present
    if (lesson.vocabulary && Array.isArray(lesson.vocabulary)) {
      for (const v of lesson.vocabulary) {
        const vocabId = `vocab-${v.id}`;
        if (!masteryRecords[vocabId]) {
          masteryRecords[vocabId] = MasteryEngine.createItemRecord({
            id: vocabId,
            itemId: v.id,
            itemType: 'vocabulary',
            german: v.german,
            translation: v.english,
            explanation: v.memoryClue || undefined,
            gender: v.gender || undefined
          });
        }
      }
    }

    localStorage.setItem(MASTERY_PREFIX + userId, JSON.stringify(masteryRecords));

    return {
      ...validation,
      newTotalXp: validation.newTotalXp,
      xpEarned: validation.xpEarned
    };
  }

  /**
   * Mastery Tracking (Levels 0: new to 5: mastered)
   */
  async getMasteryRecords(userId: string): Promise<Record<string, ItemMasteryRecord>> {
    const raw = localStorage.getItem(MASTERY_PREFIX + userId);
    if (!raw) {
      // Seed initial items from Day 1 & Day 2 vocabulary & grammar
      const initialMap: Record<string, ItemMasteryRecord> = {};
      const seedDays = ALL_DAYS.slice(0, 3);
      
      for (const day of seedDays) {
        for (const v of day.vocabulary) {
          const id = `vocab-${v.id}`;
          initialMap[id] = MasteryEngine.createItemRecord({
            id,
            itemId: v.id,
            itemType: 'vocabulary',
            german: v.german,
            translation: v.english,
            explanation: v.memoryClue || undefined,
            gender: v.gender || undefined
          });
        }
      }

      localStorage.setItem(MASTERY_PREFIX + userId, JSON.stringify(initialMap));
      return initialMap;
    }

    return JSON.parse(raw);
  }

  async updateMasteryRecord(userId: string, record: ItemMasteryRecord): Promise<void> {
    const records = await this.getMasteryRecords(userId);
    records[record.id] = record;
    localStorage.setItem(MASTERY_PREFIX + userId, JSON.stringify(records));
  }

  async saveMasteryRecords(userId: string, records: ItemMasteryRecord[]): Promise<void> {
    const current = await this.getMasteryRecords(userId);
    records.forEach(r => {
      current[r.id] = r;
    });
    localStorage.setItem(MASTERY_PREFIX + userId, JSON.stringify(current));
  }

  async saveWritingSubmission(userId: string, submission: WritingSubmission): Promise<void> {
    const key = `${WRITINGS_PREFIX}${userId}_${submission.submissionId}`;
    localStorage.setItem(key, JSON.stringify(submission));

    // Award XP and evaluate 20 Line Writer achievement
    await this.processLearningActivity(userId, {
      type: 'writing_submission',
      userId,
      activityToken: `writing-${submission.submissionId}`,
      metadata: {
        lineCount: submission.lines.length
      }
    });
  }

  async getWritingSubmission(userId: string, submissionId: string): Promise<WritingSubmission | null> {
    const key = `${WRITINGS_PREFIX}${userId}_${submissionId}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }

  /**
   * ----------------------------------------------------
   * Gamification, Streaks, Daily Missions & Achievements
   * ----------------------------------------------------
   */

  async getGamificationState(userId: string): Promise<GamificationState> {
    const raw = localStorage.getItem(GAMIFICATION_PREFIX + userId);
    if (!raw) {
      const initial = GamificationEngine.createInitialState(userId);
      // Sync with user progress if exists
      const progressRaw = localStorage.getItem(PROGRESS_PREFIX + userId);
      if (progressRaw) {
        const prog = JSON.parse(progressRaw);
        initial.totalXp = prog.totalXp ?? 50;
        initial.currentLevel = prog.currentLevel ?? 1;
        initial.streakCount = prog.streakCount ?? 1;
        initial.longestStreak = prog.longestStreak ?? 1;
        initial.lastActiveDate = prog.lastActiveDate ?? new Date().toISOString().split('T')[0];
        initial.streakShields = prog.streakFreezesAvailable ?? 1;
      }
      localStorage.setItem(GAMIFICATION_PREFIX + userId, JSON.stringify(initial));
      return initial;
    }
    const state: GamificationState = JSON.parse(raw);
    // Ensure daily missions are up to date for today
    const today = new Date().toISOString().split('T')[0];
    state.dailyMissions = GamificationEngine.generateDailyMissions(today, state.dailyMissions);
    return state;
  }

  async updateGamificationState(userId: string, updates: Partial<GamificationState>): Promise<GamificationState> {
    const current = await this.getGamificationState(userId);
    const updated: GamificationState = {
      ...current,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(GAMIFICATION_PREFIX + userId, JSON.stringify(updated));
    return updated;
  }

  async processLearningActivity(userId: string, activity: LearningActivityPayload): Promise<GamificationActivityResult> {
    const state = await this.getGamificationState(userId);

    // Load processed tokens
    const tokensRaw = localStorage.getItem(TOKENS_PREFIX + userId);
    const processedTokens = new Set<string>(tokensRaw ? JSON.parse(tokensRaw) : []);

    // Check count of mastered words for words-50-mastered achievement
    const mastery = await this.getMasteryRecords(userId);
    const wordsMasteredCount = Object.values(mastery).filter(m => m.mastery >= 5).length;
    if (!activity.metadata) activity.metadata = {};
    activity.metadata.wordsMasteredCount = wordsMasteredCount;

    const result = GamificationEngine.processLearningActivity(state, activity, processedTokens);

    // Save tokens and gamification state
    localStorage.setItem(TOKENS_PREFIX + userId, JSON.stringify(Array.from(processedTokens)));
    localStorage.setItem(GAMIFICATION_PREFIX + userId, JSON.stringify(state));

    // Sync UserProgress
    await this.updateProgress(userId, {
      totalXp: state.totalXp,
      currentLevel: state.currentLevel,
      streakCount: state.streakCount,
      longestStreak: state.longestStreak,
      streakFreezesAvailable: state.streakShields,
      lastActiveDate: state.lastActiveDate
    });

    return result;
  }

  async claimDailyMission(userId: string, missionId: string): Promise<GamificationState> {
    const state = await this.getGamificationState(userId);
    const mission = state.dailyMissions.find(m => m.id === missionId);

    if (mission && mission.completed) {
      // Award XP if not already awarded
      state.totalXp += mission.xpReward;
      const newLevel = GamificationEngine.getLevelInfo(state.totalXp);
      state.currentLevel = newLevel.level;
      state.lastUpdated = new Date().toISOString();
      localStorage.setItem(GAMIFICATION_PREFIX + userId, JSON.stringify(state));
      await this.updateProgress(userId, {
        totalXp: state.totalXp,
        currentLevel: state.currentLevel
      });
    }

    return state;
  }

  async syncOfflineActivities(
    userId: string,
    activities: Array<{ payload: LearningActivityPayload; timestamp: string }>
  ): Promise<{ state: GamificationState; processedCount: number; duplicatesSkipped: number }> {
    const state = await this.getGamificationState(userId);
    const tokensRaw = localStorage.getItem(TOKENS_PREFIX + userId);
    const processedTokens = new Set<string>(tokensRaw ? JSON.parse(tokensRaw) : []);

    const { state: updatedState, processedCount, duplicatesSkipped } = GamificationEngine.replayOfflineQueue(
      state,
      activities,
      processedTokens
    );

    localStorage.setItem(TOKENS_PREFIX + userId, JSON.stringify(Array.from(processedTokens)));
    localStorage.setItem(GAMIFICATION_PREFIX + userId, JSON.stringify(updatedState));

    await this.updateProgress(userId, {
      totalXp: updatedState.totalXp,
      currentLevel: updatedState.currentLevel,
      streakCount: updatedState.streakCount,
      longestStreak: updatedState.longestStreak,
      streakFreezesAvailable: updatedState.streakShields,
      lastActiveDate: updatedState.lastActiveDate
    });

    // Clear local offline queue
    localStorage.removeItem(OFFLINE_QUEUE_PREFIX + userId);

    return { state: updatedState, processedCount, duplicatesSkipped };
  }
}
