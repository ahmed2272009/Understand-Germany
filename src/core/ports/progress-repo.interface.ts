import { UserProgress, DayCompletion } from '../types/progress';
import { WritingSubmission } from '../types/text-builder';
import {
  ItemMasteryRecord,
  LessonSubmissionPayload,
  LessonValidationResult
} from '../types/learning';

import {
  GamificationState,
  LearningActivityPayload,
  GamificationActivityResult
} from '../types/gamification';

export interface IProgressRepository {
  getProgress(userId: string): Promise<UserProgress>;
  updateProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress>;
  recordDayCompletion(userId: string, completion: DayCompletion): Promise<void>;
  getDayCompletions(userId: string): Promise<Record<string, DayCompletion>>;
  saveWritingSubmission(userId: string, submission: WritingSubmission): Promise<void>;
  getWritingSubmission(userId: string, submissionId: string): Promise<WritingSubmission | null>;
  
  // Secure server-side validation and idempotency
  submitLesson(userId: string, payload: LessonSubmissionPayload): Promise<LessonValidationResult>;
  
  // Mastery tracking (levels 0 to 5)
  getMasteryRecords(userId: string): Promise<Record<string, ItemMasteryRecord>>;
  updateMasteryRecord(userId: string, record: ItemMasteryRecord): Promise<void>;
  saveMasteryRecords(userId: string, records: ItemMasteryRecord[]): Promise<void>;

  // Gamification, Streaks, Shields, Daily Missions, & Achievements
  getGamificationState(userId: string): Promise<GamificationState>;
  updateGamificationState(userId: string, updates: Partial<GamificationState>): Promise<GamificationState>;
  processLearningActivity(userId: string, activity: LearningActivityPayload): Promise<GamificationActivityResult>;
  claimDailyMission(userId: string, missionId: string): Promise<GamificationState>;
  syncOfflineActivities(userId: string, activities: Array<{ payload: LearningActivityPayload; timestamp: string }>): Promise<{ state: GamificationState; processedCount: number; duplicatesSkipped: number }>;
}
