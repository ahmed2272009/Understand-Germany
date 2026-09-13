import React, { useState } from 'react';
import { Exercise } from '../../core/types/curriculum';
import { MatchingPair } from '../../core/types/learning';
import { Check, Link as LinkIcon } from 'lucide-react';

interface MatchingExerciseProps {
  exercise: Exercise;
  userAnswer: Record<string, string>; // left -> right
  onChange: (pairs: Record<string, string>) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const MatchingExercise: React.FC<MatchingExerciseProps> = ({
  exercise,
  userAnswer = {},
  onChange,
  isChecked
}) => {
  const pairs: MatchingPair[] = exercise.pairs || [
    { id: 'p1', left: 'Guten Morgen', right: 'Good morning' },
    { id: 'p2', left: 'Danke', right: 'Thank you' },
    { id: 'p3', left: 'Bitte', right: 'Please' },
    { id: 'p4', left: 'Auf Wiedersehen', right: 'Goodbye' }
  ];

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const leftItems = pairs.map(p => p.left);
  // Keep right items in fixed order or deterministic shuffle
  const rightItems = pairs.map(p => p.right);

  const handleSelectLeft = (left: string) => {
    if (isChecked) return;
    if (selectedLeft === left) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(left);
    }
  };

  const handleSelectRight = (right: string) => {
    if (isChecked || !selectedLeft) return;

    // Check if right item was already paired with something else
    const updated = { ...userAnswer };
    Object.keys(updated).forEach(k => {
      if (updated[k] === right) {
        delete updated[k];
      }
    });

    updated[selectedLeft] = right;
    onChange(updated);
    setSelectedLeft(null);
  };

  const handleUnpair = (left: string) => {
    if (isChecked) return;
    const updated = { ...userAnswer };
    delete updated[left];
    onChange(updated);
  };

  // Color generator for connected pairs
  const pairColors = [
    'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
  ];

  const getPairIndex = (left: string): number => {
    const keys = Object.keys(userAnswer);
    return keys.indexOf(left);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        Wähle links einen Begriff und verbinde ihn rechts:
      </span>

      <div className="grid grid-cols-2 gap-3">
        {/* Left Column */}
        <div className="flex flex-col gap-2">
          {leftItems.map((left, idx) => {
            const isSelected = selectedLeft === left;
            const pairedRight = userAnswer[left];
            const pairIdx = getPairIndex(left);
            const colorClass = pairIdx >= 0 ? pairColors[pairIdx % pairColors.length] : '';

            return (
              <button
                key={idx}
                type="button"
                disabled={isChecked}
                onClick={() => (pairedRight ? handleUnpair(left) : handleSelectLeft(left))}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-learning ring-2 ring-learning bg-learning-light/40 text-learning-dark'
                    : pairedRight
                      ? `${colorClass} shadow-sm`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-800 dark:text-slate-100'
                }`}
              >
                <span>{left}</span>
                {pairedRight && <LinkIcon className="w-3.5 h-3.5 opacity-60" />}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2">
          {rightItems.map((right, idx) => {
            // Find which left is paired with this right
            const pairedLeft = Object.keys(userAnswer).find(k => userAnswer[k] === right);
            const pairIdx = pairedLeft ? getPairIndex(pairedLeft) : -1;
            const colorClass = pairIdx >= 0 ? pairColors[pairIdx % pairColors.length] : '';

            return (
              <button
                key={idx}
                type="button"
                disabled={isChecked}
                onClick={() => handleSelectRight(right)}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                  pairedLeft
                    ? `${colorClass} shadow-sm`
                    : selectedLeft
                      ? 'bg-learning-light/20 dark:bg-slate-800 border-learning/40 text-slate-700 dark:text-slate-200 hover:border-learning hover:bg-learning-light'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                }`}
              >
                <span>{right}</span>
                {pairedLeft && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
