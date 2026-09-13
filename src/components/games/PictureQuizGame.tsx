import React, { useState } from 'react';
import { IMAGE_EXERCISES } from '../../content/image-vocab';
import { ImageExerciseCard } from '../ui/ImageExerciseCard';
import { GameSummary } from './GameSummary';
import { GameSummaryStats } from '../../core/types/image-vocab';
import { Image as ImageIcon, Trophy } from 'lucide-react';

interface PictureQuizGameProps {
  onExit: () => void;
  onRewardXP?: (xp: number) => void;
}

export const PictureQuizGame: React.FC<PictureQuizGameProps> = ({ onExit, onRewardXP }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());

  const currentExercise = IMAGE_EXERCISES[currentIndex % IMAGE_EXERCISES.length];
  const totalRounds = Math.min(10, IMAGE_EXERCISES.length);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      const newStreak = streak + 1;
      setScore(s => s + 20 + newStreak * 5);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount(c => c + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalRounds) {
      setGameOver(true);
      const xp = Math.min(50, Math.floor(score / 6) + 10);
      onRewardXP?.(xp);
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setMaxStreak(0);
    setGameOver(false);
  };

  if (gameOver) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = Math.round((correctCount / totalRounds) * 100);

    const summaryStats: GameSummaryStats = {
      gameId: 'picture-quiz',
      gameTitle: 'Picture Quiz',
      score,
      highScore: Math.max(score, Number(localStorage.getItem('dq_hs_picture_quiz') || 0)),
      accuracy,
      itemsCount: totalRounds,
      correctCount,
      streakCount: maxStreak,
      xpEarned: Math.min(50, Math.floor(score / 6) + 10),
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
    <div className="flex flex-col gap-5 max-w-xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4" />
            <span>Bild-Quiz</span>
          </span>
          <span className="text-xs font-bold text-slate-400">
            Frage {currentIndex + 1}/{totalRounds}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
          <Trophy className="w-3.5 h-3.5" />
          <span>{score} Pkt</span>
        </div>
      </div>

      {/* Interactive Image Exercise Card with Post-Correct Detailed Breakdown */}
      <ImageExerciseCard
        key={currentExercise.id}
        exercise={currentExercise}
        onComplete={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
};
