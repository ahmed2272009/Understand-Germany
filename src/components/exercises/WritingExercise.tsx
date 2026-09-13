import React from 'react';
import { Exercise } from '../../core/types/curriculum';
import { Check, Edit3, KeyRound } from 'lucide-react';
import { normalizeGermanText } from '../../core/engines/learning-engine';

interface WritingExerciseProps {
  exercise: Exercise;
  userAnswer: string;
  onChange: (val: string) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const WritingExercise: React.FC<WritingExerciseProps> = ({
  exercise,
  userAnswer,
  onChange,
  isChecked
}) => {
  const minWords = exercise.minWords || 3;
  const requiredKeywords = exercise.requiredKeywords || [];

  const words = userAnswer.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const normUser = normalizeGermanText(userAnswer);

  const insertChar = (char: string) => {
    if (isChecked) return;
    onChange((userAnswer || '') + char);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Criteria Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
          wordCount >= minWords
            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
        }`}>
          <Edit3 className="w-3.5 h-3.5" />
          <span>Mindestens {minWords} Wörter ({wordCount}/{minWords})</span>
        </span>

        {requiredKeywords.map((kw, i) => {
          const isPresent = normUser.includes(normalizeGermanText(kw));
          return (
            <span
              key={i}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                isPresent
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>"{kw}" {isPresent && <Check className="w-3 h-3 inline" />}</span>
            </span>
          );
        })}
      </div>

      {/* Writing Textarea */}
      <div className="flex flex-col gap-2">
        <textarea
          rows={3}
          disabled={isChecked}
          value={userAnswer}
          onChange={e => onChange(e.target.value)}
          placeholder="Schreibe deinen deutschen Satz hier..."
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm leading-relaxed font-medium focus:outline-none focus:border-learning focus:ring-2 focus:ring-learning/20 resize-none shadow-sm"
        />

        {/* Umlaut Bar */}
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

      {/* Model Solution if checked */}
      {isChecked && exercise.sampleSolution && (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
          <span className="font-bold text-slate-500 block mb-1">Musterlösung:</span>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{exercise.sampleSolution}</p>
        </div>
      )}
    </div>
  );
};
