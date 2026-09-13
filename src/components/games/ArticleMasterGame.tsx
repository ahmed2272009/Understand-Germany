import React, { useState } from 'react';
import { IMAGE_VOCAB_ITEMS } from '../../content/image-vocab';
import { GameSummary } from './GameSummary';
import { GameSummaryStats, Article } from '../../core/types/image-vocab';
import { Trophy, Zap, Volume2, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

interface ArticleMasterGameProps {
  onExit: () => void;
  onRewardXP?: (xp: number) => void;
}

export const ArticleMasterGame: React.FC<ArticleMasterGameProps> = ({ onExit, onRewardXP }) => {
  const TOTAL_ROUNDS = 15;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());

  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('dq_hs_article_master') || 0);
  });

  const pool = IMAGE_VOCAB_ITEMS;
  const current = pool[currentIdx % pool.length];

  const handleSelect = (art: Article) => {
    if (feedback !== null || gameOver) return;

    const isCorrect = art === current.article;

    if (isCorrect) {
      const newStreak = streak + 1;
      const points = 15 + newStreak * 5;
      setScore(s => s + points);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount(c => c + 1);
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx + 1 >= TOTAL_ROUNDS) {
        setGameOver(true);
        const finalScore = score + (isCorrect ? 15 + (streak + 1) * 5 : 0);
        const xp = Math.min(50, Math.floor(finalScore / 10) + 10);
        onRewardXP?.(xp);
        if (finalScore > highScore) {
          setHighScore(finalScore);
          localStorage.setItem('dq_hs_article_master', String(finalScore));
        }
      } else {
        setCurrentIdx(i => i + 1);
      }
    }, 450);
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(`${current.article} ${current.german}`);
      u.lang = 'de-DE';
      window.speechSynthesis.speak(u);
    }
  };

  const restartGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setFeedback(null);
    setGameOver(false);
  };

  if (gameOver) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = Math.round((correctCount / TOTAL_ROUNDS) * 100);
    const summaryStats: GameSummaryStats = {
      gameId: 'article-master',
      gameTitle: 'Article Master',
      score,
      highScore: Math.max(score, highScore),
      accuracy,
      itemsCount: TOTAL_ROUNDS,
      correctCount,
      streakCount: maxStreak,
      xpEarned: Math.min(50, Math.floor(score / 10) + 10),
      timeSpentSeconds: timeSpent
    };

    return (
      <GameSummary
        stats={summaryStats}
        onPlayAgain={restartGame}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col gap-6 max-w-lg mx-auto w-full">
      {/* Header: Score, Progress, Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            <Trophy className="w-4 h-4" />
            <span>{score} Pkt</span>
          </div>

          <span className="text-xs font-bold text-slate-400">
            Runde {currentIdx + 1}/{TOTAL_ROUNDS}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-black text-orange-500 bg-orange-50 dark:bg-orange-950/60 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800">
          <Zap className="w-4 h-4 fill-orange-500" />
          <span>Combo x{streak + 1}</span>
        </div>
      </div>

      {/* Target Word Card with SVG Illustration */}
      <div
        className={`py-8 px-4 rounded-3xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 relative ${
          feedback === 'correct'
            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 scale-105 ring-4 ring-emerald-500/20'
            : feedback === 'wrong'
            ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 scale-95 ring-4 ring-rose-500/20'
            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 shadow-sm'
        }`}
      >
        <div className="w-20 h-20 drop-shadow-md" dangerouslySetInnerHTML={{ __html: current.imageSvg }} />

        <div className="flex items-center gap-2">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {current.german}
          </h2>
          <button
            type="button"
            onClick={speak}
            className="p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 transition-all shadow-sm"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <span className="text-xs text-slate-400 font-bold">
          Plural: {current.plural} • 🇬🇧 {current.english}
        </span>

        {/* Feedback Badge */}
        {feedback && (
          <div className="absolute top-3 right-3 animate-in zoom-in-75">
            {feedback === 'correct' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-500" />
            )}
          </div>
        )}
      </div>

      {/* 3 Large Action Buttons: der, die, das */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          disabled={feedback !== null}
          onClick={() => handleSelect('der')}
          className="py-5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-lg md:text-xl shadow-lg shadow-sky-600/30 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 border-b-4 border-sky-800"
        >
          <span>der</span>
          <span className="text-[10px] font-normal uppercase tracking-wider text-sky-200">Maskulin</span>
        </button>

        <button
          type="button"
          disabled={feedback !== null}
          onClick={() => handleSelect('die')}
          className="py-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-lg md:text-xl shadow-lg shadow-rose-600/30 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 border-b-4 border-rose-800"
        >
          <span>die</span>
          <span className="text-[10px] font-normal uppercase tracking-wider text-rose-200">Feminin</span>
        </button>

        <button
          type="button"
          disabled={feedback !== null}
          onClick={() => handleSelect('das')}
          className="py-5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-lg md:text-xl shadow-lg shadow-amber-600/30 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 border-b-4 border-amber-800"
        >
          <span>das</span>
          <span className="text-[10px] font-normal uppercase tracking-wider text-amber-200">Neutral</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
        <span>Tipp: Nomen auf -chen / -lein / -um sind fast immer "das".</span>
      </div>
    </div>
  );
};
