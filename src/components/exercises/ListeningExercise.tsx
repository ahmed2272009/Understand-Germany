import React, { useState } from 'react';
import { Exercise } from '../../core/types/curriculum';
import { Volume2, Play, Gauge } from 'lucide-react';

interface ListeningExerciseProps {
  exercise: Exercise;
  userAnswer: string;
  onChange: (val: string) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const ListeningExercise: React.FC<ListeningExerciseProps> = ({
  exercise,
  userAnswer,
  onChange,
  isChecked
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.75 | 1.0>(1.0);

  const audioText = exercise.audioText || exercise.correctAnswer;
  const options = exercise.options;

  const playAudio = (customSpeed?: number) => {
    if ('speechSynthesis' in window && audioText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(audioText);
      utterance.lang = 'de-DE';
      utterance.rate = customSpeed !== undefined ? customSpeed : speed;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 0.75 : 1.0;
    setSpeed(nextSpeed);
    playAudio(nextSpeed);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Audio Player Card */}
      <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 w-full max-w-sm">
        <button
          type="button"
          onClick={() => playAudio()}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
            isPlaying
              ? 'bg-learning text-white ring-4 ring-learning/30 animate-pulse'
              : 'bg-gradient-to-tr from-learning to-teal-600 text-white hover:shadow-learning/40'
          }`}
          title="Audio abspielen"
        >
          {isPlaying ? <Volume2 className="w-9 h-9" /> : <Play className="w-9 h-9 ml-1" />}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {isPlaying ? 'Wird abgespielt...' : 'Klicke zum Anhören'}
          </span>
          <button
            type="button"
            onClick={toggleSpeed}
            className="flex items-center gap-1 text-[11px] font-black uppercase px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
            title="Geschwindigkeit umschalten"
          >
            <Gauge className="w-3 h-3" />
            <span>{speed}x</span>
          </button>
        </div>
      </div>

      {/* Answer selection or input */}
      <div className="w-full">
        {options && options.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Was hast du gehört?
            </span>
            {options.map((opt, i) => {
              const isSelected = userAnswer === opt;
              const isTargetCorrect = opt === exercise.correctAnswer;

              let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-learning';
              if (isChecked) {
                if (isTargetCorrect) style = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                else if (isSelected) style = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                else style = 'border-slate-200 dark:border-slate-800 opacity-40';
              } else if (isSelected) {
                style = 'border-learning bg-learning-light dark:bg-slate-800 text-learning-dark dark:text-learning font-bold ring-2 ring-learning/20';
              }

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isChecked}
                  onClick={() => onChange(opt)}
                  className={`p-3.5 rounded-2xl border text-sm text-left transition-all ${style}`}
                >
                  {opt}
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
              placeholder="Tippe hier, was du auf Deutsch gehört hast..."
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:border-learning focus:ring-2 focus:ring-learning/20"
            />
          </div>
        )}
      </div>
    </div>
  );
};
