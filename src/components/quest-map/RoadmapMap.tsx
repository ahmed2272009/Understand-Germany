import React from 'react';
import { ALL_DAYS } from '../../content/days';
import { DayLesson } from '../../core/types/curriculum';
import { useProgress } from '../../context/ProgressContext';
import { Check, Lock, Star, Trophy, Sparkles } from 'lucide-react';

interface RoadmapMapProps {
  onSelectDay: (day: DayLesson) => void;
}

export const RoadmapMap: React.FC<RoadmapMapProps> = ({ onSelectDay }) => {
  const { progress, completions } = useProgress();
  const highestUnlocked = progress?.highestUnlockedDay || 1;

  // Group days by Phase
  const phases = [
    { number: 1, title: 'Phase 1: Das Fundament', days: ALL_DAYS.slice(0, 7), color: 'from-blue-600 to-indigo-700' },
    { number: 2, title: 'Phase 2: Bausteine & Nomen', days: ALL_DAYS.slice(7, 14), color: 'from-emerald-600 to-teal-700' },
    { number: 3, title: 'Phase 3: Kasus & Modale', days: ALL_DAYS.slice(14, 21), color: 'from-amber-600 to-orange-700' },
    { number: 4, title: 'Phase 4: Satzbau & 20-Zeilen-Text', days: ALL_DAYS.slice(21, 30), color: 'from-purple-600 to-pink-700' },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-3xl text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>30-Tage Deutsch-Quest</span>
          </div>
          <h1 className="text-xl font-black tracking-tight">Von Null zum 20-Zeilen-Text</h1>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Folge dem Pfad, meistere die 4 Farben und baue dein A1-Sprachsystem auf.
          </p>
        </div>
        <div className="absolute right-2 -bottom-2 text-6xl opacity-15">🇩🇪</div>
      </div>

      {/* Phase Roadmap */}
      {phases.map((phase) => (
        <section key={phase.number} className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${phase.color}`} />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {phase.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {phase.days.map((day) => {
              const isCompleted = !!completions[day.dayId]?.passed;
              const isUnlocked = day.dayNumber <= highestUnlocked;
              const isCurrent = day.dayNumber === highestUnlocked;

              return (
                <button
                  key={day.dayId}
                  onClick={() => isUnlocked && onSelectDay(day)}
                  disabled={!isUnlocked}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                    isCompleted
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 hover:border-emerald-400'
                      : isCurrent
                      ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-md ring-2 ring-indigo-500/20 scale-[1.01]'
                      : isUnlocked
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/40 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Node circle */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                          : isCurrent
                          ? 'bg-gradient-to-br from-indigo-500 to-emerald-500 text-white animate-pulse'
                          : isUnlocked
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : !isUnlocked ? (
                        <Lock className="w-4 h-4 text-slate-400" />
                      ) : (
                        <span>{day.dayNumber}</span>
                      )}
                    </div>

                    {/* Titles */}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Tag {day.dayNumber}
                        </span>
                        {day.dayNumber === 29 && (
                          <span className="bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <Trophy className="w-2.5 h-2.5" /> 20 Zeilen
                          </span>
                        )}
                        {day.dayNumber === 30 && (
                          <span className="bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5" /> Abschluss
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                        {day.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {day.goal}
                      </p>
                    </div>
                  </div>

                  {/* Right indicator */}
                  <div className="text-right">
                    {isCompleted ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        Fertig ✓
                      </span>
                    ) : isCurrent ? (
                      <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full animate-bounce">
                        START ▶
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
