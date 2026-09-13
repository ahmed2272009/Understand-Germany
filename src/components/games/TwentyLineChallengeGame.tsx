import React, { useState } from 'react';
import { GameSummary } from './GameSummary';
import { GameSummaryStats } from '../../core/types/image-vocab';
import { Scroll, Trophy, ArrowRight } from 'lucide-react';

interface PromptLine {
  lineNum: number;
  prompt: string;
  defaultSuggestion: string;
  syntaxHint: string;
}

const TWENTY_PROMPTS: PromptLine[] = [
  { lineNum: 1, prompt: 'Begrüßung & Name', defaultSuggestion: 'Hallo, ich heiße Alex und lerne Deutsch.', syntaxHint: 'V2: "heiße" steht an Position 2.' },
  { lineNum: 2, prompt: 'Herkunft', defaultSuggestion: 'Ich komme aus Frankreich.', syntaxHint: 'Präposition: "aus" verlangt Dativ.' },
  { lineNum: 3, prompt: 'Wohnort', defaultSuggestion: 'Jetzt wohne ich in Berlin.', syntaxHint: 'Inversion: Zeitangabe "Jetzt" an Pos. 1 -> Verb an Pos. 2.' },
  { lineNum: 4, prompt: 'Alter & Beruf', defaultSuggestion: 'Ich bin dreißig Jahre alt und arbeite als Entwickler.', syntaxHint: 'Konjunktion "und" verbindet zwei Hauptsätze.' },
  { lineNum: 5, prompt: 'Sprachen', defaultSuggestion: 'Ich spreche Englisch, Französisch und ein bisschen Deutsch.', syntaxHint: 'Vokalwechsel: sprechen -> ich spreche, du sprichst.' },
  { lineNum: 6, prompt: 'Morgenroutine', defaultSuggestion: 'Jeden Morgen stehe ich um sieben Uhr auf.', syntaxHint: 'Trennbares Verb: "aufstehen" -> "stehe ... auf".' },
  { lineNum: 7, prompt: 'Frühstück', defaultSuggestion: 'Zum Frühstück trinke ich Kaffee und esse Brot.', syntaxHint: 'Akkusativ: Kaffee (m.) und Brot (n.).' },
  { lineNum: 8, prompt: 'Weg zur Arbeit/Schule', defaultSuggestion: 'Danach fahre ich mit der U-Bahn zur Arbeit.', syntaxHint: 'Dativ nach "mit": mit der U-Bahn.' },
  { lineNum: 9, prompt: 'Tagesaktivität', defaultSuggestion: 'Im Büro schreibe ich viele E-Mails.', syntaxHint: 'Subjekt "ich" folgt direkt auf das Verb "schreibe".' },
  { lineNum: 10, prompt: 'Mittagspause', defaultSuggestion: 'Um zwölf Uhr esse ich mit meinen Kollegen.', syntaxHint: 'Dativ Plural: mit meinen Kollegen.' },
  { lineNum: 11, prompt: 'Hobbys & Freizeit', defaultSuggestion: 'In meiner Freizeit lese ich gern Bücher.', syntaxHint: 'Gern drückt Vorliebe aus: "lese ich gern".' },
  { lineNum: 12, prompt: 'Sport', defaultSuggestion: 'Am Wochenende spiele ich Fußball im Park.', syntaxHint: 'TeKaMoLo: Wann (am Wochenende) -> Wo (im Park).' },
  { lineNum: 13, prompt: 'Freunde treffen', defaultSuggestion: 'Manchmal treffe ich meine Freunde im Café.', syntaxHint: 'Akkusativ Plural: meine Freunde.' },
  { lineNum: 14, prompt: 'Modalverb (Wunsch)', defaultSuggestion: 'Ich möchte dieses Jahr nach München reisen.', syntaxHint: 'Modalverb "möchte" an Pos. 2, Infinitiv "reisen" am Ende.' },
  { lineNum: 15, prompt: 'Modalverb (Können)', defaultSuggestion: 'Ich kann schon einfache deutsche Texte verstehen.', syntaxHint: 'Infinitivklammer: "kann ... verstehen".' },
  { lineNum: 16, prompt: 'Gestern (Perfekt)', defaultSuggestion: 'Gestern habe ich zwei Stunden Deutsch geübt.', syntaxHint: 'Perfekt mit haben: habe + geübt am Satzende.' },
  { lineNum: 17, prompt: 'Bewegung (Perfekt)', defaultSuggestion: 'Am Abend bin ich im Park spazieren gegangen.', syntaxHint: 'Bewegung mit sein: bin + gegangen.' },
  { lineNum: 18, prompt: 'Begründung (Weil)', defaultSuggestion: 'Ich lerne Deutsch, weil die Sprache nützlich ist.', syntaxHint: 'Nebensatz: Das Verb "ist" steht ganz am Ende.' },
  { lineNum: 19, prompt: 'Zielsetzung', defaultSuggestion: 'Mein Ziel ist das B1-Zertifikat.', syntaxHint: 'Kopulaverb "sein" verbindet Subjekt und Prädikatsnomen.' },
  { lineNum: 20, prompt: 'Abschluss', defaultSuggestion: 'Deutsch lernen macht mir wirklich viel Spaß!', syntaxHint: 'Infinitiv als Nomen: "Deutsch lernen" macht Spaß.' }
];

interface TwentyLineChallengeGameProps {
  onExit: () => void;
  onRewardXP?: (xp: number) => void;
}

export const TwentyLineChallengeGame: React.FC<TwentyLineChallengeGameProps> = ({
  onExit,
  onRewardXP
}) => {
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [writtenLines, setWrittenLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState(TWENTY_PROMPTS[0].defaultSuggestion);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());

  const prompt = TWENTY_PROMPTS[currentLineIdx];

  const handleConfirmLine = () => {
    if (!currentInput.trim()) return;

    const updated = [...writtenLines, currentInput.trim()];
    setWrittenLines(updated);
    setScore(s => s + 25);

    if (currentLineIdx + 1 >= TWENTY_PROMPTS.length) {
      setGameOver(true);
      onRewardXP?.(100); // Grand award for 20 lines
    } else {
      const nextIdx = currentLineIdx + 1;
      setCurrentLineIdx(nextIdx);
      setCurrentInput(TWENTY_PROMPTS[nextIdx].defaultSuggestion);
    }
  };

  const restart = () => {
    setCurrentLineIdx(0);
    setWrittenLines([]);
    setCurrentInput(TWENTY_PROMPTS[0].defaultSuggestion);
    setScore(0);
    setGameOver(false);
  };

  if (gameOver) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const summaryStats: GameSummaryStats = {
      gameId: 'twenty-line',
      gameTitle: '20 Line Challenge',
      score: 500,
      highScore: 500,
      accuracy: 100,
      itemsCount: 20,
      correctCount: 20,
      streakCount: 20,
      xpEarned: 100,
      timeSpentSeconds: timeSpent
    };

    return (
      <GameSummary
        stats={summaryStats}
        onPlayAgain={restart}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-6 max-w-xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
          <Scroll className="w-4 h-4" />
          <span>20-Zeilen Text-Sprint</span>
        </span>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">
            Zeile {currentLineIdx + 1} von 20
          </span>
          <div className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            <Trophy className="w-3.5 h-3.5" />
            <span>{score} Pkt</span>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${((currentLineIdx + 1) / 20) * 100}%` }}
        />
      </div>

      {/* Prompt Card */}
      <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex flex-col gap-1.5">
        <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Thema Zeile {prompt.lineNum}: {prompt.prompt}
        </span>
        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
          💡 {prompt.syntaxHint}
        </p>
      </div>

      {/* Input / Editor */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
          Dein deutscher Satz:
        </label>
        <textarea
          rows={3}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="w-full p-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none shadow-inner"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setCurrentInput(prompt.defaultSuggestion)}
          className="text-xs font-bold text-slate-400 hover:text-amber-600 transition-colors"
        >
          Vorlage wiederherstellen
        </button>

        <button
          type="button"
          onClick={handleConfirmLine}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs md:text-sm shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>Zeile bestätigen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Live Text Preview (Collapsible / Compact) */}
      {writtenLines.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col gap-1.5 max-h-36 overflow-y-auto">
          <span className="text-[10px] font-black uppercase text-slate-400">
            Bisher verfasster Text ({writtenLines.length} Zeilen):
          </span>
          <div className="text-xs text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
            {writtenLines.map((line, idx) => (
              <span key={idx} className="mr-1.5">
                {line}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
