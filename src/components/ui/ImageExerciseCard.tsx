import React, { useState } from 'react';
import { ImageExercise } from '../../core/types/image-vocab';
import { CheckCircle2, XCircle, Volume2, Sparkles, ArrowRight } from 'lucide-react';

interface ImageExerciseCardProps {
  exercise: ImageExercise;
  onComplete?: (isCorrect: boolean) => void;
  onNext?: () => void;
  className?: string;
}

export const ImageExerciseCard: React.FC<ImageExerciseCardProps> = ({
  exercise,
  onComplete,
  onNext,
  className = ''
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    setSelectedOption(opt);
    const correct = opt === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onComplete?.(correct);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const resetExercise = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    onNext?.();
  };

  return (
    <div className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-5 ${className}`}>
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bild-Vokabel Übung</span>
        </span>
        {isSubmitted && (
          <span className={`text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${
            isCorrect
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
          }`}>
            {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
            <span>{isCorrect ? 'Richtig!' : 'Falsch!'}</span>
          </span>
        )}
      </div>

      {/* Image Illustration Canvas */}
      <div className="w-full h-44 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-slate-800/60 dark:to-slate-900/60 p-4 flex items-center justify-center border border-slate-200/60 dark:border-slate-800 shadow-inner">
        <div
          className="w-32 h-32 drop-shadow-lg transition-transform duration-300 hover:scale-105"
          dangerouslySetInnerHTML={{ __html: exercise.imageSvg }}
        />
      </div>

      {/* Question Text */}
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">
          {exercise.question}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Wähle das richtige Nomen mit bestimmtem Artikel.
        </p>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {exercise.options.map((opt) => {
          const isSelected = selectedOption === opt;
          const isThisCorrect = opt === exercise.correctAnswer;
          
          let btnStyle = 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30';
          
          if (isSubmitted) {
            if (isThisCorrect) {
              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border-emerald-500 ring-2 ring-emerald-500/20';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border-rose-500 ring-2 ring-rose-500/20';
            } else {
              btnStyle = 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60';
            }
          }

          return (
            <button
              key={opt}
              type="button"
              disabled={isSubmitted}
              onClick={() => handleSelect(opt)}
              className={`p-3.5 rounded-2xl border text-sm font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm ${btnStyle}`}
            >
              <span>{opt}</span>
              {isSubmitted && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Post-Answer Detailed Learning Breakdown (Specifically required by prompt) */}
      {isSubmitted && (
        <div className="mt-2 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col gap-2.5">
          <div className="flex items-center justify-between border-b border-emerald-200/60 dark:border-emerald-800/40 pb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-emerald-900 dark:text-emerald-100">
                {exercise.explanation.word}
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                • Plural: {exercise.explanation.plural}
              </span>
            </div>
            <button
              type="button"
              onClick={() => playAudio(`${exercise.explanation.word}. ${exercise.explanation.plural}. ${exercise.explanation.exampleSentence}`)}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm hover:scale-105 active:scale-95 transition-all"
              aria-label="Aussprache anhören"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Beispielsatz im Kontext:
            </span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              "{exercise.explanation.exampleSentence}"
            </p>
          </div>

          <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-600 dark:text-slate-400">
            <span>🇬🇧 {exercise.explanation.english}</span>
            <span>•</span>
            <span>🇫🇷 {exercise.explanation.french}</span>
            <span>•</span>
            <span className="font-arabic">🇸🇦 {exercise.explanation.arabic}</span>
          </div>

          {onNext && (
            <button
              type="button"
              onClick={resetExercise}
              className="self-end mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>Nächste Frage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
