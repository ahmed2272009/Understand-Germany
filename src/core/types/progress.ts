export interface UserProgress {
  totalXp: number;
  currentLevel: number;
  streakCount: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  heartsCount: number; // 0 to 5
  lastHeartRegenAt: string; // ISO string
  streakFreezesAvailable: number;
  highestUnlockedDay: number; // 1 to 30
  updatedAt: string;
}

export interface DayCompletion {
  dayId: string;
  dayNumber: number;
  scorePercentage: number;
  xpEarned: number;
  timeSpentSeconds: number;
  passed: boolean;
  attemptsCount: number;
  completedAt: string;
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  badge: string;
}
