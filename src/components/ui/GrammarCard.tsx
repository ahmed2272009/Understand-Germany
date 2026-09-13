import React from 'react';
import { BookOpen } from 'lucide-react';

interface GrammarCardProps {
  title: string;
  conceptSummary: string;
  formula?: string | null;
  rules: string[];
  example?: string;
  className?: string;
}

export const GrammarCard: React.FC<GrammarCardProps> = ({
  title,
  conceptSummary,
  formula,
  rules,
  example,
  className = ''
}) => {
  return (
    <div className={`p-5 rounded-3xl bg-gradient-to-br from-grammar-light via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-grammar/30 shadow-antigravity flex flex-col gap-3.5 ${className}`}>
      <div className="flex items-center gap-2 text-grammar">
        <BookOpen className="w-5 h-5" />
        <span className="text-xs font-black uppercase tracking-wider">
          Grammatik & Satzregel
        </span>
      </div>

      <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug">
        {title}
      </h3>

      <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
        {conceptSummary}
      </p>

      {formula && (
        <div className="p-3.5 rounded-2xl bg-grammar-light/70 dark:bg-slate-800/80 border border-grammar/40">
          <span className="text-[10px] font-black uppercase tracking-wider text-grammar block mb-1">
            📐 Formel / Wortstellung:
          </span>
          <code className="text-xs font-mono font-black text-grammar-dark dark:text-grammar">
            {formula}
          </code>
        </div>
      )}

      {rules.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Wichtige Regeln:
          </span>
          <ul className="space-y-1">
            {rules.map((rule, idx) => (
              <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <span className="text-grammar font-bold">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {example && (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 font-bold block mb-0.5">Beispiel:</span>
          „{example}“
        </div>
      )}
    </div>
  );
};
