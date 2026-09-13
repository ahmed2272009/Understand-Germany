import React from 'react';
import { AudioButton } from './AudioButton';

interface VocabularyCardProps {
  german: string;
  english: string;
  french: string;
  arabicClue?: string;
  gender?: 'der' | 'die' | 'das';
  memoryClue?: string;
  exampleSentence?: string;
  className?: string;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  german,
  english,
  french,
  arabicClue,
  gender,
  memoryClue,
  exampleSentence,
  className = ''
}) => {
  const genderColors = {
    der: 'bg-gender-der text-white border-gender-der',
    die: 'bg-gender-die text-white border-gender-die',
    das: 'bg-gender-das text-white border-gender-das'
  };

  return (
    <div className={`p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-antigravity flex flex-col gap-2.5 transition-all hover:border-learning/40 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              {german}
            </h3>
            {gender && (
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider ${genderColors[gender]}`}>
                {gender}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>🇬🇧 {english}</span>
            <span>•</span>
            <span>🇫🇷 {french}</span>
          </div>
        </div>

        <AudioButton text={german} size="sm" />
      </div>

      {arabicClue && (
        <div className="bg-amber-50 dark:bg-amber-950/30 p-2 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between border border-amber-200/50">
          <span className="text-[10px] font-bold uppercase text-amber-600">Arabische Lernbrücke:</span>
          <span className="font-bold text-sm">{arabicClue}</span>
        </div>
      )}

      {memoryClue && (
        <div className="text-xs text-learning font-medium bg-learning-light/50 dark:bg-slate-800 p-2 rounded-xl">
          💡 <span className="font-semibold">{memoryClue}</span>
        </div>
      )}

      {exampleSentence && (
        <div className="text-xs text-slate-600 dark:text-slate-300 italic pt-1 border-t border-slate-100 dark:border-slate-800">
          „{exampleSentence}“
        </div>
      )}
    </div>
  );
};
