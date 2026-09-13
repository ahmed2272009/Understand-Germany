import React from 'react';
import { Zap } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface XPCardProps {
  totalXp: number;
  level: number;
  levelTitle: string;
  badge: string;
  minXp: number;
  maxXp: number;
  dailyGoalProgress?: number;
  dailyGoalTarget?: number;
  className?: string;
}

export const XPCard: React.FC<XPCardProps> = ({
  totalXp,
  level,
  levelTitle,
  badge,
  minXp,
  maxXp,
  dailyGoalProgress = 35,
  dailyGoalTarget = 50,
  className = ''
}) => {
  const xpInLevel = Math.max(0, totalXp - minXp);
  const xpNeeded = Math.max(1, maxXp - minXp);

  return (
    <div className={`p-4 rounded-3xl bg-gradient-to-br from-attention-light/60 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-attention/30 shadow-antigravity flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-attention to-orange-400 text-white flex items-center justify-center text-2xl shadow-md">
            {badge}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-slate-900 dark:text-white">
                Level {level}
              </span>
              <span className="text-xs text-slate-500 font-medium">({totalXp} XP)</span>
            </div>
            <span className="text-xs font-bold text-attention-dark dark:text-attention uppercase tracking-wider block">
              {levelTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-attention/20 text-attention-dark dark:text-attention px-2.5 py-1 rounded-full text-xs font-black font-mono">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{dailyGoalProgress}/{dailyGoalTarget} XP</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
          <span>Level {level} Fortschritt</span>
          <span>{xpInLevel} / {xpNeeded} XP zum nächsten Rang</span>
        </div>
        <ProgressBar value={xpInLevel} max={xpNeeded} color="attention" size="sm" />
      </div>
    </div>
  );
};
