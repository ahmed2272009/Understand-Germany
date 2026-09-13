import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StreakCard } from '../components/ui/StreakCard';
import { XPCard } from '../components/ui/XPCard';
import { AchievementCard } from '../components/ui/AchievementCard';
import { ALL_DAYS } from '../content/days';
import { 
  TrendingUp, 
  Award, 
  BarChart3,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { progress, completions, levelInfo, achievements, streakMilestones } = useProgress();

  const completedCount = Object.keys(completions).length;

  // Phase statistics
  const phaseStats = [
    {
      phase: 1,
      title: 'Phase 1: Das Fundament (Tag 1–7)',
      total: 7,
      completed: ALL_DAYS.slice(0, 7).filter(d => completions[d.dayId]).length,
      topics: 'Alphabet, Pronomen, V2-Stellung, Akkusativ'
    },
    {
      phase: 2,
      title: 'Phase 2: Alltag & Bewegung (Tag 8–15)',
      total: 8,
      completed: ALL_DAYS.slice(7, 15).filter(d => completions[d.dayId]).length,
      topics: 'Dativ, Modalverben, Uhrzeit, Trennbare Verben'
    },
    {
      phase: 3,
      title: 'Phase 3: Vergangenheit & Satzbau (Tag 16–22)',
      total: 7,
      completed: ALL_DAYS.slice(15, 22).filter(d => completions[d.dayId]).length,
      topics: 'Perfekt (haben/sein), Weil-Nebensätze, Präteritum'
    },
    {
      phase: 4,
      title: 'Phase 4: Meisterschaft (Tag 23–30)',
      total: 8,
      completed: ALL_DAYS.slice(22, 30).filter(d => completions[d.dayId]).length,
      topics: 'Adjektivendungen, Konjunktiv II, Passiv, 20-Zeilen Text'
    }
  ];

  const currentStreak = progress?.streakCount || 0;
  const unlockedAchievementsCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-4 md:p-6 pb-24">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-correct mb-1">
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">
            Lern-Statistiken & Meilensteine
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Dein persönlicher Fortschritt
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Verfolge deine tägliche Aktivität, beherrschte Grammatikthemen und freigeschaltete Abzeichen.
        </p>
      </div>

      {/* Gamification Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StreakCard
          streakCount={currentStreak}
          longestStreak={progress?.longestStreak || currentStreak}
          freezesCount={progress?.streakFreezesAvailable ?? 1}
        />
        <XPCard
          totalXp={progress?.totalXp || 0}
          level={levelInfo.level}
          levelTitle={levelInfo.title}
          badge={levelInfo.badge}
          minXp={levelInfo.minXp}
          maxXp={levelInfo.maxXp}
          dailyGoalProgress={Math.min(50, (progress?.totalXp || 0) % 50 + 20)}
          dailyGoalTarget={50}
        />
      </div>

      {/* Streak Milestones Progression */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-streak" />
            <span>Streak-Meilensteine & Belohnungen</span>
          </h2>
          <span className="text-xs text-slate-400 font-bold">
            Aktuell: {currentStreak} Tage
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {streakMilestones.map(milestone => {
            const isReached = currentStreak >= milestone.days;
            return (
              <div
                key={milestone.days}
                className={`p-3 rounded-2xl border flex flex-col gap-1 transition-all ${
                  isReached
                    ? 'bg-streak-light/40 dark:bg-streak/10 border-streak/40 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{milestone.badge}</span>
                  {isReached ? (
                    <span className="text-[10px] font-black text-streak bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded-full border border-streak/30">
                      Erreicht ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">
                      {milestone.days} Tage
                    </span>
                  )}
                </div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {milestone.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mt-0.5">
                  <span>+{milestone.rewardXp} XP</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400">
                    <ShieldAlert className="w-2.5 h-2.5" />
                    +{milestone.rewardShields} Schild
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase Mastery Cards */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-learning" />
            <span>Grammatik-Beherrschung nach Phasen</span>
          </h2>
          <span className="text-xs text-slate-400 font-bold">
            {completedCount}/30 Tage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {phaseStats.map(stat => (
            <div
              key={stat.phase}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                  {stat.title}
                </span>
                <span className="text-xs font-black text-learning">
                  {stat.completed}/{stat.total}
                </span>
              </div>

              <ProgressBar
                value={stat.completed}
                max={stat.total}
                color="learning"
                size="sm"
              />

              <p className="text-[11px] text-slate-400 line-clamp-1">
                {stat.topics}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 9 Core System Achievements Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-attention" />
            <span>Offizielle Erfolge ({unlockedAchievementsCount}/{achievements.length})</span>
          </h2>
          <span className="text-xs text-slate-400 font-bold">
            Verdiene Abzeichen & Bonus-XP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map(ach => (
            <AchievementCard
              key={ach.id}
              title={ach.title}
              description={ach.description}
              badge={ach.badge}
              unlocked={ach.unlocked}
              progressText={`${ach.progress}/${ach.target}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
