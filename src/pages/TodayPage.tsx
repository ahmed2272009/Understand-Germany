import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { ALL_DAYS } from '../content/days';
import { DayLesson } from '../core/types/curriculum';
import { GrammarCard } from '../components/ui/GrammarCard';
import { VocabularyCard } from '../components/ui/VocabularyCard';
import { ExerciseCard } from '../components/ui/ExerciseCard';
import { AnswerOption } from '../components/ui/AnswerOption';
import { AudioButton } from '../components/ui/AudioButton';
import { CompletionModal } from '../components/ui/CompletionModal';
import { 
  ArrowRight, 
  ArrowLeft, 
  Mic, 
  Sparkles, 
  AlertTriangle,
  Lightbulb,
  Check
} from 'lucide-react';

interface TodayPageProps {
  onStartLesson: (lesson: DayLesson) => void;
}

export const TodayPage: React.FC<TodayPageProps> = ({ onStartLesson }) => {
  const { progress, submitLesson } = useProgress();
  const { user } = useAuth();
  const currentDayNumber = progress?.highestUnlockedDay || 1;
  const lesson = ALL_DAYS.find(d => d.dayNumber === currentDayNumber) || ALL_DAYS[0];

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedXp, setEarnedXp] = useState(50);
  const [verifiedScore, setVerifiedScore] = useState(100);

  const steps = [
    { id: 1, label: 'Grammatik', color: 'bg-grammar', textColor: 'text-grammar' },
    { id: 2, label: 'Wortschatz', color: 'bg-learning', textColor: 'text-learning' },
    { id: 3, label: 'Sprechmodell', color: 'bg-purple-600', textColor: 'text-purple-600' },
    { id: 4, label: 'Übung', color: 'bg-correct', textColor: 'text-correct' },
  ];

  const handleSelectOption = (exerciseId: string, option: string) => {
    if (submittedAnswers[exerciseId]) return;
    setSelectedAnswers(prev => ({ ...prev, [exerciseId]: option }));
  };

  const handleCheckExercise = (exerciseId: string) => {
    setSubmittedAnswers(prev => ({ ...prev, [exerciseId]: true }));
  };

  const handleFinishDay = async () => {
    const submissionToken = `sub-today-${lesson.dayId}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    
    try {
      const result = await submitLesson({
        userId: user?.uid || 'guest',
        dayId: lesson.dayId,
        dayNumber: lesson.dayNumber,
        answers: selectedAnswers,
        timeSpentSeconds: 180,
        submissionToken,
        submittedAt: new Date().toISOString()
      });

      setEarnedXp(result.xpEarned);
      setVerifiedScore(result.scorePercentage);
    } catch (err) {
      console.error('Error submitting lesson:', err);
      setEarnedXp(20);
      setVerifiedScore(100);
    }

    setShowCompletion(true);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto p-4 md:p-6 pb-24">
      {/* Header with day indicator and Phase */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-learning bg-learning-light dark:bg-slate-800 px-3 py-1 rounded-full">
            Tag {lesson.dayNumber} von 30
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {lesson.phaseTitle}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          🎯 Ziel: {lesson.goal}
        </p>
      </div>

      {/* Step Navigation Pill Tracker */}
      <div className="flex items-center justify-between p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        {steps.map(step => {
          const isActive = activeStep === step.id;
          const isDone = activeStep > step.id;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id as 1 | 2 | 3 | 4)}
              className={`flex-1 py-2 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? `${step.color} text-white shadow-md`
                  : isDone
                  ? 'text-correct hover:bg-slate-200 dark:hover:bg-slate-800'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span>{step.id}.</span>}
              <span className="hidden sm:inline">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* STEP 1: GRAMMATIK */}
      {activeStep === 1 && (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <GrammarCard
            title={lesson.title}
            conceptSummary={lesson.concept.summary}
            formula={lesson.concept.formula}
            rules={lesson.concept.rules}
            example={lesson.speakingModel.german}
          />

          {lesson.mnemonicTrick && (
            <div className="p-4 rounded-3xl bg-attention-light/60 dark:bg-amber-950/20 border border-attention/30 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-attention-dark dark:text-attention shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-wider text-attention-dark dark:text-attention">
                  Lern-Tipp & Merkhilfe
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {lesson.mnemonicTrick.tip}
                </p>
                {lesson.mnemonicTrick.warning && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{lesson.mnemonicTrick.warning}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="px-6 py-3 rounded-2xl bg-learning text-white font-black text-xs shadow-md shadow-learning/20 flex items-center gap-2 hover:bg-learning-dark transition-all"
            >
              <span>Weiter zu Schritt 2: Wortschatz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: WORTSCHATZ */}
      {activeStep === 2 && (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-learning">
              Wichtige Vokabeln des Tages ({lesson.vocabulary.length})
            </h2>
            <span className="text-xs text-slate-400">Tippe auf den Lautsprecher für Aussprache</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.vocabulary.map(vocab => (
              <VocabularyCard
                key={vocab.id}
                german={vocab.german}
                english={vocab.english}
                french={vocab.french}
                gender={vocab.gender || undefined}
                memoryClue={vocab.memoryClue || undefined}
                exampleSentence={lesson.speakingModel.german}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zurück zur Grammatik</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-black text-xs shadow-md flex items-center gap-2 hover:bg-purple-700 transition-all"
            >
              <span>Weiter zu Schritt 3: Sprechmodell</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SPRECHMODELL */}
      {activeStep === 3 && (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20 border border-purple-200 dark:border-purple-800/40 shadow-antigravity flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-100 dark:bg-purple-950 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5" />
                <span>Sprechmodell (Shadowing)</span>
              </span>
              <AudioButton text={lesson.speakingModel.german} size="md" />
            </div>

            <blockquote className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-relaxed border-l-4 border-purple-600 pl-4 py-1">
              "{lesson.speakingModel.german}"
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Englisch: </span>
                <span>{lesson.speakingModel.english}</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Französisch: </span>
                <span>{lesson.speakingModel.french}</span>
              </div>
            </div>

            {lesson.speakingModel.note && (
              <p className="text-xs text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 p-3 rounded-2xl border border-purple-200/50">
                💡 {lesson.speakingModel.note}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zurück zum Wortschatz</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep(4)}
              className="px-6 py-3 rounded-2xl bg-correct text-white font-black text-xs shadow-md shadow-correct/20 flex items-center gap-2 hover:bg-correct-dark transition-all"
            >
              <span>Weiter zu Schritt 4: Übungen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ÜBUNGEN */}
      {activeStep === 4 && (
        <div className="flex flex-col gap-4 animate-in fade-in">
          {lesson.exercises.map((ex, index) => {
            const isSubmitted = submittedAnswers[ex.id];
            const chosen = selectedAnswers[ex.id];
            const options = ex.options || (ex.words ? [ex.correctAnswer, 'Falsche Reihenfolge', 'Kein Verb'] : [ex.correctAnswer]);

            return (
              <ExerciseCard
                key={ex.id}
                currentNumber={index + 1}
                totalNumber={lesson.exercises.length}
                prompt={ex.prompt}
                question={ex.question}
                explanation={ex.explanation}
                showExplanation={isSubmitted}
              >
                <div className="flex flex-col gap-2">
                  {options.map((opt, optIdx) => {
                    let optionState: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';
                    if (isSubmitted) {
                      if (opt === ex.correctAnswer) {
                        optionState = 'correct';
                      } else if (chosen === opt) {
                        optionState = 'incorrect';
                      }
                    } else if (chosen === opt) {
                      optionState = 'selected';
                    }

                    return (
                      <AnswerOption
                        key={optIdx}
                        text={opt}
                        selected={chosen === opt}
                        state={optionState}
                        disabled={isSubmitted}
                        indexIndicator={String.fromCharCode(65 + optIdx)}
                        onClick={() => handleSelectOption(ex.id, opt)}
                      />
                    );
                  })}
                </div>

                {!isSubmitted && (
                  <button
                    type="button"
                    disabled={!chosen}
                    onClick={() => handleCheckExercise(ex.id)}
                    className="self-end px-5 py-2.5 rounded-2xl bg-learning text-white font-black text-xs shadow-sm hover:bg-learning-dark transition-all disabled:opacity-40 disabled:pointer-events-none"
                  >
                    Antwort prüfen
                  </button>
                )}
              </ExerciseCard>
            );
          })}

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zurück zum Sprechmodell</span>
            </button>

            <button
              type="button"
              onClick={handleFinishDay}
              className="px-6 py-3 rounded-2xl bg-correct text-white font-black text-xs shadow-md shadow-correct/20 flex items-center gap-2 hover:bg-correct-dark transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tag {lesson.dayNumber} abschließen</span>
            </button>
          </div>
        </div>
      )}

      {/* Full Lesson Runner Alternative Button */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
            Vollbild-Lernmodus
          </span>
          <span className="text-[11px] text-slate-400">
            Starte den interaktiven 4-Farben-Modus mit Audio und XP-Prüfung
          </span>
        </div>
        <button
          type="button"
          onClick={() => onStartLesson(lesson)}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90"
        >
          Runner starten
        </button>
      </div>

      <CompletionModal
        isOpen={showCompletion}
        dayNumber={lesson.dayNumber}
        xpEarned={earnedXp}
        streakCount={progress?.streakCount || 1}
        scorePercentage={verifiedScore}
        onContinue={() => {
          setShowCompletion(false);
          setActiveStep(1);
        }}
      />
    </div>
  );
};
