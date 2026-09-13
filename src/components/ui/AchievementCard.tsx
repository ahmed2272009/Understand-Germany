import React from 'react';

interface AchievementCardProps {
  title: string;
  description: string;
  badge: string;
  unlocked: boolean;
  progressText?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  badge,
  unlocked,
  progressText
}) => {
  return (
    <div className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
      unlocked
        ? 'bg-white dark:bg-slate-900 border-attention/40 shadow-sm'
        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
    }`}>
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
        unlocked
          ? 'bg-attention/20 text-attention-dark'
          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 grayscale'
      }`}>
        {badge}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">
            {title}
          </h4>
          {unlocked && (
            <span className="text-[9px] font-black text-correct bg-correct-light dark:bg-correct/20 px-1.5 py-0.2 rounded-full">
              Freigeschaltet
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {description}
        </p>
        {!unlocked && progressText && (
          <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
            {progressText}
          </span>
        )}
      </div>
    </div>
  );
};
