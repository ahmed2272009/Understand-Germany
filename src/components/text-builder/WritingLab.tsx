import React, { useState } from 'react';
import { TextValidatorEngine } from '../../core/engines/text-validator-engine';
import { PenTool, CheckCircle, AlertTriangle, Save } from 'lucide-react';

const SECTIONS = [
  { range: '1–3', title: 'Vorstellung & Herkunft', hint: 'Name, Alter, Herkunft, Wohnort (z.B. Ich heiße..., Ich komme aus...)' },
  { range: '4–7', title: 'Schule & Alltag', hint: 'Schule, Fächer, Tagesablauf (z.B. Heute lerne ich..., Meine Schule ist...)' },
  { range: '8–10', title: 'Sprachen & Motivation', hint: 'Welche Sprachen sprichst du? Warum Deutsch? (z.B. Ich lerne Deutsch, weil...)' },
  { range: '11–14', title: 'Freizeit & Hobbys', hint: 'Sport, Musik, Freunde treffen (z.B. Am Wochenende spiele ich...)' },
  { range: '15–17', title: 'Familie & Freunde', hint: 'Beschreibe deine Familie mit Adjektiven (z.B. Mein Bruder ist...)' },
  { range: '18–20', title: 'Zukunft & Abschluss', hint: 'Pläne und Ziel (z.B. Mein Ziel ist, die Sprache fließend zu sprechen.)' },
];

const INITIAL_TEXT = `Hallo! Mein Name ist Alex und ich bin sechzehn Jahre alt.
Ich komme aus Berlin und ich wohne jetzt hier.
Ich lerne seit einem Monat Deutsch von Null.
Meine Schule beginnt jeden Tag um acht Uhr.
Heute lerne ich fleißig Grammatik und neue Wörter.
In der Schule habe ich viele nette Freunde.
Mein Lieblingsfach ist Informatik, weil es sehr logisch ist.
Ich spreche schon Englisch und Französisch.
Jetzt lerne ich Deutsch, weil ich in Deutschland studieren möchte.
Die deutsche Sprache ist am Anfang schwer, aber sehr schön.
In meiner Freizeit spiele ich gerne Fußball mit meinen Freunden.
Am Wochenende höre ich Musik oder lese ein interessantes Buch.
Manchmal koche ich mit meiner Familie am Abend.
Ich habe einen Hund und er heißt Rex.
Meine Eltern sind immer hilfsbereit und freundlich.
Mein bester Freund hilft mir oft beim Üben.
Zusammen sprechen wir oft einfache deutsche Sätze.
In der Zukunft will ich fließend Deutsch sprechen.
Ich möchte eine gute Prüfung schaffen und viel reisen.
Mein Ziel für die 30 Tage habe ich mit diesem Text erreicht.`;

export const WritingLab: React.FC = () => {
  const [text, setText] = useState(INITIAL_TEXT);
  const [saved, setSaved] = useState(false);

  const validation = TextValidatorEngine.validateEssay(text, 20);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 p-5 rounded-3xl text-white shadow-xl border border-purple-500/20">
        <div className="flex items-center gap-2 text-purple-400 text-xs font-black uppercase tracking-wider mb-1">
          <PenTool className="w-3.5 h-3.5" />
          <span>Das Meisterwerk (Tag 29–30)</span>
        </div>
        <h2 className="text-xl font-black">Der 20-Zeilen-Text</h2>
        <p className="text-xs text-purple-200 mt-1 leading-relaxed">
          Verbinde alle gelernten Bausteine: V2-Satzstellung, Konnektoren (weil, aber, und) und deinen Wortschatz.
        </p>
      </div>

      {/* Real-time Status Card */}
      <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Zeilen</span>
          <span className={`text-base font-black ${validation.hasEnoughLines ? 'text-emerald-500' : 'text-amber-500'}`}>
            {validation.lineCount}/20
          </span>
        </div>
        <div className="flex flex-col items-center border-x border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400">V2-Konform</span>
          <span className="text-base font-black text-indigo-500">
            {validation.v2CompliantRatio}%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold text-slate-400">Konnektoren</span>
          <span className="text-base font-black text-purple-500">
            {validation.connectorsFound.length} genutzt
          </span>
        </div>
      </div>

      {/* Structure Guide Accordion */}
      <div className="bg-slate-100 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs flex flex-col gap-2">
        <span className="font-bold text-slate-700 dark:text-slate-300">
          📋 Struktur-Bauplan:
        </span>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          {SECTIONS.map((sec, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-indigo-600 block">Z. {sec.range}: {sec.title}</span>
              <span className="text-slate-400 line-clamp-1">{sec.hint}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="flex flex-col gap-1.5">
        <textarea
          rows={16}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-mono leading-relaxed focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-inner"
          placeholder="Schreibe hier deinen 20-Zeilen-Text..."
        />
      </div>

      {/* Warnings & Suggestions */}
      {validation.warnings.length > 0 && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl flex flex-col gap-1.5 text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Grammatik-Hinweise ({validation.warnings.length}):</span>
          </div>
          {validation.warnings.slice(0, 3).map((w, idx) => (
            <span key={idx} className="text-[11px] text-amber-800 dark:text-amber-300">
              • {w.message}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          {saved ? <CheckCircle className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Entwurf gespeichert!' : 'Text sichern & bewerten'}</span>
        </button>
      </div>
    </div>
  );
};
