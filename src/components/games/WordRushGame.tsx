import React, { useState, useEffect, useCallback } from 'react';
import { IMAGE_VOCAB_ITEMS } from '../../content/image-vocab';
import { GameSummary } from './GameSummary';
import { GameSummaryStats } from '../../core/types/image-vocab';
import { Zap, Clock, Flame, Volume2 } from 'lucide-react';

interface WordRushGameProps {
  onExit: () => void;
  onRewardXP?: (xp: number) => void;
}

export const WordRushGame: React.FC<WordRushGameProps> = ({ onExit, onRewardXP }) => {
  const GAME_DURATION = 45; // 45 seconds sprint
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Highscore from local storage
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('dq_hs_word_rush') || 0);
  });

  const pool = IMAGE_VOCAB_ITEMS;
  const currentItem = pool[currentIndex % pool.length];

  // Generate 4 options (1 correct English, 3 distractors)
  const options = React.useMemo(() => {
    const correct = currentItem.english;
    const others = pool
      .filter(p => p.id !== currentItem.id)
      .map(p => p.english);
    // Shuffle
    const distractors = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...distractors, correct].sort(() => 0.5 - Math.random());
  }, [currentItem, pool]);

  // Countdown timer
  useEffect(() => {
    if (gameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && !gameOver) {
        finishGame();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  const finishGame = useCallback(() => {
    setGameOver(true);
    const xp = Math.min(60, Math.floor(score / 15) + 10);
    onRewardXP?.(xp);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('dq_hs_word_rush', String(score));
    }
  }, [score, highScore, onRewardXP]);

  const handleSelect = (selected: string) => {
    if (gameOver || feedback) return;

    setTotalAnswered(prev => prev + 1);
    const isCorrect = selected === currentItem.english;

    if (isCorrect) {
      const newStreak = streak + 1;
      const points = 10 + newStreak * 5;
      setScore(prev => prev + points);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount(prev => prev + 1);
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex(prev => prev + 1);
    }, 350);
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(currentItem.german);
      u.lang = 'de-DE';
      window.speechSynthesis.speak(u);
    }
  };

  const restartGame = () => {
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCurrentIndex(0);
    setCorrectCount(0);
    setTotalAnswered(0);
    setGameOver(false);
    setFeedback(null);
  };

  if (gameOver) {
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const summaryStats: GameSummaryStats = {
      gameId: 'word-rush',
      gameTitle: 'Word Rush',
      score,
      highScore: Math.max(score, highScore),
      accuracy,
      itemsCount: totalAnswered,
      correctCount,
      streakCount: maxStreak,
      xpEarned: Math.min(60, Math.floor(score / 15) + 10),
      timeSpentSeconds: GAME_DURATION - timeLeft
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
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl flex flex-col gap-6 max-w-lg mx-auto w-full">
      {/* Top Bar: Timer & Combo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs border border-blue-200 dark:border-blue-800">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-mono font-black text-xs border border-amber-200 dark:border-amber-800">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{score} Pkt</span>
          </div>
        </div>

        {streak > 1 && (
          <div className="flex items-center gap-1 text-xs font-black text-orange-500 animate-bounce">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>Combo x{streak}</span>
          </div>
        )}
      </div>

      {/* Progress Bar for Timer */}
      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft <= 10 ? 'bg-rose-500' : 'bg-indigo-600'
          }`}
          style={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
        />
      </div>

      {/* Center Target Card */}
      <div
        className={`py-10 px-4 rounded-3xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
          feedback === 'correct'
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 scale-105'
            : feedback === 'wrong'
            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 scale-95'
            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 shadow-sm'
        }`}
      >
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
          Was bedeutet dieses Wort?
        </span>

        <div className="flex items-center gap-2">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {currentItem.german}
          </h2>
          <button
            type="button"
            onClick={speak}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 transition-all shadow-sm"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <span className="text-xs font-bold text-slate-400">
          {currentItem.article} • {currentItem.plural}
        </span>
      </div>

      {/* 4 Choices Grid */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={feedback !== null}
            onClick={() => handleSelect(option)}
            className="py-4 px-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 text-slate-800 dark:text-slate-100 font-black text-sm active:scale-95 transition-all shadow-sm flex items-center justify-center text-center capitalize"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
