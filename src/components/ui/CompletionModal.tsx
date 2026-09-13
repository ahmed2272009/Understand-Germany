import React from 'react';
import { Zap, Flame, ArrowRight } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  dayNumber: number;
  xpEarned: number;
  streakCount: number;
  scorePercentage: number;
  onContinue: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  dayNumber,
  xpEarned,
  streakCount,
  scorePercentage,
  onContinue
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-attention to-orange-400 flex items-center justify-center text-4xl shadow-lg shadow-attention/30">
          🏆
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-wider text-correct">
            Hervorragend gemeistert!
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Tag {dayNumber} Abgeschlossen!
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Genauigkeit: {scorePercentage}%
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center">
            <span className="text-xs text-slate-400 font-bold uppercase">Belohnung</span>
            <span className="text-lg font-black text-attention flex items-center gap-1 font-mono">
              <Zap className="w-4 h-4 fill-current" />
              +{xpEarned} XP
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col items-center">
            <span className="text-xs text-slate-400 font-bold uppercase">Streak</span>
            <span className="text-lg font-black text-streak flex items-center gap-1 font-mono">
              <Flame className="w-4 h-4 fill-current" />
              {streakCount} Tage
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="w-full py-3.5 rounded-2xl bg-correct hover:bg-correct-dark text-white font-black text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Weiter zur Quest</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
