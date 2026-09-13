import React, { useState } from 'react';
import { ALL_DAYS } from '../content/days';
import { VocabItem } from '../core/types/curriculum';
import { Search, Volume2 } from 'lucide-react';

export const VocabBankPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'der' | 'die' | 'das'>('all');

  // Aggregate all vocab items across all 30 days
  const allVocab: (VocabItem & { dayNumber: number })[] = [];
  ALL_DAYS.forEach(d => {
    d.vocabulary.forEach(v => {
      allVocab.push({ ...v, dayNumber: d.dayNumber });
    });
  });

  const filtered = allVocab.filter(v => {
    const matchesSearch =
      v.german.toLowerCase().includes(search.toLowerCase()) ||
      v.english.toLowerCase().includes(search.toLowerCase()) ||
      v.french.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === 'all' || v.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white">
          Wortschatz-Bibliothek
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {allVocab.length} kuratierte Vokabeln mit trilingualen Brücken.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Suche auf Deutsch, Englisch oder Französisch..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Gender Filters */}
      <div className="flex items-center gap-1.5">
        {(['all', 'der', 'die', 'das'] as const).map(g => (
          <button
            key={g}
            onClick={() => setGenderFilter(g)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              genderFilter === g
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {g === 'all' ? 'Alle' : g}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.slice(0, 50).map((v, i) => (
          <div
            key={i}
            className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {v.german}
                </span>
                {v.gender && (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded text-white ${
                    v.gender === 'der' ? 'bg-sky-600' : v.gender === 'die' ? 'bg-rose-500' : 'bg-amber-500'
                  }`}>
                    {v.gender}
                  </span>
                )}
                <span className="text-[10px] text-slate-400 font-mono">Tag {v.dayNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                <span>🇬🇧 {v.english}</span>
                <span>•</span>
                <span>🇫🇷 {v.french}</span>
              </div>
              {v.memoryClue && (
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5 block font-medium">
                  💡 {v.memoryClue}
                </span>
              )}
            </div>

            <button
              onClick={() => speak(v.german)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
