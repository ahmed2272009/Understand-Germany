import React from 'react';
import { Trophy, Play } from 'lucide-react';

interface GameCardProps {
  title: string;
  subtitle: string;
  badge: string;
  difficulty: 'Leicht' | 'Mittel' | 'Schwer';
  highScore?: number;
  onClick: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  title,
  subtitle,
  badge,
  difficulty,
  highScore = 0,
  onClick
}) => {
  const diffColors = {
    Leicht: 'bg-correct-light text-correct border-correct/30',
    Mittel: 'bg-attention-light text-attention-dark border-attention/30',
    Schwer: 'bg-incorrect-light text-incorrect border-incorrect/30'
  }[difficulty];

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-antigravity hover:border-learning/50 hover:shadow-antigravity-hover transition-all cursor-pointer flex flex-col justify-between gap-4 select-none"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm">
            {badge}
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          </div>
        </div>

        <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-wider ${diffColors}`}>
          {difficulty}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
          <Trophy className="w-3.5 h-3.5 text-attention" />
          <span>Rekord: <strong className="text-slate-800 dark:text-slate-200">{highScore}</strong></span>
        </div>

        <button
          type="button"
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black flex items-center gap-1 hover:bg-learning transition-colors"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Spielen</span>
        </button>
      </div>
    </div>
  );
};
