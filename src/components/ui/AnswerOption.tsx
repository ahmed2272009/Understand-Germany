import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AnswerOptionProps {
  text: string;
  selected: boolean;
  state?: 'default' | 'selected' | 'correct' | 'incorrect';
  disabled?: boolean;
  onClick: () => void;
  indexIndicator?: string;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  text,
  selected,
  state = 'default',
  disabled = false,
  onClick,
  indexIndicator
}) => {
  let styleClasses = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-learning hover:bg-learning-light/30';
  let badgeClasses = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';

  if (state === 'selected' || (selected && state === 'default')) {
    styleClasses = 'bg-learning-light/70 dark:bg-learning/20 border-learning text-learning-dark dark:text-learning shadow-sm ring-1 ring-learning/50';
    badgeClasses = 'bg-learning text-white';
  } else if (state === 'correct') {
    styleClasses = 'bg-correct-light dark:bg-correct/20 border-correct text-correct-dark dark:text-correct shadow-sm font-bold';
    badgeClasses = 'bg-correct text-white';
  } else if (state === 'incorrect') {
    styleClasses = 'bg-incorrect-light dark:bg-incorrect/20 border-incorrect text-incorrect-dark dark:text-incorrect shadow-sm font-bold';
    badgeClasses = 'bg-incorrect text-white';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`w-full min-h-[48px] p-3.5 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-learning focus-visible:outline-none ${styleClasses} ${
        disabled ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-3">
        {indexIndicator && (
          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${badgeClasses}`}>
            {indexIndicator}
          </span>
        )}
        <span className="leading-snug">{text}</span>
      </div>
      {state === 'correct' && <CheckCircle2 className="w-5 h-5 text-correct shrink-0" />}
      {state === 'incorrect' && <XCircle className="w-5 h-5 text-incorrect shrink-0" />}
    </button>
  );
};
