import React, { useState } from 'react';
import { Exercise } from '../../core/types/curriculum';
import { EvaluationResult } from '../../core/types/learning';
import { LearningEngine } from '../../core/engines/learning-engine';
import { MultipleChoiceExercise } from './MultipleChoiceExercise';
import { FillInBlankExercise } from './FillInBlankExercise';
import { SentenceOrderingExercise } from './SentenceOrderingExercise';
import { TranslationExercise } from './TranslationExercise';
import { ArticleSelectExercise } from './ArticleSelectExercise';
import { MatchingExercise } from './MatchingExercise';
import { ImageVocabExercise } from './ImageVocabExercise';
import { ListeningExercise } from './ListeningExercise';
import { WritingExercise } from './WritingExercise';
import { PronunciationExercise } from './PronunciationExercise';
import { ImmediateExplanationCard } from './ImmediateExplanationCard';
import { ArrowRight, Check, HelpCircle } from 'lucide-react';

interface ExerciseDispatcherProps {
  exercise: Exercise;
  exerciseIndex: number;
  totalExercises: number;
  onExerciseComplete: (result: { exerciseId: string; isCorrect: boolean; answer: any; evalResult: EvaluationResult }) => void;
  className?: string;
}

export const ExerciseDispatcher: React.FC<ExerciseDispatcherProps> = ({
  exercise,
  exerciseIndex,
  totalExercises,
  onExerciseComplete,
  className = ''
}) => {
  const [userAnswer, setUserAnswer] = useState<any>(
    exercise.type === 'sentence-ordering' || exercise.type === 'syntax-order'
      ? []
      : exercise.type === 'matching'
        ? {}
        : ''
  );
  const [isChecked, setIsChecked] = useState(false);
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);

  const handleCheck = () => {
    if (isChecked) return;
    const result = LearningEngine.evaluateExercise(exercise, userAnswer);
    setEvalResult(result);
    setIsChecked(true);
  };

  const handleProceed = () => {
    if (!evalResult) return;
    onExerciseComplete({
      exerciseId: exercise.id,
      isCorrect: evalResult.isCorrect,
      answer: userAnswer,
      evalResult
    });

    // Reset local state for next exercise
    setIsChecked(false);
    setEvalResult(null);
    setUserAnswer(
      exercise.type === 'sentence-ordering' || exercise.type === 'syntax-order'
        ? []
        : exercise.type === 'matching'
          ? {}
          : ''
    );
  };

  const isAnswerProvided = () => {
    if (exercise.type === 'sentence-ordering' || exercise.type === 'syntax-order') {
      return Array.isArray(userAnswer) && userAnswer.length > 0;
    }
    if (exercise.type === 'matching') {
      return Object.keys(userAnswer || {}).length > 0;
    }
    return userAnswer !== undefined && userAnswer !== null && String(userAnswer).trim().length > 0;
  };

  // Get readable type badge
  const getTypeBadge = () => {
    const badgeMap: Record<string, string> = {
      'multiple-choice': 'Multiple Choice',
      'fill-in': 'Lückentext',
      'sentence-ordering': 'Satzbau',
      'syntax-order': 'Satzbau',
      'translation': 'Übersetzung',
      'article-select': 'Artikel (der / die / das)',
      'matching': 'Zuordnung',
      'image-vocab': 'Bildvokabel',
      'listening': 'Hörverstehen',
      'writing': 'Schreibaufgabe',
      'pronunciation': 'Aussprache'
    };
    return badgeMap[exercise.type] || 'Interaktive Übung';
  };

  return (
    <div className={`p-5 md:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-5 ${className}`}>
      {/* Exercise Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-learning bg-learning-light dark:bg-slate-800 px-3 py-1 rounded-full border border-learning/20">
          Aufgabe {exerciseIndex + 1} von {totalExercises}
        </span>
        <span className="text-[11px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-lg font-mono">
          {getTypeBadge()}
        </span>
      </div>

      {/* Prompt & Question */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {exercise.prompt}
        </h3>
        <p className="text-base md:text-lg font-black text-slate-900 dark:text-white mt-1 leading-snug">
          {exercise.question}
        </p>
      </div>

      {/* Dynamic Exercise Component Dispatch */}
      <div className="py-2">
        {(exercise.type === 'multiple-choice') && (
          <MultipleChoiceExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onSelect={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'fill-in') && (
          <FillInBlankExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onChange={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'sentence-ordering' || exercise.type === 'syntax-order') && (
          <SentenceOrderingExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onChange={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'translation') && (
          <TranslationExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onChange={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'article-select') && (
          <ArticleSelectExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onSelect={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'matching') && (
          <MatchingExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onChange={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'image-vocab') && (
          <ImageVocabExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onSelect={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'listening') && (
          <ListeningExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onChange={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'writing') && (
          <WritingExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onChange={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}

        {(exercise.type === 'pronunciation') && (
          <PronunciationExercise
            exercise={exercise}
            userAnswer={userAnswer}
            onChange={setUserAnswer}
            isChecked={isChecked}
            isCorrect={evalResult?.isCorrect}
          />
        )}
      </div>

      {/* Immediate Educational Explanation Card upon checking */}
      {isChecked && evalResult && (
        <ImmediateExplanationCard
          isCorrect={evalResult.isCorrect}
          userAnswerDisplay={evalResult.userAnswerDisplay}
          correctAnswerDisplay={evalResult.correctAnswerDisplay}
          explanation={evalResult.explanation}
          germanAudioText={exercise.targetText || (typeof exercise.correctAnswer === 'string' ? exercise.correctAnswer : undefined)}
          onAcknowledge={!evalResult.isCorrect ? handleProceed : undefined}
        />
      )}

      {/* Action Controls */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        {exercise.hint && !isChecked && (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <HelpCircle className="w-3.5 h-3.5 text-learning" />
            <span className="italic">{exercise.hint}</span>
          </div>
        )}
        <div className="ml-auto">
          {!isChecked ? (
            <button
              type="button"
              disabled={!isAnswerProvided()}
              onClick={handleCheck}
              className="px-6 py-3 rounded-2xl bg-learning hover:bg-learning-dark disabled:opacity-40 text-white font-black text-xs md:text-sm shadow-md transition-all active:scale-98 flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Überprüfen</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleProceed}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm shadow-md transition-all active:scale-98 flex items-center gap-2"
            >
              <span>{exerciseIndex + 1 < totalExercises ? 'Nächste Aufgabe' : 'Lektion abschließen'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
