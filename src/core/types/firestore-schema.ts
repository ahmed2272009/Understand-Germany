import { UserRole } from './user';

/**
 * 1. users
 */
export interface UserDocument {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  preferredLanguage: 'en' | 'fr' | 'ar';
  role: UserRole;
  isAnonymous: boolean;
  createdAt: string;
  lastLoginAt: string;
}

/**
 * 2. lessons
 */
export interface LessonDocument {
  dayId: string;
  dayNumber: number;
  title: string;
  objective: string;
  explanation: string;
  phase: number;
  phaseTitle: string;
  published: boolean;
  completionRequirement: string;
  dailyChallenge?: string;
  updatedAt: string;
  createdAt: string;
}

/**
 * 3. lesson_sections
 */
export interface LessonSectionDocument {
  id: string;
  dayId: string;
  dayNumber: number;
  type: 'grammar' | 'concept' | 'pronunciation' | 'examples' | 'speakingModel' | 'mnemonic';
  title: string;
  content: string;
  order: number;
  rules?: string[];
  examples?: string[];
  formula?: string | null;
  updatedAt: string;
}

/**
 * 4. vocabulary
 */
export interface VocabularyDocument {
  id: string;
  dayNumber: number;
  german: string;
  article?: 'der' | 'die' | 'das' | null;
  plural?: string | null;
  english: string;
  french: string;
  arabicClue?: string | null;
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'connector' | 'phrase' | 'number';
  memoryClue?: string | null;
  imageUrl?: string | null;
  imageSvg?: string | null;
  audioUrl?: string | null;
  audioText?: string | null;
  exampleSentence?: string | null;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  updatedAt: string;
}

/**
 * 5. exercises
 */
export interface ExerciseDocument {
  id: string;
  dayId: string;
  dayNumber: number;
  type: string;
  prompt: string;
  question: string;
  explanation: string;
  hint?: string;
  options?: string[];
  correctAnswer: string | string[] | Record<string, string>;
  words?: string[];
  pairs?: Array<{ id: string; left: string; right: string }>;
  imageUrl?: string | null;
  audioText?: string | null;
  order: number;
  updatedAt: string;
}

/**
 * 6. review_items
 */
export interface ReviewItemDocument {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'vocabulary' | 'grammar' | 'phrase' | 'exercise';
  front: string;
  back: string;
  hint?: string;
  arabicClue?: string;
  correctAnswers: number;
  incorrectAnswers: number;
  lastReview: string | null;
  nextReview: string;
  interval: number;
  mastery: number;
  errorStreak: number;
  updatedAt: string;
}

/**
 * 7. daily_sessions
 */
export interface DailySessionDocument {
  sessionId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  exercisesCompleted: number;
  lessonsAttempted: number[];
  xpEarnedToday: number;
  streakMaintained: boolean;
  deviceInfo?: string;
  updatedAt: string;
}

/**
 * 8. xp_events
 */
export interface XPEventDocument {
  eventId: string;
  userId: string;
  amount: number;
  reason: 'lesson_completion' | 'perfect_bonus' | 'streak_milestone' | 'daily_mission' | 'game_reward' | 'writing_pass' | 'srs_review';
  sourceToken: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

/**
 * 9. achievements
 */
export interface AchievementDefinitionDocument {
  id: string;
  title: string;
  description: string;
  badge: string;
  category: 'streak' | 'learning' | 'mastery' | 'writing';
  target: number;
  xpReward: number;
  active: boolean;
  updatedAt: string;
}

/**
 * 10. user_achievements
 */
export interface UserAchievementDocument {
  id: string;
  userId: string;
  achievementId: string;
  title: string;
  badge: string;
  category: string;
  target: number;
  progress: number;
  unlocked: boolean;
  unlockedAt: string | null;
  xpRewarded: boolean;
  claimedAt?: string | null;
  updatedAt: string;
}

/**
 * 11. game_scores
 */
export interface GameScoreDocument {
  scoreId: string;
  userId: string;
  gameId: 'word-rush' | 'article-master' | 'sentence-builder' | 'memory-cards' | 'listening-match' | 'grammar-battle' | 'picture-quiz' | 'twenty-line';
  score: number;
  accuracy: number;
  itemsPlayed: number;
  correctAnswers: number;
  xpAwarded: number;
  idempotencyToken: string;
  playedAt: string;
}

/**
 * 12. writing_submissions
 */
export interface WritingSubmissionDocument {
  submissionId: string;
  userId: string;
  dayNumber: number;
  title: string;
  rawText: string;
  lines: string[];
  lineCount: number;
  wordCount: number;
  validation: {
    lineCount: number;
    targetLineCount: number;
    wordCount: number;
    hasEnoughLines: boolean;
    v2CompliantRatio: number;
    connectorsFound: string[];
    warnings: Array<{ line: number; type: string; message: string }>;
    overallScore: number;
  };
  status: 'draft' | 'submitted' | 'reviewed';
  feedback?: string;
  updatedAt: string;
  submittedAt?: string;
}
