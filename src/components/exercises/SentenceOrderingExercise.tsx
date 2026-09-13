import React from 'react';
import { Exercise } from '../../core/types/curriculum';
import { RotateCcw } from 'lucide-react';

interface SentenceOrderingExerciseProps {
  exercise: Exercise;
  userAnswer: string[]; // array of ordered words
  onChange: (words: string[]) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const SentenceOrderingExercise: React.FC<SentenceOrderingExerciseProps> = ({
  exercise,
  userAnswer = [],
  onChange,
  isChecked,
  isCorrect
}) => {
  // All available words from exercise
  const allWords = exercise.words || exercise.correctAnswer.split(' ').sort(() => 0.5 - Math.random());

  // Count instances of each word in allWords vs userAnswer
  const getRemainingWords = () => {
    const usedCounts: Record<string, number> = {};
    userAnswer.forEach(w => {
      usedCounts[w] = (usedCounts[w] || 0) + 1;
    });

    const remaining: { word: string; originalIndex: number }[] = [];
    allWords.forEach((word, idx) => {
      const used = usedCounts[word] || 0;
      if (used > 0) {
        usedCounts[word] = used - 1;
      } else {
        remaining.push({ word, originalIndex: idx });
      }
    });

    return remaining;
  };

  const handleAddWord = (word: string) => {
    if (isChecked) return;
    onChange([...userAnswer, word]);
  };

  const handleRemoveWord = (index: number) => {
    if (isChecked) return;
    const next = [...userAnswer];
    next.splice(index, 1);
    onChange(next);
  };

  const handleReset = () => {
    if (isChecked) return;
    onChange([]);
  };

  const remainingWords = getRemainingWords();

  return (
    <div className="flex flex-col gap-4">
      {/* Target construction area */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Gebauter Satz:</span>
          {userAnswer.length > 0 && !isChecked && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Zurücksetzen</span>
            </button>
          )}
        </div>

        <div
          className={`min-h-[70px] p-3 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center transition-all ${
            isChecked
              ? isCorrect
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
              : userAnswer.length > 0
                ? 'border-learning/40 bg-learning-light/20 dark:bg-slate-800/40'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'
          }`}
        >
          {userAnswer.length === 0 ? (
            <span className="text-xs text-slate-400 italic px-2">
              Klicke auf die Wörter unten, um den Satz zusammenzustellen...
            </span>
          ) : (
            userAnswer.map((word, idx) => (
              <button
                key={`${word}-${idx}`}
                type="button"
                disabled={isChecked}
                onClick={() => handleRemoveWord(idx)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs md:text-sm border shadow-sm transition-all flex items-center gap-1.5 ${
                  isChecked
                    ? isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-mono">#{idx + 1}</span>
                <span>{word}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available words tray */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Wortbausteine:
        </span>
        <div className="flex flex-wrap gap-2 min-h-[44px]">
          {remainingWords.map(({ word, originalIndex }) => (
            <button
              key={`rem-${word}-${originalIndex}`}
              type="button"
              disabled={isChecked}
              onClick={() => handleAddWord(word)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-learning-light hover:text-learning hover:border-learning border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs md:text-sm font-bold shadow-sm transition-all active:scale-95"
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
