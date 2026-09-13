import { DayCompletion } from './progress';

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-in'
  | 'sentence-ordering'
  | 'syntax-order'
  | 'translation'
  | 'article-select'
  | 'matching'
  | 'image-vocab'
  | 'listening'
  | 'writing'
  | 'pronunciation';

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface ComprehensiveExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  question: string;
  explanation: string;
  hint?: string;
  options?: string[];
  correctAnswer: string | string[] | Record<string, string>;
  
  // sentence ordering
  words?: string[];
  
  // matching
  pairs?: MatchingPair[];
  
  // image vocab
  imageUrl?: string;
  imageIcon?: string; // Lucide icon identifier or label
  
  // listening & pronunciation
  audioText?: string;
  targetText?: string;
  phoneticGuide?: string;
  
  // translation
  sourceLang?: 'de' | 'en' | 'fr';
  targetLang?: 'de' | 'en' | 'fr';
  
  // writing
  requiredKeywords?: string[];
  minWords?: number;
  sampleSolution?: string;
}

export interface EvaluationResult {
  isCorrect: boolean;
  score: number; // 0 to 1
  explanation: string;
  feedback: string;
  correctAnswerDisplay: string;
  userAnswerDisplay: string;
  details?: Record<string, any>;
}

// 6 Mastery Levels:
// 0: new
// 1: learning
// 2: familiar
// 3: good
// 4: strong
// 5: mastered
export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface MasteryLevelMeta {
  level: MasteryLevel;
  name: string;
  germanName: string;
  badge: string;
  color: string;
  intervalDays: number;
}

export const MASTERY_LEVEL_CONFIG: Record<MasteryLevel, MasteryLevelMeta> = {
  0: { level: 0, name: 'New', germanName: 'Neu', badge: '🌱', color: 'slate', intervalDays: 0 },
  1: { level: 1, name: 'Learning', germanName: 'Lernen', badge: '📖', color: 'rose', intervalDays: 1 },
  2: { level: 2, name: 'Familiar', germanName: 'Vertraut', badge: '💡', color: 'amber', intervalDays: 3 },
  3: { level: 3, name: 'Good', germanName: 'Gut', badge: '⚡', color: 'yellow', intervalDays: 7 },
  4: { level: 4, name: 'Strong', germanName: 'Stark', badge: '🛡️', color: 'blue', intervalDays: 14 },
  5: { level: 5, name: 'Mastered', germanName: 'Gemeistert', badge: '👑', color: 'emerald', intervalDays: 30 },
};

export interface ItemMasteryRecord {
  id: string; // unique identifier
  itemId: string;
  itemType: 'vocabulary' | 'grammar' | 'phrase' | 'exercise';
  german: string;
  translation: string;
  explanation?: string;
  gender?: 'der' | 'die' | 'das';
  correctAnswers: number;
  incorrectAnswers: number;
  lastReview: string | null; // ISO timestamp
  nextReview: string; // YYYY-MM-DD
  interval: number; // days
  mastery: MasteryLevel;
  errorStreak: number; // consecutive errors for priority weighting
  easeFactor?: number;
}

export interface SpacedReviewQueueItem {
  record: ItemMasteryRecord;
  priorityScore: number;
  isDue: boolean;
  daysOverdue: number;
  reason: 'error_streak' | 'low_mastery' | 'due' | 'new_item';
}

export interface LessonSubmissionPayload {
  userId: string;
  dayId: string;
  dayNumber: number;
  answers: Record<string, any>; // exerciseId -> raw answer
  timeSpentSeconds: number;
  submissionToken: string; // client-generated idempotency nonce
  submittedAt: string;
}

export interface LessonValidationResult {
  success: boolean;
  dayId: string;
  dayNumber: number;
  scorePercentage: number;
  passed: boolean;
  xpEarned: number; // Deterministically computed server-side / engine-side
  newTotalXp: number;
  isDuplicate: boolean;
  message: string;
  results: Record<string, EvaluationResult>;
  completionRecord?: DayCompletion;
}
