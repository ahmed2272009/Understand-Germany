import React from 'react';
import { Exercise } from '../../core/types/curriculum';
import { CheckCircle2, XCircle } from 'lucide-react';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  userAnswer: string;
  onSelect: (ans: string) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const MultipleChoiceExercise: React.FC<MultipleChoiceExerciseProps> = ({
  exercise,
  userAnswer,
  onSelect,
  isChecked
}) => {
  const options = exercise.options || [];

  return (
    <div className="flex flex-col gap-2.5">
      {options.map((opt, idx) => {
        const isSelected = userAnswer === opt;
        const isTargetCorrect = opt === exercise.correctAnswer;

        let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-learning hover:bg-learning-light/30';
        
        if (isChecked) {
          if (isTargetCorrect) {
            style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 font-bold shadow-sm';
          } else if (isSelected) {
            style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 font-bold shadow-sm';
          } else {
            style = 'border-slate-200 dark:border-slate-800 opacity-50 bg-slate-50 dark:bg-slate-900';
          }
        } else if (isSelected) {
          style = 'border-learning bg-learning-light dark:bg-slate-800 text-learning-dark dark:text-learning font-bold ring-2 ring-learning/20';
        }

        return (
          <button
            key={idx}
            type="button"
            disabled={isChecked}
            onClick={() => onSelect(opt)}
            className={`p-3.5 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-center justify-between gap-3 ${style}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-snug">{opt}</span>
            </div>

            {isChecked && isTargetCorrect && (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            {isChecked && isSelected && !isTargetCorrect && (
              <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
};
