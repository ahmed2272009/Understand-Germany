import React from 'react';
import { GameSummaryStats } from '../../core/types/image-vocab';
import { Trophy, Zap, Target, RotateCcw, ArrowLeft, Award, Clock } from 'lucide-react';

interface GameSummaryProps {
  stats: GameSummaryStats;
  onPlayAgain: () => void;
  onExit: () => void;
  className?: string;
}

export const GameSummary: React.FC<GameSummaryProps> = ({
  stats,
  onPlayAgain,
  onExit,
  className = ''
}) => {
  const isNewHighScore = stats.score > 0 && stats.score >= stats.highScore;

  return (
    <div className={`rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-300 max-w-md mx-auto w-full ${className}`}>
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-3xl shadow-inner mb-1 animate-bounce">
          🏆
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">
          Spiel beendet
        </span>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {stats.gameTitle}
        </h2>
        {isNewHighScore && (
          <span className="text-xs font-black text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800 flex items-center gap-1.5 shadow-sm">
            <Trophy className="w-3.5 h-3.5" />
            <span>Neuer persönlicher Rekord!</span>
          </span>
        )}
      </div>

      {/* Main Score & XP Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Erreichte Punkte
          </span>
          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            {stats.score}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
            Rekord: {stats.highScore}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center text-center">
          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Belohnung</span>
          </span>
          <span className="text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight mt-0.5 font-mono">
            +{stats.xpEarned} XP
          </span>
          <span className="text-[10px] text-amber-600/80 font-semibold mt-0.5">
            Fortschritt gesichert
          </span>
        </div>
      </div>

      {/* Accuracy & Details Stats */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-bold flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span>Genauigkeit</span>
          </span>
          <span className="font-black text-slate-900 dark:text-white">
            {stats.accuracy}%
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            <span>Richtige Antworten</span>
          </span>
          <span className="font-black text-emerald-600 dark:text-emerald-400">
            {stats.correctCount} von {stats.itemsCount}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Spielzeit</span>
          </span>
          <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
            {stats.timeSpentSeconds}s
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2">
        <button
          type="button"
          onClick={onPlayAgain}
          className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-600/30 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Nochmal spielen</span>
        </button>

        <button
          type="button"
          onClick={onExit}
          className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Zurück zur Spielhalle</span>
        </button>
      </div>
    </div>
  );
};
