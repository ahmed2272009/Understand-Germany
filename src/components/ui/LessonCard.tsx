import React from 'react';
import { Check, Lock, Play } from 'lucide-react';

interface LessonCardProps {
  dayNumber: number;
  title: string;
  goal: string;
  phaseTitle: string;
  status: 'completed' | 'current' | 'locked';
  score?: number;
  onClick: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  dayNumber,
  title,
  goal,
  phaseTitle,
  status,
  score,
  onClick
}) => {
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  const isLocked = status === 'locked';

  return (
    <div
      onClick={() => !isLocked && onClick()}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      aria-disabled={isLocked}
      onKeyDown={(e) => {
        if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`p-4 rounded-3xl border transition-all text-left flex items-center justify-between gap-3 select-none ${
        isCompleted
          ? 'bg-correct-light/60 dark:bg-correct/10 border-correct/30 hover:border-correct shadow-sm'
          : isCurrent
          ? 'bg-white dark:bg-slate-900 border-learning shadow-antigravity ring-2 ring-learning/20 hover:scale-[1.01]'
          : 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-sm shrink-0 ${
            isCompleted
              ? 'bg-correct text-white shadow-correct/30'
              : isCurrent
              ? 'bg-gradient-to-tr from-learning to-indigo-600 text-white shadow-learning/30 animate-pulse'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
          }`}
        >
          {isCompleted ? (
            <Check className="w-6 h-6 stroke-[3]" />
          ) : isLocked ? (
            <Lock className="w-5 h-5 text-slate-400" />
          ) : (
            <span>{dayNumber}</span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Tag {dayNumber}
            </span>
            <span className="text-[10px] font-bold text-learning bg-learning-light dark:bg-slate-800 px-2 py-0.2 rounded-full">
              {phaseTitle.split(':')[0]}
            </span>
          </div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug mt-0.5">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {goal}
          </p>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {isCompleted && (
          <div className="text-right">
            <span className="text-[10px] font-black text-correct bg-correct-light dark:bg-correct/20 px-2 py-0.5 rounded-full block">
              {score ? `${score}%` : 'Fertig'}
            </span>
          </div>
        )}
        {isCurrent && (
          <button
            type="button"
            className="px-3.5 py-2 rounded-xl bg-learning text-white font-black text-xs shadow-md flex items-center gap-1 active:scale-95 transition-transform"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start</span>
          </button>
        )}
      </div>
    </div>
  );
};
