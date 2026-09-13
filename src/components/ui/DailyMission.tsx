import React from 'react';
import { Zap } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface DailyMissionProps {
  title: string;
  description: string;
  current: number;
  target: number;
  xpReward: number;
  completed: boolean;
}

export const DailyMission: React.FC<DailyMissionProps> = ({
  title,
  description,
  current,
  target,
  xpReward,
  completed
}) => {
  return (
    <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
      completed
        ? 'bg-correct-light/60 dark:bg-correct/10 border-correct/40'
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
    }`}>
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
            {title}
          </span>
          {completed && (
            <span className="text-[9px] font-black text-correct bg-correct-light dark:bg-correct/20 px-1.5 py-0.5 rounded-full">
              Erledigt ✓
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {description}
        </p>
        <ProgressBar value={current} max={target} size="sm" color={completed ? 'correct' : 'learning'} />
      </div>

      <div className="flex flex-col items-center justify-center shrink-0">
        <span className="text-xs font-black text-attention flex items-center gap-0.5 font-mono">
          <Zap className="w-3.5 h-3.5 fill-current" />
          +{xpReward} XP
        </span>
      </div>
    </div>
  );
};
