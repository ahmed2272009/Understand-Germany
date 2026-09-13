import React from 'react';
import { HelpCircle } from 'lucide-react';

interface ExerciseCardProps {
  currentNumber: number;
  totalNumber: number;
  prompt: string;
  question: string;
  explanation?: string;
  showExplanation?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  currentNumber,
  totalNumber,
  prompt,
  question,
  explanation,
  showExplanation = false,
  children,
  className = ''
}) => {
  return (
    <div className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-antigravity flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-learning bg-learning-light dark:bg-slate-800 px-2.5 py-1 rounded-full">
          Aufgabe {currentNumber} von {totalNumber}
        </span>
        <span className="text-[11px] font-bold text-slate-400 font-mono">
          Interaktive Übung
        </span>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {prompt}
        </h4>
        <p className="text-base font-black text-slate-900 dark:text-white mt-1 leading-snug">
          {question}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {children}
      </div>

      {showExplanation && explanation && (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-learning shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block text-slate-800 dark:text-white">Erklärung:</span>
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};
