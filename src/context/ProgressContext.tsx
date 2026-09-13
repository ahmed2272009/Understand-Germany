import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserProgress, DayCompletion, LevelInfo } from '../core/types/progress';
import { GamificationEngine } from '../core/engines/gamification-engine';
import { useServices } from './ServiceContext';
import { useAuth } from './AuthContext';
import {
  ItemMasteryRecord,
  LessonSubmissionPayload,
  LessonValidationResult
} from '../core/types/learning';
import {
  GamificationState,
  UserAchievement,
  DailyMissionItem,
  StreakMilestone,
  LearningActivityPayload,
  GamificationActivityResult,
  SYSTEM_ACHIEVEMENTS,
  STREAK_MILESTONES
} from '../core/types/gamification';

interface ProgressContextValue {
  progress: UserProgress | null;
  completions: Record<string, DayCompletion>;
  levelInfo: LevelInfo;
  masteryRecords: Record<string, ItemMasteryRecord>;
  gamificationState: GamificationState | null;
  achievements: UserAchievement[];
  dailyMissions: DailyMissionItem[];
  streakMilestones: StreakMilestone[];
  recordDayCompletion: (completion: DayCompletion) => Promise<void>;
  submitLesson: (payload: LessonSubmissionPayload) => Promise<LessonValidationResult>;
  updateMasteryItem: (record: ItemMasteryRecord) => Promise<void>;
  refreshMastery: () => Promise<void>;
  processActivity: (activity: LearningActivityPayload) => Promise<GamificationActivityResult>;
  claimMission: (missionId: string) => Promise<void>;
  syncOfflineQueue: (activities: Array<{ payload: LearningActivityPayload; timestamp: string }>) => Promise<{ processedCount: number; duplicatesSkipped: number }>;
  deductHeart: () => Promise<void>;
  replenishHearts: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { progressRepo } = useServices();
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [completions, setCompletions] = useState<Record<string, DayCompletion>>({});
  const [masteryRecords, setMasteryRecords] = useState<Record<string, ItemMasteryRecord>>({});
  const [gamificationState, setGamificationState] = useState<GamificationState | null>(null);

  const refreshMastery = useCallback(async () => {
    if (!user) return;
    const records = await progressRepo.getMasteryRecords(user.uid);
    setMasteryRecords(records);
  }, [user, progressRepo]);

  const refreshGamification = useCallback(async () => {
    if (!user) return;
    const gState = await progressRepo.getGamificationState(user.uid);
    setGamificationState(gState);
  }, [user, progressRepo]);

  useEffect(() => {
    if (!user) return;
    progressRepo.getProgress(user.uid).then(setProgress);
    progressRepo.getDayCompletions(user.uid).then(setCompletions);
    refreshMastery();
    refreshGamification();
  }, [user, progressRepo, refreshMastery, refreshGamification]);

  const levelInfo = GamificationEngine.getLevelInfo(progress?.totalXp || 0);

  // Compute live state for all 9 SYSTEM_ACHIEVEMENTS
  const achievements: UserAchievement[] = gamificationState
    ? GamificationEngine.evaluateAchievements(
        {
          completionsCount: Object.keys(completions).length,
          streakCount: gamificationState.streakCount,
          longestStreak: gamificationState.longestStreak,
          wordsMastered: Object.values(masteryRecords).filter(m => m.mastery >= 5).length,
          grammarLessonsCount: gamificationState.grammarLessonsCompleted,
          sentencesCount: gamificationState.sentencesConstructed,
          writingsCount: gamificationState.writingsCompleted
        },
        gamificationState.achievements
      ).userAchievements
    : SYSTEM_ACHIEVEMENTS.map(a => ({
        ...a,
        progress: 0,
        unlocked: false,
        unlockedAt: null
      }));

  const dailyMissions = gamificationState?.dailyMissions || GamificationEngine.generateDailyMissions(new Date().toISOString().split('T')[0]);

  const recordDayCompletion = async (completion: DayCompletion) => {
    if (!user || !progress) return;
    await progressRepo.recordDayCompletion(user.uid, completion);
    
    // Refresh
    const updatedProg = await progressRepo.getProgress(user.uid);
    const updatedComps = await progressRepo.getDayCompletions(user.uid);
    setProgress(updatedProg);
    setCompletions(updatedComps);
    await refreshGamification();
  };

  const submitLesson = async (payload: LessonSubmissionPayload): Promise<LessonValidationResult> => {
    if (!user) {
      throw new Error('User not authenticated for lesson submission');
    }
    const result = await progressRepo.submitLesson(user.uid, payload);
    
    // Refresh progress, completions, gamification, and mastery state
    const updatedProg = await progressRepo.getProgress(user.uid);
    const updatedComps = await progressRepo.getDayCompletions(user.uid);
    const updatedMastery = await progressRepo.getMasteryRecords(user.uid);
    const updatedGamification = await progressRepo.getGamificationState(user.uid);
    
    setProgress(updatedProg);
    setCompletions(updatedComps);
    setMasteryRecords(updatedMastery);
    setGamificationState(updatedGamification);
    
    return result;
  };

  const updateMasteryItem = async (record: ItemMasteryRecord) => {
    if (!user) return;
    await progressRepo.updateMasteryRecord(user.uid, record);
    setMasteryRecords(prev => ({ ...prev, [record.id]: record }));
  };

  const processActivity = async (activity: LearningActivityPayload): Promise<GamificationActivityResult> => {
    if (!user) throw new Error('User not authenticated');
    const result = await progressRepo.processLearningActivity(user.uid, activity);
    
    const updatedProg = await progressRepo.getProgress(user.uid);
    const updatedGamification = await progressRepo.getGamificationState(user.uid);
    setProgress(updatedProg);
    setGamificationState(updatedGamification);

    return result;
  };

  const claimMission = async (missionId: string) => {
    if (!user) return;
    const updated = await progressRepo.claimDailyMission(user.uid, missionId);
    setGamificationState(updated);
    const updatedProg = await progressRepo.getProgress(user.uid);
    setProgress(updatedProg);
  };

  const syncOfflineQueue = async (activities: Array<{ payload: LearningActivityPayload; timestamp: string }>) => {
    if (!user) return { processedCount: 0, duplicatesSkipped: 0 };
    const res = await progressRepo.syncOfflineActivities(user.uid, activities);
    setGamificationState(res.state);
    const updatedProg = await progressRepo.getProgress(user.uid);
    setProgress(updatedProg);
    return { processedCount: res.processedCount, duplicatesSkipped: res.duplicatesSkipped };
  };

  const deductHeart = async () => {
    if (!user || !progress) return;
    const newHearts = Math.max(0, progress.heartsCount - 1);
    const updated = await progressRepo.updateProgress(user.uid, { heartsCount: newHearts });
    setProgress(updated);
  };

  const replenishHearts = async () => {
    if (!user || !progress) return;
    const updated = await progressRepo.updateProgress(user.uid, { heartsCount: 5 });
    setProgress(updated);
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      completions,
      levelInfo,
      masteryRecords,
      gamificationState,
      achievements,
      dailyMissions,
      streakMilestones: STREAK_MILESTONES,
      recordDayCompletion,
      submitLesson,
      updateMasteryItem,
      refreshMastery,
      processActivity,
      claimMission,
      syncOfflineQueue,
      deductHeart,
      replenishHearts
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
};
