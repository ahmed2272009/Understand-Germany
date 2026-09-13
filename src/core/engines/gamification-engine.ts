import { LevelInfo } from '../types/progress';
import {
  GamificationState,
  StreakUpdateResult,
  DailyMissionItem,
  UserAchievement,
  AnalyticsEvent,
  LearningActivityPayload,
  GamificationActivityResult,
  SYSTEM_ACHIEVEMENTS,
  STREAK_MILESTONES
} from '../types/gamification';

export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Anfänger (Novice)', minXp: 0, maxXp: 200, badge: '🌱' },
  { level: 2, title: 'Entdecker (Explorer)', minXp: 200, maxXp: 500, badge: '🧭' },
  { level: 3, title: 'Wortsucher (Word Hunter)', minXp: 500, maxXp: 1000, badge: '🏹' },
  { level: 4, title: 'Satzbauer (Sentence Builder)', minXp: 1000, maxXp: 2000, badge: '⚒️' },
  { level: 5, title: 'Grammatik-Ritter (Grammar Knight)', minXp: 2000, maxXp: 3500, badge: '🛡️' },
  { level: 6, title: 'Sprach-Meister (Language Master)', minXp: 3500, maxXp: 100000, badge: '👑' },
];

export const MAX_STREAK_SHIELDS = 2;

export class GamificationEngine {
  /**
   * Determine Level based on total accumulated XP
   */
  static getLevelInfo(totalXp: number): LevelInfo {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (totalXp >= LEVELS[i].minXp) {
        return LEVELS[i];
      }
    }
    return LEVELS[0];
  }

  /**
   * Calculate deterministic lesson completion reward
   * Only rewards genuine passing performance; awards modest effort points for failures.
   */
  static calculateCompletionReward(scorePercentage: number, isFirstTime: boolean): { xp: number; passed: boolean } {
    const passed = scorePercentage >= 80;
    if (!passed) {
      return { xp: 10, passed: false };
    }
    const base = isFirstTime ? 50 : 20;
    const bonus = scorePercentage === 100 ? 25 : (scorePercentage >= 90 ? 15 : 0);
    return { xp: base + bonus, passed: true };
  }

  /**
   * Calculate calendar days difference between two YYYY-MM-DD dates in UTC
   */
  static getDaysBetween(dateStr1: string, dateStr2: string): number {
    const d1 = new Date(dateStr1 + 'T00:00:00Z');
    const d2 = new Date(dateStr2 + 'T00:00:00Z');
    const diffMs = d2.getTime() - d1.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Comprehensive Streak Updater
   * Covers all 7 essential streak verification flows:
   * 1. New user (initial active state)
   * 2. Same day activity (idempotent, maintained without duplicate increment)
   * 3. Next day activity (streak incremented, longest updated, milestones awarded)
   * 4. Missed day with shield (shield consumed, streak preserved)
   * 5. Missed day without shield (streak resets to 1, longest streak preserved)
   * 6. Multiple sessions in the same day (deterministic stability)
   * 7. Offline sync chronologically ordered bridging
   */
  static checkAndUpdateStreak(
    currentStreak: number,
    longestStreak: number,
    lastActiveDate: string | null | undefined,
    shieldsAvailable: number,
    targetDate?: string
  ): StreakUpdateResult {
    const today = targetDate || new Date().toISOString().split('T')[0];

    // 1. New User
    if (!lastActiveDate || currentStreak <= 0) {
      const initialStreak = 1;
      const newLongest = Math.max(longestStreak || 0, initialStreak);
      return {
        previousStreak: currentStreak || 0,
        newStreak: initialStreak,
        longestStreak: newLongest,
        isMaintained: true,
        isIncremented: true,
        shieldConsumed: false,
        shieldsAvailable: Math.min(MAX_STREAK_SHIELDS, Math.max(0, shieldsAvailable)),
        streakReset: false,
        lastActiveDate: today
      };
    }

    const diffDays = this.getDaysBetween(lastActiveDate, today);

    // Same day activity (Session continuation or multiple sessions today)
    if (diffDays === 0) {
      return {
        previousStreak: currentStreak,
        newStreak: currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        isMaintained: true,
        isIncremented: false,
        shieldConsumed: false,
        shieldsAvailable: Math.min(MAX_STREAK_SHIELDS, Math.max(0, shieldsAvailable)),
        streakReset: false,
        lastActiveDate: today
      };
    }

    // Past date (Clock skew or replayed past offline event)
    if (diffDays < 0) {
      return {
        previousStreak: currentStreak,
        newStreak: currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        isMaintained: true,
        isIncremented: false,
        shieldConsumed: false,
        shieldsAvailable: Math.min(MAX_STREAK_SHIELDS, Math.max(0, shieldsAvailable)),
        streakReset: false,
        lastActiveDate: lastActiveDate
      };
    }

    // Next day activity (Consecutive day)
    if (diffDays === 1) {
      const newStreak = currentStreak + 1;
      const newLongest = Math.max(longestStreak, newStreak);
      
      // Check for streak milestones (3, 7, 14, 30 days)
      const milestone = STREAK_MILESTONES.find(m => m.days === newStreak);
      let updatedShields = shieldsAvailable;
      if (milestone) {
        updatedShields = Math.min(MAX_STREAK_SHIELDS, shieldsAvailable + milestone.rewardShields);
      }

      return {
        previousStreak: currentStreak,
        newStreak,
        longestStreak: newLongest,
        isMaintained: true,
        isIncremented: true,
        shieldConsumed: false,
        shieldsAvailable: updatedShields,
        streakReset: false,
        milestoneReached: milestone,
        lastActiveDate: today
      };
    }

    // Missed Day(s) (diffDays >= 2)
    const missedDays = diffDays - 1;
    
    // Check if user has enough shields to absorb the missed day(s)
    if (shieldsAvailable >= missedDays && missedDays > 0) {
      const remainingShields = shieldsAvailable - missedDays;
      return {
        previousStreak: currentStreak,
        newStreak: currentStreak, // Streak preserved by shields!
        longestStreak: Math.max(longestStreak, currentStreak),
        isMaintained: true,
        isIncremented: false,
        shieldConsumed: true,
        shieldsAvailable: remainingShields,
        streakReset: false,
        lastActiveDate: today
      };
    }

    // If only 1 shield is available and 1 day was missed
    if (shieldsAvailable > 0 && missedDays === 1) {
      return {
        previousStreak: currentStreak,
        newStreak: currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        isMaintained: true,
        isIncremented: false,
        shieldConsumed: true,
        shieldsAvailable: shieldsAvailable - 1,
        streakReset: false,
        lastActiveDate: today
      };
    }

    // Streak Broken - Reset to 1, but PRESERVE the longest streak record!
    return {
      previousStreak: currentStreak,
      newStreak: 1,
      longestStreak: Math.max(longestStreak, currentStreak),
      isMaintained: false,
      isIncremented: false,
      shieldConsumed: false,
      shieldsAvailable: shieldsAvailable,
      streakReset: true,
      lastActiveDate: today
    };
  }

  /**
   * Deterministic Daily Missions Generator
   * Generates 3 authentic learning missions for the given calendar date.
   */
  static generateDailyMissions(dateStr: string, existing?: DailyMissionItem[]): DailyMissionItem[] {
    if (existing && existing.length === 3 && existing.every(m => m.date === dateStr)) {
      return existing;
    }

    return [
      {
        id: `mission-lesson-${dateStr}`,
        title: 'Tageslektion meistern',
        description: 'Schließe eine Lektion im Workbook mit mindestens 80% Erfolg ab.',
        type: 'lesson_complete',
        target: 1,
        progress: 0,
        completed: false,
        xpReward: 40,
        date: dateStr
      },
      {
        id: `mission-srs-${dateStr}`,
        title: 'Wortschatz trainieren',
        description: 'Wiederhole mindestens 5 Vokabeln im Spaced Repetition Deck.',
        type: 'srs_review',
        target: 5,
        progress: 0,
        completed: false,
        xpReward: 25,
        date: dateStr
      },
      {
        id: `mission-sentences-${dateStr}`,
        title: 'Sätze & Grammatik',
        description: 'Beantworte 5 Grammatik- oder Satzübungen fehlerfrei.',
        type: 'high_score',
        target: 5,
        progress: 0,
        completed: false,
        xpReward: 30,
        date: dateStr
      }
    ];
  }

  /**
   * Evaluate all 9 core system achievements against verified user stats
   */
  static evaluateAchievements(
    stats: {
      completionsCount: number;
      streakCount: number;
      longestStreak: number;
      wordsMastered: number;
      grammarLessonsCount: number;
      sentencesCount: number;
      writingsCount: number;
    },
    currentMap?: Record<string, { unlocked: boolean; progress: number; unlockedAt: string | null }>
  ): {
    updatedMap: Record<string, { unlocked: boolean; progress: number; unlockedAt: string | null }>;
    newlyUnlocked: UserAchievement[];
    userAchievements: UserAchievement[];
  } {
    const updatedMap: Record<string, { unlocked: boolean; progress: number; unlockedAt: string | null }> = {
      ...(currentMap || {})
    };
    const newlyUnlocked: UserAchievement[] = [];
    const userAchievements: UserAchievement[] = [];
    const nowIso = new Date().toISOString();

    for (const def of SYSTEM_ACHIEVEMENTS) {
      let progress = 0;
      switch (def.id) {
        case 'first-day':
          progress = stats.completionsCount;
          break;
        case 'streak-7':
          progress = Math.max(stats.streakCount, stats.longestStreak);
          break;
        case 'streak-14':
          progress = Math.max(stats.streakCount, stats.longestStreak);
          break;
        case 'streak-30':
          progress = Math.max(stats.streakCount, stats.longestStreak);
          break;
        case 'words-50-mastered':
          progress = stats.wordsMastered;
          break;
        case 'grammar-10':
          progress = stats.grammarLessonsCount;
          break;
        case 'sentences-100':
          progress = stats.sentencesCount;
          break;
        case 'complete-30':
          progress = stats.completionsCount;
          break;
        case 'writer-20':
          progress = stats.writingsCount;
          break;
      }

      const prev = updatedMap[def.id] || { unlocked: false, progress: 0, unlockedAt: null };
      const isNowUnlocked = progress >= def.target;
      const isNewlyUnlocked = isNowUnlocked && !prev.unlocked;

      const updatedRecord = {
        unlocked: isNowUnlocked || prev.unlocked,
        progress: Math.min(def.target, Math.max(prev.progress, progress)),
        unlockedAt: prev.unlockedAt || (isNewlyUnlocked ? nowIso : null)
      };
      updatedMap[def.id] = updatedRecord;

      const userAchievement: UserAchievement = {
        ...def,
        progress: updatedRecord.progress,
        unlocked: updatedRecord.unlocked,
        unlockedAt: updatedRecord.unlockedAt
      };
      userAchievements.push(userAchievement);

      if (isNewlyUnlocked) {
        newlyUnlocked.push(userAchievement);
      }
    }

    return { updatedMap, newlyUnlocked, userAchievements };
  }

  /**
   * Verify if an activity satisfies the Daily Minimum Learning Goal
   * Meaningless clicks / browsing return false.
   */
  static isDailyMinimumLearningGoalMet(activity: LearningActivityPayload): boolean {
    if (activity.type === 'lesson_completion') {
      return (activity.passed === true) || (Number(activity.scorePercentage) >= 80);
    }
    if (activity.type === 'srs_review') {
      return (activity.itemsCount ?? 0) >= 5 || (activity.correctCount ?? 0) >= 5;
    }
    if (activity.type === 'writing_submission') {
      const lineCount = activity.metadata?.lineCount ?? 0;
      return lineCount >= 5;
    }
    if (activity.type === 'exercise_answer') {
      return activity.metadata?.isCorrect === true;
    }
    return false;
  }

  /**
   * Create standard initial Gamification state for a user
   */
  static createInitialState(userId: string): GamificationState {
    const today = new Date().toISOString().split('T')[0];
    const initialMap: Record<string, { unlocked: boolean; progress: number; unlockedAt: string | null }> = {};
    for (const ach of SYSTEM_ACHIEVEMENTS) {
      initialMap[ach.id] = { unlocked: false, progress: 0, unlockedAt: null };
    }

    return {
      userId,
      streakCount: 1,
      longestStreak: 1,
      lastActiveDate: today,
      streakShields: 1,
      totalXp: 50,
      currentLevel: 1,
      achievements: initialMap,
      dailyMissions: this.generateDailyMissions(today),
      sentencesConstructed: 0,
      wordsMastered: 0,
      grammarLessonsCompleted: 0,
      writingsCompleted: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Process a Learning Activity Securely
   * - Validates idempotency token
   * - Evaluates minimum learning threshold (no meaningless click points)
   * - Updates streak & streak shields
   * - Progresses and completes daily missions
   * - Evaluates and unlocks achievements
   * - Calculates XP rewards and level transitions
   * - Generates [object]_[verb_past] analytics events
   */
  static processLearningActivity(
    state: GamificationState,
    activity: LearningActivityPayload,
    processedTokens: Set<string>
  ): GamificationActivityResult {
    const analyticsEvents: AnalyticsEvent[] = [];
    const timestamp = activity.timestamp || new Date().toISOString();
    const today = timestamp.split('T')[0];

    // 1. Idempotency Token Check (Anti-Replay / Anti-Duplicate)
    if (processedTokens.has(activity.activityToken)) {
      return {
        success: true,
        isDuplicate: true,
        xpEarned: 0,
        newTotalXp: state.totalXp,
        levelInfo: this.getLevelInfo(state.totalXp),
        streakResult: {
          previousStreak: state.streakCount,
          newStreak: state.streakCount,
          longestStreak: state.longestStreak,
          isMaintained: true,
          isIncremented: false,
          shieldConsumed: false,
          shieldsAvailable: state.streakShields,
          streakReset: false,
          lastActiveDate: state.lastActiveDate
        },
        dailyMissions: state.dailyMissions,
        missionsCompleted: [],
        newlyUnlockedAchievements: [],
        analyticsEvents: [],
        message: 'Duplicate activity token detected. 0 additional XP awarded.'
      };
    }

    // Register token
    processedTokens.add(activity.activityToken);

    // 2. Minimum Learning Goal & Streak Update
    const isGoalMet = this.isDailyMinimumLearningGoalMet(activity);
    let streakResult: StreakUpdateResult = {
      previousStreak: state.streakCount,
      newStreak: state.streakCount,
      longestStreak: state.longestStreak,
      isMaintained: true,
      isIncremented: false,
      shieldConsumed: false,
      shieldsAvailable: state.streakShields,
      streakReset: false,
      lastActiveDate: state.lastActiveDate
    };

    if (isGoalMet) {
      streakResult = this.checkAndUpdateStreak(
        state.streakCount,
        state.longestStreak,
        state.lastActiveDate,
        state.streakShields,
        today
      );

      state.streakCount = streakResult.newStreak;
      state.longestStreak = streakResult.longestStreak;
      state.streakShields = streakResult.shieldsAvailable;
      state.lastActiveDate = streakResult.lastActiveDate;

      if (streakResult.isIncremented) {
        analyticsEvents.push({
          event: 'streak_incremented',
          userId: state.userId,
          timestamp,
          properties: {
            newStreak: streakResult.newStreak,
            longestStreak: streakResult.longestStreak
          }
        });
      }

      if (streakResult.shieldConsumed) {
        analyticsEvents.push({
          event: 'streak_shield_consumed',
          userId: state.userId,
          timestamp,
          properties: {
            remainingShields: streakResult.shieldsAvailable
          }
        });
      }

      if (streakResult.streakReset) {
        analyticsEvents.push({
          event: 'streak_reset',
          userId: state.userId,
          timestamp,
          properties: {
            previousStreak: streakResult.previousStreak,
            longestStreak: streakResult.longestStreak
          }
        });
      }

      if (streakResult.milestoneReached) {
        analyticsEvents.push({
          event: 'streak_milestone_reached',
          userId: state.userId,
          timestamp,
          properties: {
            milestoneDays: streakResult.milestoneReached.days,
            rewardXp: streakResult.milestoneReached.rewardXp,
            rewardShields: streakResult.milestoneReached.rewardShields
          }
        });
      }
    }

    // 3. Compute Deterministic XP Earned
    let xpEarned = 0;

    switch (activity.type) {
      case 'lesson_completion': {
        const score = activity.scorePercentage ?? 0;
        const isFirstTime = activity.metadata?.isFirstTime ?? true;
        const reward = this.calculateCompletionReward(score, isFirstTime);
        xpEarned += reward.xp;
        analyticsEvents.push({
          event: 'lesson_completed',
          userId: state.userId,
          timestamp,
          properties: {
            dayNumber: activity.dayNumber,
            scorePercentage: score,
            passed: reward.passed,
            xpEarned: reward.xp
          }
        });
        break;
      }
      case 'srs_review': {
        const correct = activity.correctCount ?? 0;
        xpEarned += correct * 2; // 2 XP per correct review
        analyticsEvents.push({
          event: 'spaced_review_completed',
          userId: state.userId,
          timestamp,
          properties: {
            itemsReviewed: activity.itemsCount ?? 0,
            correctCount: correct,
            xpEarned: correct * 2
          }
        });
        break;
      }
      case 'writing_submission': {
        const lineCount = activity.metadata?.lineCount ?? 0;
        const baseWritingXp = lineCount >= 20 ? 50 : (lineCount >= 10 ? 25 : 10);
        xpEarned += baseWritingXp;
        break;
      }
      case 'exercise_answer': {
        const isCorrect = activity.metadata?.isCorrect ?? false;
        xpEarned += isCorrect ? 5 : 0;
        analyticsEvents.push({
          event: 'exercise_answered',
          userId: state.userId,
          timestamp,
          properties: {
            isCorrect,
            xpEarned: isCorrect ? 5 : 0
          }
        });
        break;
      }
    }

    // Add milestone reward XP if applicable
    if (streakResult.milestoneReached) {
      xpEarned += streakResult.milestoneReached.rewardXp;
    }

    // 4. Update Stats for Achievements
    if (activity.type === 'lesson_completion' && activity.passed) {
      state.grammarLessonsCompleted += 1;
    }
    if (activity.type === 'writing_submission' && (activity.metadata?.lineCount ?? 0) >= 20) {
      state.writingsCompleted += 1;
    }
    if (activity.correctCount) {
      state.sentencesConstructed += activity.correctCount;
    }
    if (activity.metadata?.wordsMasteredCount) {
      state.wordsMastered = activity.metadata.wordsMasteredCount;
    }

    // 5. Daily Missions Progression
    const missions = this.generateDailyMissions(today, state.dailyMissions);
    const completedMissions: DailyMissionItem[] = [];

    for (const mission of missions) {
      if (!mission.completed) {
        let progressed = false;
        if (mission.type === 'lesson_complete' && activity.type === 'lesson_completion' && activity.passed) {
          mission.progress = Math.min(mission.target, mission.progress + 1);
          progressed = true;
        } else if (mission.type === 'srs_review' && activity.type === 'srs_review') {
          const items = activity.itemsCount ?? 1;
          mission.progress = Math.min(mission.target, mission.progress + items);
          progressed = true;
        } else if (mission.type === 'high_score' && (activity.correctCount ?? 0) > 0) {
          mission.progress = Math.min(mission.target, mission.progress + (activity.correctCount ?? 1));
          progressed = true;
        }

        if (progressed) {
          analyticsEvents.push({
            event: 'daily_mission_progressed',
            userId: state.userId,
            timestamp,
            properties: {
              missionId: mission.id,
              progress: mission.progress,
              target: mission.target
            }
          });

          if (mission.progress >= mission.target) {
            mission.completed = true;
            xpEarned += mission.xpReward;
            completedMissions.push(mission);
            analyticsEvents.push({
              event: 'daily_mission_completed',
              userId: state.userId,
              timestamp,
              properties: {
                missionId: mission.id,
                xpReward: mission.xpReward
              }
            });
          }
        }
      }
    }
    state.dailyMissions = missions;

    // 6. Evaluate Achievements
    const completionsCount = activity.metadata?.totalCompletionsCount ?? (activity.type === 'lesson_completion' && activity.passed ? 1 : 0);
    const { updatedMap, newlyUnlocked } = this.evaluateAchievements(
      {
        completionsCount: Math.max(completionsCount, Object.values(state.achievements).filter(a => a.unlocked).length),
        streakCount: state.streakCount,
        longestStreak: state.longestStreak,
        wordsMastered: state.wordsMastered,
        grammarLessonsCount: state.grammarLessonsCompleted,
        sentencesCount: state.sentencesConstructed,
        writingsCount: state.writingsCompleted
      },
      state.achievements
    );
    state.achievements = updatedMap;

    for (const ach of newlyUnlocked) {
      xpEarned += ach.xpReward;
      analyticsEvents.push({
        event: 'achievement_unlocked',
        userId: state.userId,
        timestamp,
        properties: {
          achievementId: ach.id,
          title: ach.title,
          badge: ach.badge,
          xpReward: ach.xpReward
        }
      });
    }

    // 7. Update Level & Total XP
    const prevLevel = this.getLevelInfo(state.totalXp).level;
    state.totalXp += xpEarned;
    const newLevelInfo = this.getLevelInfo(state.totalXp);
    state.currentLevel = newLevelInfo.level;
    state.lastUpdated = new Date().toISOString();

    if (newLevelInfo.level > prevLevel) {
      analyticsEvents.push({
        event: 'level_upgraded',
        userId: state.userId,
        timestamp,
        properties: {
          previousLevel: prevLevel,
          newLevel: newLevelInfo.level,
          title: newLevelInfo.title
        }
      });
    }

    return {
      success: true,
      isDuplicate: false,
      xpEarned,
      newTotalXp: state.totalXp,
      levelInfo: newLevelInfo,
      streakResult,
      dailyMissions: state.dailyMissions,
      missionsCompleted: completedMissions,
      newlyUnlockedAchievements: newlyUnlocked,
      analyticsEvents
    };
  }

  /**
   * Replay Offline Sync Queue
   * Chronologically replays queued learning activities and bridges streaks.
   */
  static replayOfflineQueue(
    state: GamificationState,
    queue: Array<{ payload: LearningActivityPayload; timestamp: string }>,
    processedTokens: Set<string>
  ): {
    state: GamificationState;
    processedCount: number;
    duplicatesSkipped: number;
    results: GamificationActivityResult[];
  } {
    // Sort chronologically ascending
    const sorted = [...queue].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    let processedCount = 0;
    let duplicatesSkipped = 0;
    const results: GamificationActivityResult[] = [];

    for (const item of sorted) {
      const payloadWithTimestamp: LearningActivityPayload = {
        ...item.payload,
        timestamp: item.timestamp
      };
      const res = this.processLearningActivity(state, payloadWithTimestamp, processedTokens);
      if (res.isDuplicate) {
        duplicatesSkipped++;
      } else {
        processedCount++;
      }
      results.push(res);
    }

    return { state, processedCount, duplicatesSkipped, results };
  }
}
