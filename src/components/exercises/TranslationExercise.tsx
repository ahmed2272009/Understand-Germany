import React from 'react';
import { Exercise } from '../../core/types/curriculum';
import { Volume2, ArrowRightLeft } from 'lucide-react';

interface TranslationExerciseProps {
  exercise: Exercise;
  userAnswer: string;
  onChange: (val: string) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const TranslationExercise: React.FC<TranslationExerciseProps> = ({
  exercise,
  userAnswer,
  onChange,
  isChecked,
  isCorrect
}) => {
  const isGermanSource = exercise.sourceLang === 'de' || !exercise.sourceLang;

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = isGermanSource ? exercise.question : String(exercise.correctAnswer);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const insertChar = (char: string) => {
    if (isChecked) return;
    onChange((userAnswer || '') + char);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Source Prompt Card */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {exercise.sourceLang === 'en' ? '🇬🇧 Englisch' : exercise.sourceLang === 'fr' ? '🇫🇷 Französisch' : '🇩🇪 Deutsch'}
            </span>
            <ArrowRightLeft className="w-3 h-3 text-slate-400" />
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-learning-light dark:bg-slate-700 text-learning dark:text-learning-light">
              {exercise.targetLang === 'en' ? '🇬🇧 Englisch' : exercise.targetLang === 'fr' ? '🇫🇷 Französisch' : '🇩🇪 Deutsch'}
            </span>
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
            {exercise.question}
          </p>
        </div>

        {isGermanSource && (
          <button
            type="button"
            onClick={playAudio}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-learning transition-colors shadow-sm shrink-0"
            title="Audio anhören"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Target Translation Input */}
      <div className="flex flex-col gap-2">
        <textarea
          rows={2}
          disabled={isChecked}
          value={userAnswer}
          onChange={e => onChange(e.target.value)}
          placeholder="Tippe hier deine Übersetzung ein..."
          className={`w-full p-3.5 rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 resize-none ${
            isChecked
              ? isCorrect
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-emerald-300'
                : 'border-rose-500 bg-rose-50 text-rose-900 ring-rose-300'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-learning focus:ring-learning/20'
          }`}
        />

        {/* Umlaut helper */}
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
    </div>
  );
};
