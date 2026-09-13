export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  badge: string;
  category: 'streak' | 'learning' | 'mastery' | 'writing';
  target: number;
  xpReward: number;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  badge: string;
  category: 'streak' | 'learning' | 'mastery' | 'writing';
  target: number;
  progress: number;
  unlocked: boolean;
  unlockedAt: string | null;
  xpReward: number;
}

export interface StreakMilestone {
  days: number;
  title: string;
  badge: string;
  rewardXp: number;
  rewardShields: number;
  message: string;
}

export interface StreakUpdateResult {
  previousStreak: number;
  newStreak: number;
  longestStreak: number;
  isMaintained: boolean;
  isIncremented: boolean;
  shieldConsumed: boolean;
  shieldsAvailable: number;
  streakReset: boolean;
  milestoneReached?: StreakMilestone;
  lastActiveDate: string;
}

export interface DailyMissionItem {
  id: string;
  title: string;
  description: string;
  type: 'lesson_complete' | 'srs_review' | 'high_score' | 'writing_practice';
  target: number;
  progress: number;
  completed: boolean;
  xpReward: number;
  date: string; // YYYY-MM-DD
}

export interface GamificationState {
  userId: string;
  streakCount: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  streakShields: number; // 0 to 2
  totalXp: number;
  currentLevel: number;
  achievements: Record<string, { unlocked: boolean; progress: number; unlockedAt: string | null }>;
  dailyMissions: DailyMissionItem[];
  sentencesConstructed: number;
  wordsMastered: number;
  grammarLessonsCompleted: number;
  writingsCompleted: number;
  lastUpdated: string;
}

// Event Taxonomy: [object]_[verb_past] (following analytics-product skill)
export type AnalyticsEventName =
  | 'lesson_completed'
  | 'exercise_answered'
  | 'streak_incremented'
  | 'streak_shield_consumed'
  | 'streak_reset'
  | 'streak_milestone_reached'
  | 'achievement_unlocked'
  | 'daily_mission_progressed'
  | 'daily_mission_completed'
  | 'level_upgraded'
  | 'spaced_review_completed';

export interface AnalyticsEvent {
  event: AnalyticsEventName;
  userId: string;
  timestamp: string;
  properties: Record<string, any>;
}

export interface LearningActivityPayload {
  type: 'lesson_completion' | 'srs_review' | 'writing_submission' | 'exercise_answer';
  userId: string;
  dayNumber?: number;
  scorePercentage?: number;
  passed?: boolean;
  itemsCount?: number;
  correctCount?: number;
  activityToken: string;
  timestamp?: string;
  metadata?: Record<string, any>;
}

export interface GamificationActivityResult {
  success: boolean;
  isDuplicate: boolean;
  xpEarned: number;
  newTotalXp: number;
  levelInfo: import('./progress').LevelInfo;
  streakResult: StreakUpdateResult;
  dailyMissions: DailyMissionItem[];
  missionsCompleted: DailyMissionItem[];
  newlyUnlockedAchievements: UserAchievement[];
  analyticsEvents: AnalyticsEvent[];
  message?: string;
}

export interface OfflineSyncQueueItem {
  id: string;
  payload: LearningActivityPayload;
  queuedAt: string;
  attempts: number;
}

// 9 Required Core Achievements
export const SYSTEM_ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first-day',
    title: 'First Day',
    description: 'Schließe deinen ersten vollständigen Lerntag erfolgreich ab.',
    badge: '🌱',
    category: 'learning',
    target: 1,
    xpReward: 50
  },
  {
    id: 'streak-7',
    title: '7 Day Streak',
    description: 'Lerne 7 Tage hintereinander ohne Unterbrechung.',
    badge: '🔥',
    category: 'streak',
    target: 7,
    xpReward: 100
  },
  {
    id: 'streak-14',
    title: '14 Day Streak',
    description: 'Halte deinen täglichen Lernstreak über zwei volle Wochen.',
    badge: '⚡',
    category: 'streak',
    target: 14,
    xpReward: 200
  },
  {
    id: 'streak-30',
    title: '30 Day Streak',
    description: 'Eiserne Disziplin: Ein voller 30-Tage Monats-Streak!',
    badge: '👑',
    category: 'streak',
    target: 30,
    xpReward: 500
  },
  {
    id: 'words-50-mastered',
    title: '50 Words Mastered',
    description: 'Bringe 50 deutsche Vokabeln auf Meisterschaftsstufe 5.',
    badge: '🧠',
    category: 'mastery',
    target: 50,
    xpReward: 150
  },
  {
    id: 'grammar-10',
    title: '10 Grammar Lessons',
    description: 'Meistere 10 Lektionen mit fundierten Grammatikregeln.',
    badge: '🛡️',
    category: 'learning',
    target: 10,
    xpReward: 150
  },
  {
    id: 'sentences-100',
    title: '100 Correct Sentences',
    description: 'Konstruiere oder übersetze 100 deutsche Sätze fehlerfrei.',
    badge: '✍️',
    category: 'writing',
    target: 100,
    xpReward: 200
  },
  {
    id: 'complete-30',
    title: '30 Day Complete',
    description: 'Schließe das gesamte 30-Tage Workbook von Null bis B1-Grundlage ab.',
    badge: '🏆',
    category: 'learning',
    target: 30,
    xpReward: 1000
  },
  {
    id: 'writer-20',
    title: '20 Line Writer',
    description: 'Verfasse einen zusammenhängenden 20-Zeilen-Aufsatz im Writing Lab.',
    badge: '📜',
    category: 'writing',
    target: 1,
    xpReward: 250
  }
];

// Streak Milestones
export const STREAK_MILESTONES: StreakMilestone[] = [
  { days: 3, title: 'Streak-Starter', badge: '🔥', rewardXp: 30, rewardShields: 1, message: '3 Tage am Stück gelernt! Du erhältst deinen ersten Streak-Schild.' },
  { days: 7, title: 'Wochen-Champion', badge: '⚡', rewardXp: 70, rewardShields: 1, message: 'Eine volle Woche deutscher Fokus! +1 Streak-Schild und 70 XP.' },
  { days: 14, title: 'Gewohnheits-Meister', badge: '🛡️', rewardXp: 150, rewardShields: 1, message: '14 Tage ununterbrochen! Deutsch ist jetzt deine tägliche Routine.' },
  { days: 30, title: 'Legenden-Streak', badge: '👑', rewardXp: 300, rewardShields: 1, message: '30 Tage DeutschQuest gemeistert! Ein wahrer Meilenstein.' }
];
