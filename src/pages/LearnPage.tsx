import React, { useState } from 'react';
import { ALL_DAYS } from '../content/days';
import { DayLesson } from '../core/types/curriculum';
import { LessonCard } from '../components/ui/LessonCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useProgress } from '../context/ProgressContext';
import { Search, Compass } from 'lucide-react';

interface LearnPageProps {
  onSelectLesson: (lesson: DayLesson) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ onSelectLesson }) => {
  const { progress, completions } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');

  const highestUnlocked = progress?.highestUnlockedDay || 1;
  const completedCount = Object.keys(completions).length;

  const phases = [
    { id: 1, title: 'Phase 1: Das Fundament (Tag 1–7)', range: [1, 7], desc: 'Alphabet, Pronomen, V2-Stellung und Akkusativ' },
    { id: 2, title: 'Phase 2: Alltag & Bewegung (Tag 8–15)', range: [8, 15], desc: 'Dativ, Modalverben, Uhrzeit und Trennbare Verben' },
    { id: 3, title: 'Phase 3: Vergangenheit & Satzbau (Tag 16–22)', range: [16, 22], desc: 'Perfekt (haben/sein), Weil-Nebensätze und Präteritum' },
    { id: 4, title: 'Phase 4: Meisterschaft (Tag 23–30)', range: [23, 30], desc: 'Adjektivendungen, Konjunktiv II, Passiv und 20-Zeilen Text' },
  ];

  const filteredDays = ALL_DAYS.filter(day => {
    const matchesSearch = day.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          day.goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          `tag ${day.dayNumber}`.includes(searchQuery.toLowerCase());
    const matchesPhase = selectedPhase === 'all' || day.phase === selectedPhase;
    return matchesSearch && matchesPhase;
  });

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-4 md:p-6 pb-24">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-learning mb-1">
            <Compass className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              30-Tage Lehrplan
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Dein Weg zum A1/A2 Zertifikat
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {completedCount} von 30 Lektionen gemeistert
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full md:w-64 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Gesamtfortschritt</span>
            <span className="font-black text-learning">{Math.round((completedCount / 30) * 100)}%</span>
          </div>
          <ProgressBar
            value={completedCount}
            max={30}
            color="learning"
            size="md"
          />
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Lektion oder Grammatikthema suchen..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-learning"
          />
        </div>

        {/* Phase Pill Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedPhase('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPhase === 'all'
                ? 'bg-learning text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Alle (30)
          </button>
          {[1, 2, 3, 4].map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setSelectedPhase(p)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPhase === p
                  ? 'bg-learning text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Phase {p}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped by Phase or Filtered List */}
      <div className="flex flex-col gap-8">
        {selectedPhase === 'all' && !searchQuery ? (
          phases.map(phase => {
            const phaseDays = ALL_DAYS.filter(d => d.phase === phase.id);
            return (
              <div key={phase.id} className="flex flex-col gap-3">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h2 className="text-base font-black text-slate-900 dark:text-white">
                    {phase.title}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {phase.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phaseDays.map(day => {
                    const isCompleted = !!completions[day.dayId];
                    const isCurrent = day.dayNumber === highestUnlocked;
                    const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

                    return (
                      <LessonCard
                        key={day.dayId}
                        dayNumber={day.dayNumber}
                        title={day.title}
                        goal={day.goal}
                        phaseTitle={day.phaseTitle}
                        status={status}
                        score={completions[day.dayId]?.scorePercentage}
                        onClick={() => onSelectLesson(day)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredDays.map(day => {
              const isCompleted = !!completions[day.dayId];
              const isCurrent = day.dayNumber === highestUnlocked;
              const status = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

              return (
                <LessonCard
                  key={day.dayId}
                  dayNumber={day.dayNumber}
                  title={day.title}
                  goal={day.goal}
                  phaseTitle={day.phaseTitle}
                  status={status}
                  score={completions[day.dayId]?.scorePercentage}
                  onClick={() => onSelectLesson(day)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
