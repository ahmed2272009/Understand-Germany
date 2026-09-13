import React from 'react';
import { Exercise } from '../../core/types/curriculum';

interface ArticleSelectExerciseProps {
  exercise: Exercise;
  userAnswer: string;
  onSelect: (article: 'der' | 'die' | 'das') => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const ArticleSelectExercise: React.FC<ArticleSelectExerciseProps> = ({
  exercise,
  userAnswer,
  onSelect,
  isChecked
}) => {
  const articles: Array<{ id: 'der' | 'die' | 'das'; label: string; gender: string; color: string; activeClass: string }> = [
    {
      id: 'der',
      label: 'der',
      gender: 'Maskulin',
      color: 'blue',
      activeClass: 'bg-blue-600 border-blue-600 text-white shadow-blue-500/30'
    },
    {
      id: 'die',
      label: 'die',
      gender: 'Feminin',
      color: 'rose',
      activeClass: 'bg-rose-600 border-rose-600 text-white shadow-rose-500/30'
    },
    {
      id: 'das',
      label: 'das',
      gender: 'Neutral',
      color: 'emerald',
      activeClass: 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-500/30'
    }
  ];

  return (
    <div className="flex flex-col gap-6 items-center py-2">
      {/* Target Noun Banner */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
          Wähle den passenden Artikel
        </span>
        <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 min-w-[200px]">
          {userAnswer ? (
            <span className="text-learning mr-2 underline decoration-learning/40">
              {userAnswer}
            </span>
          ) : (
            <span className="text-slate-300 dark:text-slate-600 mr-2">___</span>
          )}
          <span>{exercise.question}</span>
        </div>
      </div>

      {/* 3 Article Cards */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-md">
        {articles.map(art => {
          const isSelected = userAnswer.toLowerCase() === art.id;
          const isTargetCorrect = exercise.correctAnswer.toLowerCase() === art.id;

          let btnClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-slate-400';

          if (isChecked) {
            if (isTargetCorrect) {
              btnClass = 'bg-emerald-600 border-emerald-600 text-white shadow-md ring-2 ring-emerald-400';
            } else if (isSelected) {
              btnClass = 'bg-rose-600 border-rose-600 text-white shadow-md ring-2 ring-rose-400';
            } else {
              btnClass = 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800';
            }
          } else if (isSelected) {
            btnClass = `${art.activeClass} shadow-lg scale-102 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900`;
          }

          return (
            <button
              key={art.id}
              type="button"
              disabled={isChecked}
              onClick={() => onSelect(art.id)}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${btnClass}`}
            >
              <span className="text-xl md:text-2xl font-black tracking-tight font-serif lowercase">
                {art.label}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                {art.gender}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
