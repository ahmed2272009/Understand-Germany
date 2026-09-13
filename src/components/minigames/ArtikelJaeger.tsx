import React, { useState } from 'react';
import { Trophy, Zap } from 'lucide-react';

const NOUN_POOL = [
  { word: 'Tisch', article: 'der', clue: 'table' },
  { word: 'Buch', article: 'das', clue: 'book' },
  { word: 'Schule', article: 'die', clue: 'school' },
  { word: 'Handy', article: 'das', clue: 'phone' },
  { word: 'Vater', article: 'der', clue: 'father' },
  { word: 'Mutter', article: 'die', clue: 'mother' },
  { word: 'Kind', article: 'das', clue: 'child' },
  { word: 'Hund', article: 'der', clue: 'dog' },
  { word: 'Katze', article: 'die', clue: 'cat' },
  { word: 'Wasser', article: 'das', clue: 'water' },
  { word: 'Computer', article: 'der', clue: 'computer' },
  { word: 'Sprache', article: 'die', clue: 'language' }
];

export const ArtikelJaeger: React.FC = () => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const current = NOUN_POOL[currentIdx % NOUN_POOL.length];

  const handleSelect = (art: 'der' | 'die' | 'das') => {
    if (art === current.article) {
      setScore(s => s + 10 * (streak + 1));
      setStreak(st => st + 1);
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIdx(i => i + 1);
    }, 450);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-4">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-black text-amber-500">
          <Trophy className="w-4 h-4" />
          <span>{score} Pkt</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-black text-orange-500">
          <Zap className="w-4 h-4 fill-orange-500" />
          <span>Combo x{streak + 1}</span>
        </div>
      </div>

      {/* Target Word Card */}
      <div className={`py-10 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
        feedback === 'correct'
          ? 'bg-emerald-50 border-emerald-500 scale-105'
          : feedback === 'wrong'
          ? 'bg-rose-50 border-rose-500 scale-95'
          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
      }`}>
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
          Welcher Artikel?
        </span>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {current.word}
        </h3>
        <span className="text-xs text-slate-500 mt-1">({current.clue})</span>
      </div>

      {/* 3 Buttons: der, die, das */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={() => handleSelect('der')}
          className="py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-base shadow-md active:scale-95 transition-all"
        >
          der
        </button>
        <button
          onClick={() => handleSelect('die')}
          className="py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-base shadow-md active:scale-95 transition-all"
        >
          die
        </button>
        <button
          onClick={() => handleSelect('das')}
          className="py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-md active:scale-95 transition-all"
        >
          das
        </button>
      </div>
    </div>
  );
};
