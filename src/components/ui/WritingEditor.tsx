import React from 'react';
import { AlertCircle } from 'lucide-react';

interface WritingEditorProps {
  text: string;
  onChange: (newText: string) => void;
  lineCount: number;
  v2CompliantRatio: number;
  connectorsFound: string[];
  warnings: { line: number; message: string }[];
  targetLines?: number;
}

export const WritingEditor: React.FC<WritingEditorProps> = ({
  text,
  onChange,
  lineCount,
  v2CompliantRatio,
  connectorsFound,
  warnings,
  targetLines = 20
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Realtime stats ribbon */}
      <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Zeilen</span>
          <span className={`text-base font-black ${lineCount >= targetLines ? 'text-correct' : 'text-attention-dark dark:text-attention'}`}>
            {lineCount}/{targetLines}
          </span>
        </div>
        <div className="border-x border-slate-200 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">V2-Verbquote</span>
          <span className="text-base font-black text-grammar">
            {v2CompliantRatio}%
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Konnektoren</span>
          <span className="text-base font-black text-learning">
            {connectorsFound.length} aktiv
          </span>
        </div>
      </div>

      {/* Editor text area */}
      <div className="relative">
        <textarea
          rows={16}
          value={text}
          onChange={(e) => onChange(e.target.value)}
          aria-label="20-Zeilen Text Editor"
          className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-mono leading-relaxed focus-visible:ring-2 focus-visible:ring-learning focus-visible:outline-none shadow-inner"
          placeholder="Schreibe deinen Text hier Zeile für Zeile..."
        />
      </div>

      {/* Warnings & Feedback */}
      {warnings.length > 0 && (
        <div className="p-3 bg-attention-light dark:bg-attention/10 border border-attention/30 rounded-2xl flex flex-col gap-1 text-xs text-attention-dark dark:text-attention">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Grammatik-Prüfung:</span>
          </div>
          {warnings.slice(0, 3).map((w, i) => (
            <p key={i} className="text-[11px] leading-relaxed">
              • Zeile {w.line}: {w.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
