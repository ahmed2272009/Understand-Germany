import React from 'react';
import { AlertCircle, Check, Lightbulb, Volume2 } from 'lucide-react';

interface ImmediateExplanationCardProps {
  isCorrect: boolean;
  userAnswerDisplay?: string;
  correctAnswerDisplay: string;
  explanation: string;
  germanAudioText?: string;
  onAcknowledge?: () => void;
  className?: string;
}

export const ImmediateExplanationCard: React.FC<ImmediateExplanationCardProps> = ({
  isCorrect,
  userAnswerDisplay,
  correctAnswerDisplay,
  explanation,
  germanAudioText,
  onAcknowledge,
  className = ''
}) => {
  const playAudio = () => {
    const textToSpeak = germanAudioText || correctAnswerDisplay;
    if ('speechSynthesis' in window && textToSpeak) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (isCorrect) {
    return (
      <div className={`p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">
              <Check className="w-4 h-4 stroke-[3]" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Richtig gelöst!
            </span>
          </div>
          {germanAudioText && (
            <button
              type="button"
              onClick={playAudio}
              className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-300 transition-colors"
              title="Aussprache anhören"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {explanation && (
          <p className="text-xs text-emerald-800/90 dark:text-emerald-200/90 leading-relaxed pl-8">
            {explanation}
          </p>
        )}
      </div>
    );
  }

  // INCORRECT ANSWER: Highlighted immediate explanation
  return (
    <div className={`p-4.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border-2 border-rose-300 dark:border-rose-800/80 text-rose-950 dark:text-rose-100 flex flex-col gap-3 shadow-md animate-in fade-in zoom-in-95 duration-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shadow-sm">
            <AlertCircle className="w-4 h-4 stroke-[2.5]" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
            Nicht ganz richtig — Erklärung & Lösung
          </span>
        </div>
        <button
          type="button"
          onClick={playAudio}
          className="p-1.5 rounded-xl bg-rose-100 dark:bg-rose-900/60 hover:bg-rose-200 text-rose-700 dark:text-rose-300 transition-colors flex items-center gap-1 text-[11px] font-bold"
          title="Richtige Aussprache anhören"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Anhören</span>
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {userAnswerDisplay && (
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-rose-200 dark:border-rose-900/60">
            <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">
              Deine Eingabe:
            </span>
            <span className="line-through text-rose-600 dark:text-rose-400 font-medium">
              {userAnswerDisplay}
            </span>
          </div>
        )}
        <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border-2 border-emerald-400 dark:border-emerald-700 shadow-sm">
          <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 block mb-0.5">
            Richtige Lösung:
          </span>
          <span className="text-emerald-700 dark:text-emerald-300 font-black text-sm">
            {correctAnswerDisplay}
          </span>
        </div>
      </div>

      {/* Immediate Educational Explanation */}
      <div className="p-3 rounded-xl bg-rose-100/70 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5 leading-relaxed">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-black block text-rose-950 dark:text-rose-100 mb-0.5">
            Warum ist das so?
          </span>
          <span>{explanation}</span>
        </div>
      </div>

      {onAcknowledge && (
        <button
          type="button"
          onClick={onAcknowledge}
          className="self-end px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-sm transition-all active:scale-98"
        >
          Verstanden, weiter
        </button>
      )}
    </div>
  );
};
