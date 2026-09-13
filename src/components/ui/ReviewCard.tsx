import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { AudioButton } from './AudioButton';

interface ReviewCardProps {
  german: string;
  english: string;
  french: string;
  arabicClue?: string;
  gender?: 'der' | 'die' | 'das';
  box: number;
  onRate: (rating: 1 | 2 | 3 | 4) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  german,
  english,
  french,
  arabicClue,
  gender,
  box,
  onRate
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col gap-3.5">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsFlipped(!isFlipped); } }}
        className={`min-h-[220px] p-6 rounded-3xl cursor-pointer border transition-all flex flex-col items-center justify-center text-center shadow-antigravity relative select-none ${
          isFlipped
            ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border-indigo-700'
            : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="absolute top-4 left-4 text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
          Leitner Box {box}/5
        </div>

        <div className="absolute top-4 right-4 text-slate-400 text-xs flex items-center gap-1">
          <RotateCw className="w-3.5 h-3.5" />
          <span className="text-[10px]">{isFlipped ? 'Zurück' : 'Umdrehen'}</span>
        </div>

        {!isFlipped ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black">{german}</span>
              {gender && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md text-white ${
                  gender === 'der' ? 'bg-gender-der' : gender === 'die' ? 'bg-gender-die' : 'bg-gender-das'
                }`}>
                  {gender}
                </span>
              )}
            </div>
            <AudioButton text={german} size="sm" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 animate-in fade-in">
            <span className="text-xl font-black text-indigo-200">{english}</span>
            <span className="text-xs font-semibold text-slate-300">🇫🇷 {french}</span>
            {arabicClue && (
              <span className="text-xs font-bold text-attention mt-1 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                💡 {arabicClue}
              </span>
            )}
          </div>
        )}
      </div>

      {isFlipped && (
        <div className="grid grid-cols-4 gap-2 animate-in slide-in-from-bottom-2">
          <button
            type="button"
            onClick={() => onRate(1)}
            className="py-2.5 rounded-xl bg-incorrect hover:bg-incorrect-dark text-white font-bold text-xs shadow-md transition-transform active:scale-95"
          >
            Nochmal (1d)
          </button>
          <button
            type="button"
            onClick={() => onRate(2)}
            className="py-2.5 rounded-xl bg-attention hover:bg-attention-dark text-slate-900 font-bold text-xs shadow-md transition-transform active:scale-95"
          >
            Schwer (3d)
          </button>
          <button
            type="button"
            onClick={() => onRate(3)}
            className="py-2.5 rounded-xl bg-learning hover:bg-learning-dark text-white font-bold text-xs shadow-md transition-transform active:scale-95"
          >
            Gut (7d)
          </button>
          <button
            type="button"
            onClick={() => onRate(4)}
            className="py-2.5 rounded-xl bg-correct hover:bg-correct-dark text-white font-bold text-xs shadow-md transition-transform active:scale-95"
          >
            Einfach (14d)
          </button>
        </div>
      )}
    </div>
  );
};
