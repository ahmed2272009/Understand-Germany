import React from 'react';
import { StreakCard } from '../components/ui/StreakCard';
import { XPCard } from '../components/ui/XPCard';
import { DailyMission } from '../components/ui/DailyMission';
import { LessonCard } from '../components/ui/LessonCard';
import { useProgress } from '../context/ProgressContext';
import { ALL_DAYS } from '../content/days';
import { DayLesson } from '../core/types/curriculum';
import { PageId } from '../components/layout/Sidebar';
import { Play, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onSelectLesson: (lesson: DayLesson) => void;
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectLesson, onNavigate }) => {
  const { progress, completions, levelInfo, dailyMissions } = useProgress();

  const currentDayNumber = progress?.highestUnlockedDay || 1;
  const currentLesson = ALL_DAYS.find(d => d.dayNumber === currentDayNumber) || ALL_DAYS[0];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-4 md:p-6 pb-24">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-learning via-indigo-600 to-learning p-6 md:p-8 text-white shadow-xl shadow-learning/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Willkommen zurück!</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Bereit für dein nächstes Deutsch-Abenteuer?
            </h1>
            <p className="text-blue-100 text-sm md:text-base mt-1 max-w-lg">
              30 Tage Schritt für Schritt vom Anfänger zum sicheren Sprecher.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectLesson(currentLesson)}
            className="self-start md:self-auto px-6 py-3.5 rounded-2xl bg-white text-learning font-black text-sm shadow-lg hover:bg-blue-50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-learning" />
            <span>Jetzt lernen: Tag {currentDayNumber}</span>
          </button>
        </div>

        {/* Decorative circle glow */}
        <div className="absolute -right-8 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Gamification Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StreakCard
          streakCount={progress?.streakCount || 0}
          longestStreak={progress?.longestStreak || (progress?.streakCount || 1)}
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

      {/* Today's Active Lesson Spotlight */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-learning" />
            <span>Deine heutige Lektion</span>
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('learn')}
            className="text-xs font-bold text-learning hover:underline flex items-center gap-1"
          >
            <span>Alle 30 Tage ansehen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <LessonCard
          dayNumber={currentLesson.dayNumber}
          title={currentLesson.title}
          goal={currentLesson.goal}
          phaseTitle={currentLesson.phaseTitle}
          status="current"
          score={completions[currentLesson.dayId]?.scorePercentage}
          onClick={() => onSelectLesson(currentLesson)}
        />
      </div>

      {/* Daily Missions */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-attention" />
            <span>Tages-Missionen</span>
          </h2>
          <span className="text-xs text-slate-400 font-bold">
            {dailyMissions.filter(m => m.completed).length}/{dailyMissions.length} Erledigt
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dailyMissions.map(m => (
            <DailyMission
              key={m.id}
              title={m.title}
              description={m.description}
              current={m.progress}
              target={m.target}
              xpReward={m.xpReward}
              completed={m.completed}
            />
          ))}
        </div>
      </div>

      {/* Quick Launchpad to other hubs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <button
          type="button"
          onClick={() => onNavigate('practice')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-learning/40 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-learning/10 text-learning flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
            ⚡
          </div>
          <span className="text-xs font-black text-slate-800 dark:text-slate-100 block">Übungen</span>
          <span className="text-[11px] text-slate-400">Syntax & Lückentext</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('games')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400/40 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
            🎮
          </div>
          <span className="text-xs font-black text-slate-800 dark:text-slate-100 block">Artikel-Jäger</span>
          <span className="text-[11px] text-slate-400">der / die / das Arcade</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('review')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-correct/40 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-correct/10 text-correct flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
            🔁
          </div>
          <span className="text-xs font-black text-slate-800 dark:text-slate-100 block">SRS-Deck</span>
          <span className="text-[11px] text-slate-400">Langzeitgedächtnis</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400/40 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold mb-2 group-hover:scale-110 transition-transform">
            ✍️
          </div>
          <span className="text-xs font-black text-slate-800 dark:text-slate-100 block">20-Zeilen Lab</span>
          <span className="text-[11px] text-slate-400">V2 Satz-Prüfer</span>
        </button>
      </div>
    </div>
  );
};
