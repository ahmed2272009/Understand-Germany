import React, { useState, useEffect, useCallback } from 'react';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { ItemMasteryRecord, MASTERY_LEVEL_CONFIG, MasteryLevel } from '../core/types/learning';
import { MasteryEngine } from '../core/engines/mastery-engine';
import { ImmediateExplanationCard } from '../components/exercises/ImmediateExplanationCard';
import { 
  RotateCw, 
  CheckCircle2, 
  Layers, 
  AlertOctagon, 
  Volume2, 
  Flame,
  Clock
} from 'lucide-react';

export const ReviewPage: React.FC = () => {
  const { masteryRecords, updateMasteryItem } = useProgress();
  const { user } = useAuth();

  const [queue, setQueue] = useState<ItemMasteryRecord[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showImmediateExplanation, setShowImmediateExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Build spaced review queue prioritizing repeated errors
  const initializeReviewSession = useCallback(() => {
    setLoading(true);
    const recordsList = Object.values(masteryRecords);

    // Prioritize items user repeatedly gets wrong
    const scheduled = MasteryEngine.scheduleSpacedReviews(recordsList, {
      maxItems: 25,
      includeNonDueIfEmpty: true
    });

    setQueue(scheduled.map(s => s.record));
    setCurrentIdx(0);
    setIsRevealed(false);
    setShowImmediateExplanation(false);
    setLoading(false);
  }, [masteryRecords]);

  useEffect(() => {
    initializeReviewSession();
  }, [initializeReviewSession]);

  const currentItem = queue[currentIdx];
  const stats = MasteryEngine.getMasteryStats(Object.values(masteryRecords));

  const playGermanAudio = (text: string) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTrial = async (isCorrect: boolean) => {
    if (!user || !currentItem) return;

    // Update mastery metrics through MasteryEngine
    const updated = MasteryEngine.updateMastery(currentItem, isCorrect);
    await updateMasteryItem(updated);

    if (!isCorrect) {
      // Show immediate explanation on incorrect answer
      setShowImmediateExplanation(true);
    } else {
      // Advance to next card
      advanceToNext();
    }
  };

  const advanceToNext = () => {
    setShowImmediateExplanation(false);
    setIsRevealed(false);

    if (currentIdx + 1 < queue.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQueue([]); // Session completed!
    }
  };

  const levels: MasteryLevel[] = [0, 1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4 md:p-6 pb-24">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-learning mb-1">
          <RotateCw className="w-5 h-5 animate-spin-slow" />
          <span className="text-xs font-black uppercase tracking-wider">
            Intelligenter Spaced-Repetition-Scheduler
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          6-Stufen Mastery Review
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Priorisiert gezielt Vokabeln und Regeln, die du wiederholt falsch machst.
        </p>
      </div>

      {/* Mastery Levels Distribution Grid (Levels 0 to 5) */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-learning" />
            <span>Mastery-Status (Stufen 0–5)</span>
          </span>
          <div className="flex items-center gap-2">
            {stats.troubleItemsCount > 0 && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                <AlertOctagon className="w-3 h-3" />
                <span>{stats.troubleItemsCount} Problemfälle</span>
              </span>
            )}
            <span className="text-xs font-bold text-slate-400">
              {stats.total} Elemente gesamt
            </span>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1.5 md:gap-2">
          {levels.map(lvl => {
            const meta = MASTERY_LEVEL_CONFIG[lvl];
            const count = stats.distribution[lvl] || 0;

            return (
              <div
                key={lvl}
                className="p-2 md:p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center flex flex-col items-center justify-between"
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs">{meta.badge}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400 hidden sm:inline">
                    L{lvl}
                  </span>
                </div>
                <span className="text-sm md:text-base font-black text-slate-900 dark:text-white my-0.5">
                  {count}
                </span>
                <span className="text-[9px] text-slate-400 font-medium truncate w-full">
                  {meta.germanName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Queue Area */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">
          Bereite Spaced-Review-Session vor...
        </div>
      ) : currentItem ? (
        <div className="flex flex-col gap-4">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500">
                Wiederholung {currentIdx + 1} von {queue.length}
              </span>
              {currentItem.errorStreak > 1 && (
                <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold text-[10px] flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-500" />
                  <span>{currentItem.errorStreak}x in Folge falsch (Priorität!)</span>
                </span>
              )}
            </div>
            <span className="font-black text-learning">
              {Math.round((currentIdx / queue.length) * 100)}%
            </span>
          </div>

          <ProgressBar
            value={currentIdx}
            max={queue.length}
            color="learning"
            size="sm"
          />

          {/* Interactive Flashcard / Testing Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center text-center gap-5 relative overflow-hidden">
            {/* Mastery Level Badge & Interval Tag */}
            <div className="flex items-center justify-between w-full text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                <span>{MASTERY_LEVEL_CONFIG[currentItem.mastery].badge}</span>
                <span>Stufe {currentItem.mastery}: {MASTERY_LEVEL_CONFIG[currentItem.mastery].germanName}</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Intervall: {currentItem.interval} Tage</span>
              </div>
            </div>

            {/* Prompt Content */}
            <div className="my-3 flex flex-col items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                {currentItem.itemType === 'vocabulary' ? 'Deutsches Wort' : 'Übungs-Aufgabe'}
              </span>

              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {currentItem.gender && (
                    <span className={`mr-2 font-serif text-xl md:text-2xl ${
                      currentItem.gender === 'der' ? 'text-blue-500' : currentItem.gender === 'die' ? 'text-rose-500' : 'text-emerald-500'
                    }`}>
                      {currentItem.gender}
                    </span>
                  )}
                  {currentItem.german}
                </h2>

                <button
                  type="button"
                  onClick={() => playGermanAudio(currentItem.german)}
                  className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-learning hover:bg-learning-light transition-colors shadow-sm"
                  title="Aussprache anhören"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Statistics regarding errors */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                <span>Richtig: <strong className="text-emerald-500">{currentItem.correctAnswers}</strong></span>
                <span>•</span>
                <span>Falsch: <strong className="text-rose-500">{currentItem.incorrectAnswers}</strong></span>
              </div>
            </div>

            {/* Flipped Content / Solution */}
            {isRevealed ? (
              <div className="w-full flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Bedeutung / Übersetzung
                  </span>
                  <p className="text-xl font-bold text-learning">
                    {currentItem.translation}
                  </p>
                </div>

                {currentItem.explanation && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 max-w-md text-left">
                    <span className="font-bold block text-slate-900 dark:text-white mb-0.5">
                      Merk-Tipp / Grammatik:
                    </span>
                    {currentItem.explanation}
                  </div>
                )}

                {/* Rating Buttons */}
                {!showImmediateExplanation && (
                  <div className="flex items-center gap-3 w-full max-w-sm mt-2">
                    <button
                      type="button"
                      onClick={() => handleTrial(false)}
                      className="flex-1 py-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold text-xs shadow-sm transition-all active:scale-95"
                    >
                      Nicht gewusst (Stufe sinkt)
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTrial(true)}
                      className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                    >
                      Gewusst (+1 Stufe)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsRevealed(true)}
                className="w-full max-w-xs py-3.5 rounded-2xl bg-learning hover:bg-learning-dark text-white font-bold text-xs md:text-sm shadow-md transition-all active:scale-98"
              >
                Lösung aufdecken
              </button>
            )}

            {/* Immediate Explanation Card on Incorrect Evaluation */}
            {showImmediateExplanation && (
              <div className="w-full text-left mt-2">
                <ImmediateExplanationCard
                  isCorrect={false}
                  correctAnswerDisplay={`${currentItem.gender ? currentItem.gender + ' ' : ''}${currentItem.german} = ${currentItem.translation}`}
                  explanation={currentItem.explanation || 'Dieses Element wurde wegen des Fehlers im Wiederholungs-Intervall zurückgesetzt und wird bald erneut abgefragt.'}
                  germanAudioText={currentItem.german}
                  onAcknowledge={advanceToNext}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Review Queue Cleared Celebration */
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center gap-4 shadow-xl animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center text-3xl shadow-sm border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
              Wiederholungseinheit gemeistert!
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Alles erfolgreich wiederholt
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1">
              Dein Langzeitgedächtnis ist aktualisiert. Alle fälligen und fehlerbehafteten Elemente wurden durchgearbeitet.
            </p>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={initializeReviewSession}
              className="px-5 py-3 rounded-2xl bg-learning text-white font-black text-xs shadow-md hover:bg-learning-dark transition-all flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Weiteren Durchgang starten</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
