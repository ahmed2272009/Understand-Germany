import React, { useState, useEffect } from 'react';
import { IMAGE_VOCAB_ITEMS } from '../../content/image-vocab';
import { GameSummary } from './GameSummary';
import { GameSummaryStats } from '../../core/types/image-vocab';
import { Volume2, Trophy, Headphones, CheckCircle2 } from 'lucide-react';

interface ListeningMatchGameProps {
  onExit: () => void;
  onRewardXP?: (xp: number) => void;
}

export const ListeningMatchGame: React.FC<ListeningMatchGameProps> = ({ onExit, onRewardXP }) => {
  const TOTAL_ROUNDS = 10;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime] = useState(Date.now());

  const pool = IMAGE_VOCAB_ITEMS;
  const current = pool[currentIdx % pool.length];

  // Auto-play pronunciation when round changes
  useEffect(() => {
    if (!gameOver) {
      speakAudio(1.0);
    }
  }, [currentIdx, gameOver]);

  const speakAudio = (rate = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(true);
      const u = new SpeechSynthesisUtterance(current.german);
      u.lang = 'de-DE';
      u.rate = rate;
      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(u);
    }
  };

  // Generate 4 options (German words with articles)
  const options = React.useMemo(() => {
    const correct = `${current.article} ${current.german}`;
    const others = pool
      .filter(p => p.id !== current.id)
      .map(p => `${p.article} ${p.german}`);
    const distractors = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...distractors, correct].sort(() => 0.5 - Math.random());
  }, [current, pool]);

  const handleSelect = (selected: string) => {
    if (feedback !== null || gameOver) return;

    const correctStr = `${current.article} ${current.german}`;
    const isCorrect = selected === correctStr;

    if (isCorrect) {
      const newStreak = streak + 1;
      setScore(s => s + 20 + newStreak * 5);
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
        const xp = Math.min(50, Math.floor(score / 8) + 10);
        onRewardXP?.(xp);
      } else {
        setCurrentIdx(i => i + 1);
      }
    }, 600);
  };

  const restart = () => {
    setCurrentIdx(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setFeedback(null);
    setGameOver(false);
  };

  if (gameOver) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = Math.round((correctCount / TOTAL_ROUNDS) * 100);

    const summaryStats: GameSummaryStats = {
      gameId: 'listening-match',
      gameTitle: 'Listening Match',
      score,
      highScore: Math.max(score, Number(localStorage.getItem('dq_hs_listening') || 0)),
      accuracy,
      itemsCount: TOTAL_ROUNDS,
      correctCount,
      streakCount: maxStreak,
      xpEarned: Math.min(50, Math.floor(score / 8) + 10),
      timeSpentSeconds: timeSpent
    };

    return (
      <GameSummary
        stats={summaryStats}
        onPlayAgain={restart}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-6 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
          <Headphones className="w-3.5 h-3.5" />
          <span>Listening Match</span>
        </span>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">
            {currentIdx + 1}/{TOTAL_ROUNDS}
          </span>
          <div className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            <Trophy className="w-3.5 h-3.5" />
            <span>{score} Pkt</span>
          </div>
        </div>
      </div>

      {/* Central Audio Speaker Interactive Unit */}
      <div className="py-10 rounded-3xl bg-gradient-to-b from-teal-50 to-teal-100/60 dark:from-teal-950/40 dark:to-slate-900 border border-teal-200 dark:border-teal-800 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
        <div className="relative">
          <button
            type="button"
            onClick={() => speakAudio(1.0)}
            className={`w-20 h-20 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 hover:scale-105 active:scale-95 transition-all ${
              isPlaying ? 'ring-4 ring-teal-400 animate-pulse' : ''
            }`}
          >
            <Volume2 className="w-8 h-8" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => speakAudio(1.0)}
            className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-xs font-bold text-teal-700 dark:text-teal-300 hover:bg-teal-50 shadow-sm"
          >
            Normal (1.0x)
          </button>

          <button
            type="button"
            onClick={() => speakAudio(0.7)}
            className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-800 text-xs font-bold text-teal-700 dark:text-teal-300 hover:bg-teal-50 shadow-sm"
          >
            Langsam (0.7x)
          </button>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Höre genau zu und wähle das passende Wort:
        </span>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isTarget = opt === `${current.article} ${current.german}`;
          let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-teal-500 hover:bg-teal-50/40 text-slate-900 dark:text-slate-100';

          if (feedback === 'correct' && isTarget) {
            btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500';
          } else if (feedback === 'wrong' && !isTarget) {
            btnStyle = 'opacity-50';
          }

          return (
            <button
              key={opt}
              type="button"
              disabled={feedback !== null}
              onClick={() => handleSelect(opt)}
              className={`p-4 rounded-2xl border text-sm md:text-base font-black transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 ${btnStyle}`}
            >
              <span>{opt}</span>
              {feedback === 'correct' && isTarget && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
