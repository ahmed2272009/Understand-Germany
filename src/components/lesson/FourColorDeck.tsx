import React, { useState } from 'react';
import { DayLesson } from '../../core/types/curriculum';
import { BookOpen, HelpCircle, Lightbulb, Volume2, Sparkles } from 'lucide-react';

interface FourColorDeckProps {
  lesson: DayLesson;
}

type ColorTab = 'grammar' | 'vocab' | 'model' | 'trick';

export const FourColorDeck: React.FC<FourColorDeckProps> = ({ lesson }) => {
  const [activeTab, setActiveTab] = useState<ColorTab>('grammar');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 4-Color Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-200 dark:bg-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveTab('grammar')}
          className={`flex flex-col items-center py-2 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === 'grammar'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>🟢 Grammatik</span>
        </button>

        <button
          onClick={() => setActiveTab('vocab')}
          className={`flex flex-col items-center py-2 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === 'vocab'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>🔵 Wörter</span>
        </button>

        <button
          onClick={() => setActiveTab('model')}
          className={`flex flex-col items-center py-2 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === 'model'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Volume2 className="w-4 h-4 mb-0.5" />
          <span>🟣 Modell</span>
        </button>

        <button
          onClick={() => setActiveTab('trick')}
          className={`flex flex-col items-center py-2 rounded-xl text-[11px] font-bold transition-all ${
            activeTab === 'trick'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Lightbulb className="w-4 h-4 mb-0.5" />
          <span>🟠 Trick</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[260px]">
        {/* 🟢 Grammatik */}
        {activeTab === 'grammar' && (
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Grammatik & Satzregel
              </h4>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {lesson.concept.summary}
            </p>

            {lesson.concept.formula && (
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-300 dark:border-emerald-700 shadow-sm">
                <span className="text-[10px] font-bold uppercase text-emerald-600 block mb-1">
                  📐 Satzformel:
                </span>
                <code className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-400">
                  {lesson.concept.formula}
                </code>
              </div>
            )}

            <div className="flex flex-col gap-1.5 mt-1">
              <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">Wichtige Regeln:</span>
              {lesson.concept.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔵 Wortschatz */}
        {activeTab === 'vocab' && (
          <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 p-4 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-800 dark:text-blue-300">
                  Wortschatz (Trilingual Scaffold)
                </h4>
              </div>
              <span className="text-[10px] text-blue-600 font-bold">
                {lesson.vocabulary.length} Wörter
              </span>
            </div>

            <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
              {lesson.vocabulary.map((v) => (
                <div
                  key={v.id}
                  className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-blue-100 dark:border-blue-900/60 shadow-sm flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {v.german}
                      </span>
                      {v.gender && (
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded text-white ${
                            v.gender === 'der'
                              ? 'bg-sky-600'
                              : v.gender === 'die'
                              ? 'bg-rose-500'
                              : 'bg-amber-500'
                          }`}
                        >
                          {v.gender}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>🇬🇧 {v.english}</span>
                      <span>•</span>
                      <span>🇫🇷 {v.french}</span>
                    </div>
                    {v.memoryClue && (
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium block mt-0.5">
                        💡 {v.memoryClue}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => speak(v.german)}
                    className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 transition-colors"
                    title="Aussprache anhören"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🟣 Sprechmodell */}
        {activeTab === 'model' && (
          <div className="bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 p-4 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <h4 className="text-xs font-black uppercase tracking-wider text-purple-800 dark:text-purple-300">
                Sprech- und Schreibmodell
              </h4>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-purple-200 dark:border-purple-800/70 shadow-sm flex flex-col gap-2">
              <p className="text-base font-bold text-purple-900 dark:text-purple-200 leading-snug">
                "{lesson.speakingModel.german}"
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>{lesson.speakingModel.english}</span>
              </div>
              <button
                onClick={() => speak(lesson.speakingModel.german)}
                className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Laut nachsprechen (Shadowing)</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 italic">
              {lesson.speakingModel.note}
            </p>
          </div>
        )}

        {/* 🟠 Merktrick */}
        {activeTab === 'trick' && (
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-4 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Merktrick & Fehlerfalle
              </h4>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-300 dark:border-amber-700/70 shadow-sm flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {lesson.mnemonicTrick.tip}
                </p>
              </div>
              {lesson.mnemonicTrick.warning && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-100/70 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{lesson.mnemonicTrick.warning}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-100 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                🎯 Heutige Übungsaufgabe:
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {lesson.practiceTask}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
