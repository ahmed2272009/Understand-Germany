import React, { useState } from 'react';
import { DayLesson } from '../../core/types/curriculum';
import { FourColorDeck } from './FourColorDeck';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';
import { ExerciseDispatcher } from '../exercises/ExerciseDispatcher';
import { EvaluationResult, LessonValidationResult } from '../../core/types/learning';
import { 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  ShieldCheck
} from 'lucide-react';

interface LessonRunnerProps {
  lesson: DayLesson;
  onBack: () => void;
}

export const LessonRunner: React.FC<LessonRunnerProps> = ({ lesson, onBack }) => {
  const { submitLesson, deductHeart } = useProgress();
  const { user } = useAuth();

  const [mode, setMode] = useState<'study' | 'quiz' | 'completed'>('study');
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [evalResults, setEvalResults] = useState<Record<string, EvaluationResult>>({});
  const [startTime] = useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResult, setValidationResult] = useState<LessonValidationResult | null>(null);

  const currentExercise = lesson.exercises[currentExIdx];

  const handleExerciseComplete = async (res: {
    exerciseId: string;
    isCorrect: boolean;
    answer: any;
    evalResult: EvaluationResult;
  }) => {
    // Record raw answer and result
    const nextAnswers = { ...userAnswers, [res.exerciseId]: res.answer };
    const nextResults = { ...evalResults, [res.exerciseId]: res.evalResult };
    setUserAnswers(nextAnswers);
    setEvalResults(nextResults);

    if (!res.isCorrect) {
      // Deduct heart on incorrect answer
      await deductHeart();
    }

    if (currentExIdx + 1 < lesson.exercises.length) {
      setCurrentExIdx(prev => prev + 1);
    } else {
      // Lesson finished - submit to server-side / engine-side reward validator
      setIsSubmitting(true);
      const timeSpent = Math.max(15, Math.round((Date.now() - startTime) / 1000));
      const submissionToken = `sub-${lesson.dayId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      try {
        const result = await submitLesson({
          userId: user?.uid || 'guest',
          dayId: lesson.dayId,
          dayNumber: lesson.dayNumber,
          answers: nextAnswers,
          timeSpentSeconds: timeSpent,
          submissionToken,
          submittedAt: new Date().toISOString()
        });

        setValidationResult(result);
        setMode('completed');
      } catch (err) {
        console.error('Failed to submit lesson:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentExIdx(0);
    setUserAnswers({});
    setEvalResults({});
    setValidationResult(null);
    setMode('quiz');
  };

  return (
    <div className="flex flex-col p-4 md:p-6 gap-5 max-w-2xl mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 p-2 -ml-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Quest</span>
        </button>
        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          Tag {lesson.dayNumber} von 30
        </span>
      </div>

      {/* Lesson Title & Objective */}
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-50 leading-tight">
          {lesson.title}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {lesson.goal}
        </p>
      </div>

      {/* Mode 1: Study Deck */}
      {mode === 'study' && (
        <div className="flex flex-col gap-5">
          <FourColorDeck lesson={lesson} />

          <button
            onClick={() => setMode('quiz')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm md:text-base shadow-lg shadow-emerald-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 hover:from-emerald-500 hover:to-teal-500"
          >
            <Sparkles className="w-4 h-4" />
            <span>Verstanden! Interaktive Übungen starten ({lesson.exercises.length} Aufgaben)</span>
          </button>
        </div>
      )}

      {/* Mode 2: Interactive Quiz Runner with 10 Exercise Types */}
      {mode === 'quiz' && currentExercise && (
        <div className="flex flex-col gap-4">
          {/* Progress Tracker */}
          <div className="flex items-center gap-1.5 w-full">
            {lesson.exercises.map((_, i) => {
              let barColor = 'bg-slate-200 dark:bg-slate-800';
              if (i < currentExIdx) {
                barColor = 'bg-emerald-500';
              } else if (i === currentExIdx) {
                barColor = 'bg-learning ring-2 ring-learning/30';
              }
              return (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${barColor}`}
                />
              );
            })}
          </div>

          <ExerciseDispatcher
            exercise={currentExercise}
            exerciseIndex={currentExIdx}
            totalExercises={lesson.exercises.length}
            onExerciseComplete={handleExerciseComplete}
          />
        </div>
      )}

      {/* Loading state during server-side validation */}
      {isSubmitting && (
        <div className="p-12 text-center flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-learning border-t-transparent animate-spin" />
          <span className="text-xs font-bold text-slate-500">
            Validiere Antworten und berechne XP serverseitig...
          </span>
        </div>
      )}

      {/* Mode 3: Completion Celebration with Server-Side Reward Details */}
      {mode === 'completed' && validationResult && (
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center gap-5 animate-in zoom-in-95">
          {/* Trophy Header */}
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg ${
            validationResult.passed
              ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 shadow-amber-400/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            {validationResult.passed ? <Trophy className="w-10 h-10 text-amber-600" /> : '📚'}
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 mb-1 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Serverseitig verifiziert</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {validationResult.passed
                ? `Tag ${lesson.dayNumber} erfolgreich gemeistert!`
                : `Tag ${lesson.dayNumber} noch nicht bestanden`}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              {validationResult.message}
            </p>
          </div>

          {/* Reward Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 w-full bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Ergebnis</span>
              <span className={`text-lg md:text-xl font-black ${
                validationResult.scorePercentage >= 75 ? 'text-emerald-500' : 'text-rose-500'
              }`}>
                {validationResult.scorePercentage}%
              </span>
            </div>

            <div className="flex flex-col items-center border-x border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold uppercase">XP Belohnung</span>
              <span className="text-lg md:text-xl font-black text-amber-500">
                +{validationResult.xpEarned} XP
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Gesamt-XP</span>
              <span className="text-lg md:text-xl font-black text-learning">
                {validationResult.newTotalXp}
              </span>
            </div>
          </div>

          {/* Exercise-by-Exercise Breakdown */}
          <div className="w-full flex flex-col gap-2 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Ergebnisübersicht:
            </span>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {lesson.exercises.map((ex, i) => {
                const evalItem = validationResult.results[ex.id];
                const isExCorrect = evalItem ? evalItem.isCorrect : false;

                return (
                  <div
                    key={ex.id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs gap-2 ${
                      isExCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isExCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span className="font-bold">Aufgabe {i + 1}:</span>
                      <span className="truncate max-w-[220px]">{ex.prompt}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase shrink-0">
                      {isExCorrect ? '1/1' : '0/1'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            {!validationResult.passed && (
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="flex-1 py-3.5 rounded-2xl bg-slate-200 dark:bg-slate-750 hover:bg-slate-300 text-slate-800 dark:text-white font-black text-xs md:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Nochmal versuchen</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm shadow-md transition-all active:scale-98"
            >
              Zurück zur Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
