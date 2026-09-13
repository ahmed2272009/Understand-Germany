import React from 'react';
import { Flame, ShieldCheck, Trophy } from 'lucide-react';

interface StreakCardProps {
  streakCount: number;
  longestStreak?: number;
  freezesCount?: number;
  className?: string;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  streakCount,
  longestStreak,
  freezesCount = 1,
  className = ''
}) => {
  const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const today = new Date().getDay();
  // Sunday is 0 in JS Date, convert so Monday is 0, Sunday is 6
  const currentDayIdx = today === 0 ? 6 : today - 1;
  
  return (
    <div className={`p-4 rounded-3xl bg-gradient-to-br from-streak-light via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-streak/20 shadow-antigravity ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-streak text-white flex items-center justify-center shadow-md shadow-streak/30">
            <Flame className="w-6 h-6 fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {streakCount} {streakCount === 1 ? 'Tag' : 'Tage'}
              </span>
            </div>
            <span className="text-xs font-bold text-streak uppercase tracking-wider block">
              Aktiver Lernstreak
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          {freezesCount > 0 ? (
            <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>{freezesCount} {freezesCount === 1 ? 'Streak-Schild' : 'Streak-Schilde'}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              <span>0 Schilde</span>
            </div>
          )}

          {longestStreak !== undefined && longestStreak > 1 && (
            <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span>Rekord: {longestStreak} Tage</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        {daysOfWeek.map((day, idx) => {
          const isDone = idx <= currentDayIdx && streakCount > (currentDayIdx - idx);
          const isToday = idx === currentDayIdx;
          return (
            <div key={day} className="flex flex-col items-center gap-1">
              <span className={`text-[10px] font-bold ${isToday ? 'text-streak font-black' : 'text-slate-400'}`}>
                {day}
              </span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-all ${
                  isDone
                    ? 'bg-streak text-white font-black shadow-sm shadow-streak/40'
                    : isToday
                    ? 'border-2 border-streak text-streak font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                }`}
              >
                {isDone ? '✓' : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
