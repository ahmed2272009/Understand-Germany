import React from 'react';
import { Exercise } from '../../core/types/curriculum';

interface FillInBlankExerciseProps {
  exercise: Exercise;
  userAnswer: string;
  onChange: (val: string) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const FillInBlankExercise: React.FC<FillInBlankExerciseProps> = ({
  exercise,
  userAnswer,
  onChange,
  isChecked,
  isCorrect
}) => {
  const insertChar = (char: string) => {
    if (isChecked) return;
    onChange((userAnswer || '') + char);
  };

  const options = exercise.options;

  return (
    <div className="flex flex-col gap-4">
      {/* Question context with blank indicator */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/70 text-slate-800 dark:text-slate-100 text-sm font-medium leading-relaxed">
        {exercise.question.includes('___') ? (
          exercise.question.split('___').map((segment, idx, arr) => (
            <React.Fragment key={idx}>
              <span>{segment}</span>
              {idx < arr.length - 1 && (
                <span className="inline-block px-2.5 py-0.5 mx-1.5 rounded-lg border-b-2 border-learning font-mono font-bold bg-learning-light/40 text-learning-dark dark:text-learning min-w-[60px] text-center">
                  {userAnswer || '______'}
                </span>
              )}
            </React.Fragment>
          ))
        ) : (
          <p>{exercise.question}</p>
        )}
      </div>

      {/* Input or Word Bank */}
      {options && options.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <span className="w-full text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
            Wähle das passende Wort:
          </span>
          {options.map((word, i) => {
            const isSelected = userAnswer === word;
            return (
              <button
                key={i}
                type="button"
                disabled={isChecked}
                onClick={() => onChange(word)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all ${
                  isSelected
                    ? 'bg-learning text-white border-learning shadow-sm ring-2 ring-learning/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-learning'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            disabled={isChecked}
            value={userAnswer}
            onChange={e => onChange(e.target.value)}
            placeholder="Fehlendes Wort hier eingeben..."
            className={`w-full p-3.5 rounded-2xl border text-sm font-semibold transition-all focus:outline-none focus:ring-2 ${
              isChecked
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-emerald-300'
                  : 'border-rose-500 bg-rose-50 text-rose-900 ring-rose-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-learning focus:ring-learning/20'
            }`}
          />

          {/* German Umlauts bar */}
          {!isChecked && (
            <div className="flex items-center gap-1.5 self-end">
              <span className="text-[10px] text-slate-400 font-bold mr-1">Umlaute:</span>
              {['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(char => (
                <button
                  key={char}
                  type="button"
                  onClick={() => insertChar(char)}
                  className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all active:scale-95"
                >
                  {char}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
