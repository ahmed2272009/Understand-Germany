import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { IProgressRepository } from '../../core/ports/progress-repo.interface';
import { UserProgress, DayCompletion } from '../../core/types/progress';
import { WritingSubmission } from '../../core/types/text-builder';
import { ItemMasteryRecord, LessonSubmissionPayload, LessonValidationResult } from '../../core/types/learning';
import { GamificationState, LearningActivityPayload, GamificationActivityResult } from '../../core/types/gamification';
import { getFirebaseDb, isFirebaseConfigured } from './firebase-config';
import { LocalProgressService } from '../local/local-progress.service';

export class FirestoreProgressService implements IProgressRepository {
  private localFallback = new LocalProgressService();

  async getProgress(userId: string): Promise<UserProgress> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.getProgress(userId);
    }
    try {
      const db = getFirebaseDb();
      const ref = doc(db, 'users', userId, 'progress', 'current');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as UserProgress;
      }
      // Initialize if not present
      const initial = await this.localFallback.getProgress(userId);
      await setDoc(ref, initial);
      return initial;
    } catch (e) {
      console.warn('Firestore getProgress fallback to local:', e);
      return this.localFallback.getProgress(userId);
    }
  }

  async updateProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.updateProgress(userId, updates);
    }
    try {
      const db = getFirebaseDb();
      const ref = doc(db, 'users', userId, 'progress', 'current');
      const current = await this.getProgress(userId);
      const updated: UserProgress = {
        ...current,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await setDoc(ref, updated, { merge: true });
      return updated;
    } catch (e) {
      console.warn('Firestore updateProgress fallback to local:', e);
      return this.localFallback.updateProgress(userId, updates);
    }
  }

  async recordDayCompletion(userId: string, completion: DayCompletion): Promise<void> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.recordDayCompletion(userId, completion);
    }
    try {
      const db = getFirebaseDb();
      const ref = doc(db, 'users', userId, 'day_completions', completion.dayId);
      await setDoc(ref, completion);

      // Also advance progress state
      const progress = await this.getProgress(userId);
      const nextDay = Math.min(30, Math.max(progress.highestUnlockedDay, completion.dayNumber + 1));
      await this.updateProgress(userId, {
        highestUnlockedDay: nextDay,
        totalXp: progress.totalXp + completion.xpEarned,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Firestore recordDayCompletion fallback to local:', e);
      await this.localFallback.recordDayCompletion(userId, completion);
    }
  }

  async getDayCompletions(userId: string): Promise<Record<string, DayCompletion>> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.getDayCompletions(userId);
    }
    try {
      const db = getFirebaseDb();
      const colRef = collection(db, 'users', userId, 'day_completions');
      const snap = await getDocs(colRef);
      const map: Record<string, DayCompletion> = {};
      snap.forEach(d => {
        map[d.id] = d.data() as DayCompletion;
      });
      return map;
    } catch (e) {
      console.warn('Firestore getDayCompletions fallback to local:', e);
      return this.localFallback.getDayCompletions(userId);
    }
  }

  async saveWritingSubmission(userId: string, submission: WritingSubmission): Promise<void> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.saveWritingSubmission(userId, submission);
    }
    try {
      const db = getFirebaseDb();
      const ref = doc(db, 'users', userId, 'writing_submissions', submission.submissionId);
      await setDoc(ref, submission);
    } catch (e) {
      console.warn('Firestore saveWritingSubmission fallback to local:', e);
      await this.localFallback.saveWritingSubmission(userId, submission);
    }
  }

  async getWritingSubmission(userId: string, submissionId: string): Promise<WritingSubmission | null> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.getWritingSubmission(userId, submissionId);
    }
    try {
      const db = getFirebaseDb();
      const ref = doc(db, 'users', userId, 'writing_submissions', submissionId);
      const snap = await getDoc(ref);
      return snap.exists() ? (snap.data() as WritingSubmission) : null;
    } catch (e) {
      console.warn('Firestore getWritingSubmission fallback to local:', e);
      return this.localFallback.getWritingSubmission(userId, submissionId);
    }
  }

  // Authoritative server-side evaluation & idempotency check
  async submitLesson(userId: string, payload: LessonSubmissionPayload): Promise<LessonValidationResult> {
    // Both in production and local, grading & rewards are evaluated by the authoritative engine
    const result = await this.localFallback.submitLesson(userId, payload);
    
    if (isFirebaseConfigured() && result.success && !result.isDuplicate && result.completionRecord) {
      try {
        const db = getFirebaseDb();
        // Record completion in Firestore
        await setDoc(doc(db, 'users', userId, 'day_completions', payload.dayId), result.completionRecord);
        // Record authoritative XP event
        await setDoc(doc(db, 'users', userId, 'xp_events', payload.submissionToken), {
          eventId: payload.submissionToken,
          userId,
          amount: result.xpEarned,
          reason: 'lesson_completion',
          sourceToken: payload.submissionToken,
          metadata: { dayId: payload.dayId, dayNumber: payload.dayNumber, score: result.scorePercentage },
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        console.warn('Firestore async sync error on submitLesson:', e);
      }
    }
    return result;
  }

  async getMasteryRecords(userId: string): Promise<Record<string, ItemMasteryRecord>> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.getMasteryRecords(userId);
    }
    try {
      const db = getFirebaseDb();
      const snap = await getDocs(collection(db, 'users', userId, 'review_items'));
      const map: Record<string, ItemMasteryRecord> = {};
      snap.forEach(d => {
        map[d.id] = d.data() as ItemMasteryRecord;
      });
      return Object.keys(map).length > 0 ? map : this.localFallback.getMasteryRecords(userId);
    } catch (e) {
      console.warn('Firestore getMasteryRecords fallback to local:', e);
      return this.localFallback.getMasteryRecords(userId);
    }
  }

  async updateMasteryRecord(userId: string, record: ItemMasteryRecord): Promise<void> {
    await this.localFallback.updateMasteryRecord(userId, record);
    if (isFirebaseConfigured()) {
      try {
        const db = getFirebaseDb();
        await setDoc(doc(db, 'users', userId, 'review_items', record.id), record, { merge: true });
      } catch (e) {
        console.warn('Firestore updateMasteryRecord sync error:', e);
      }
    }
  }

  async saveMasteryRecords(userId: string, records: ItemMasteryRecord[]): Promise<void> {
    await this.localFallback.saveMasteryRecords(userId, records);
    if (isFirebaseConfigured()) {
      try {
        const db = getFirebaseDb();
        for (const r of records) {
          await setDoc(doc(db, 'users', userId, 'review_items', r.id), r, { merge: true });
        }
      } catch (e) {
        console.warn('Firestore saveMasteryRecords sync error:', e);
      }
    }
  }

  async getGamificationState(userId: string): Promise<GamificationState> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.getGamificationState(userId);
    }
    try {
      const db = getFirebaseDb();
      const snap = await getDoc(doc(db, 'users', userId, 'gamification', 'state'));
      if (snap.exists()) {
        return snap.data() as GamificationState;
      }
      return this.localFallback.getGamificationState(userId);
    } catch (e) {
      console.warn('Firestore getGamificationState fallback to local:', e);
      return this.localFallback.getGamificationState(userId);
    }
  }

  async updateGamificationState(userId: string, updates: Partial<GamificationState>): Promise<GamificationState> {
    const updated = await this.localFallback.updateGamificationState(userId, updates);
    if (isFirebaseConfigured()) {
      try {
        const db = getFirebaseDb();
        await setDoc(doc(db, 'users', userId, 'gamification', 'state'), updated, { merge: true });
      } catch (e) {
        console.warn('Firestore updateGamificationState sync error:', e);
      }
    }
    return updated;
  }

  async processLearningActivity(userId: string, activity: LearningActivityPayload): Promise<GamificationActivityResult> {
    const result = await this.localFallback.processLearningActivity(userId, activity);
    if (isFirebaseConfigured() && !result.isDuplicate) {
      try {
        const db = getFirebaseDb();
        // Log XP event
        await setDoc(doc(db, 'users', userId, 'xp_events', activity.activityToken), {
          eventId: activity.activityToken,
          userId,
          amount: result.xpEarned,
          reason: activity.type,
          sourceToken: activity.activityToken,
          timestamp: new Date().toISOString()
        });
        // Sync gamification state
        const gamificationState = await this.localFallback.getGamificationState(userId);
        await setDoc(doc(db, 'users', userId, 'gamification', 'state'), gamificationState, { merge: true });
      } catch (e) {
        console.warn('Firestore processLearningActivity sync error:', e);
      }
    }
    return result;
  }

  async claimDailyMission(userId: string, missionId: string): Promise<GamificationState> {
    return this.localFallback.claimDailyMission(userId, missionId);
  }

  async syncOfflineActivities(
    userId: string,
    activities: Array<{ payload: LearningActivityPayload; timestamp: string }>
  ): Promise<{ state: GamificationState; processedCount: number; duplicatesSkipped: number }> {
    return this.localFallback.syncOfflineActivities(userId, activities);
  }
}
