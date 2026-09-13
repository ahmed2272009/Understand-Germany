import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { WritingEditor } from '../components/ui/WritingEditor';
import { TextValidatorEngine } from '../core/engines/text-validator-engine';
import { 
  User, 
  PenTool, 
  Languages, 
  Volume2, 
  Check, 
  Save,
  CheckCircle2,
  LogOut,
  ShieldCheck
} from 'lucide-react';

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

export const ProfilePage: React.FC = () => {
  const { user, signOut, signInWithEmail } = useAuth();
  const { levelInfo } = useProgress();

  const [activeTab, setActiveTab] = useState<'profile' | 'writingLab'>('profile');
  const [targetLang, setTargetLang] = useState<'en' | 'fr' | 'ar'>('en');
  const [speechRate, setSpeechRate] = useState<number>(0.9);

  // 20-line writing lab state
  const [essayText, setEssayText] = useState(INITIAL_TEXT);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const validation = TextValidatorEngine.validateEssay(essayText, 20);

  const handleSaveText = () => {
    localStorage.setItem('deutsch_quest_20_line_essay', essayText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto p-4 md:p-6 pb-24">
      {/* Tab Switcher */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-learning text-white shadow-md shadow-learning/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profil & Einstellungen</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('writingLab')}
          className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
            activeTab === 'writingLab'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>20-Zeilen Schreib-Labor</span>
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="flex flex-col gap-5 animate-in fade-in">
          {/* Profile Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-learning to-indigo-500 flex items-center justify-center text-3xl shadow-lg border-2 border-white/20">
              {levelInfo.badge}
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight">
                {user?.displayName || 'Deutsch-Schüler'}
              </h1>
              <span className="text-xs text-blue-200 font-medium">
                {levelInfo.title} • Level {levelInfo.level}
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                E-Mail: {user?.email || 'schueler@deutschquest.de'}
              </span>
            </div>
          </div>

          {/* Language Bridge Preferences */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-learning">
              <Languages className="w-4 h-4" />
              <h2 className="text-xs font-black uppercase tracking-wider">
                Bevorzugte Brückensprache (Übersetzungen)
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'en', label: '🇬🇧 Englisch' },
                { id: 'fr', label: '🇫🇷 Französisch' },
                { id: 'ar', label: '🇸🇦 Arabisch (Lautschrift)' }
              ].map(lang => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setTargetLang(lang.id as any)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    targetLang === lang.id
                      ? 'bg-learning-light text-learning-dark border-learning shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {targetLang === lang.id && <Check className="w-3.5 h-3.5" />}
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Audio Speech Settings */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-attention-dark dark:text-attention">
              <Volume2 className="w-4 h-4" />
              <h2 className="text-xs font-black uppercase tracking-wider">
                Audio-Sprachgeschwindigkeit (Speech Synthesis)
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">Langsam (0.7x)</span>
              <input
                type="range"
                min="0.6"
                max="1.2"
                step="0.1"
                value={speechRate}
                onChange={e => setSpeechRate(parseFloat(e.target.value))}
                className="flex-1 accent-learning"
              />
              <span className="text-xs font-bold text-slate-500">Normal (1.0x)</span>
            </div>
          </div>

          {/* Account & Session Security */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
              <h2 className="text-xs font-black uppercase tracking-wider">
                Konto & Authentifizierungs-Sicherheit
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Status: {user?.isAnonymous ? 'Gast-Konto (Anonym)' : 'Verifiziertes Konto'}
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  Rolle: <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">{user?.role || 'student'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {user?.isAnonymous ? (
                  <button
                    type="button"
                    onClick={() => signInWithEmail('schueler@deutschquest.app')}
                    className="px-4 py-2 rounded-xl bg-learning hover:bg-learning-dark text-white font-bold text-xs transition-all flex-1 sm:flex-initial"
                  >
                    Mit E-Mail verknüpfen
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all flex items-center gap-1.5 flex-1 sm:flex-initial"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Abmelden</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 20-LINE WRITING LAB TAB */}
      {activeTab === 'writingLab' && (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <div className="p-5 rounded-3xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40">
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <PenTool className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">
                Meisterprüfung: 20-Zeilen-Text
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Dein zusammenfassender Text über dich
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Schreibe 20 strukturierte Zeilen. Der Prüfer überprüft automatisch deine Satzanzahl, V2-Stellung und Konnektoren (weil, aber, und).
            </p>
          </div>

          {/* Reusable WritingEditor */}
          <WritingEditor
            text={essayText}
            onChange={setEssayText}
            lineCount={validation.lineCount}
            v2CompliantRatio={validation.v2CompliantRatio}
            connectorsFound={validation.connectorsFound}
            warnings={validation.warnings}
            targetLines={20}
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            {savedSuccess && (
              <span className="text-xs font-bold text-correct flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Erfolgreich gespeichert!</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveText}
              className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-black text-xs shadow-md shadow-purple-600/20 hover:bg-purple-700 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Text speichern</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
