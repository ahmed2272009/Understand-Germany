import React, { useState } from 'react';
import { GameSummary } from './GameSummary';
import { GameSummaryStats } from '../../core/types/image-vocab';
import { Swords, Shield, AlertCircle } from 'lucide-react';

interface GrammarDuelQuestion {
  id: string;
  prompt: string;
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
}

const DUEL_QUESTIONS: GrammarDuelQuestion[] = [
  {
    id: 'gb-1',
    prompt: 'Wähle die richtige Akkusativ-Form:',
    sentence: 'Ich sehe ___ Mann im Park.',
    options: ['den', 'dem', 'der'],
    correctAnswer: 'den',
    explanation: 'Maskulinum im Akkusativ wird zu "den" (der Mann -> den Mann).',
    topic: 'Akkusativ'
  },
  {
    id: 'gb-2',
    prompt: 'Wähle die richtige Dativ-Form:',
    sentence: 'Ich helfe ___ Frau mit der Tasche.',
    options: ['die', 'der', 'den'],
    correctAnswer: 'der',
    explanation: 'Femininum im Dativ wird zu "der" (die Frau -> der Frau).',
    topic: 'Dativ'
  },
  {
    id: 'gb-3',
    prompt: 'Konjugation von "sein" (du):',
    sentence: 'Wo ___ du gestern gewesen?',
    options: ['bist', 'warst', 'seid'],
    correctAnswer: 'bist',
    explanation: 'Präsens: du bist. Im Perfekt mit gewesen: "Wo bist du gewesen?".',
    topic: 'sein / haben'
  },
  {
    id: 'gb-4',
    prompt: 'Wechselpräposition (Wohin? -> Akkusativ):',
    sentence: 'Ich lege das Buch auf ___ Tisch.',
    options: ['den', 'dem', 'das'],
    correctAnswer: 'den',
    explanation: 'Aktion / Richtung (Wohin?): Akkusativ maskulin = auf den Tisch.',
    topic: 'Wechselpräpositionen'
  },
  {
    id: 'gb-5',
    prompt: 'Modalverb (er / sie / es):',
    sentence: 'Er ___ sehr gut Deutsch sprechen.',
    options: ['kann', 'kannst', 'können'],
    correctAnswer: 'kann',
    explanation: '1. und 3. Person Singular haben bei Modalverben keine Endung: er kann.',
    topic: 'Modalverben'
  }
];

interface GrammarBattleGameProps {
  onExit: () => void;
  onRewardXP?: (xp: number) => void;
}

export const GrammarBattleGame: React.FC<GrammarBattleGameProps> = ({ onExit, onRewardXP }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playerHp, setPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'hit' | 'miss' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQ = DUEL_QUESTIONS[currentIdx % DUEL_QUESTIONS.length];

  const handleAnswer = (option: string) => {
    if (feedback !== null || gameOver) return;

    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      setFeedback('hit');
      const damage = 25;
      setBossHp(prev => Math.max(0, prev - damage));
      setScore(s => s + 35);
      setCorrectCount(c => c + 1);
    } else {
      setFeedback('miss');
      const playerDamage = 20;
      setPlayerHp(prev => Math.max(0, prev - playerDamage));
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx + 1 >= DUEL_QUESTIONS.length || bossHp <= 25 || playerHp <= 20) {
        setGameOver(true);
        const xp = isCorrect ? 45 : 20;
        onRewardXP?.(xp);
      } else {
        setCurrentIdx(i => i + 1);
      }
    }, 1200);
  };

  const restart = () => {
    setCurrentIdx(0);
    setPlayerHp(100);
    setBossHp(100);
    setScore(0);
    setCorrectCount(0);
    setFeedback(null);
    setGameOver(false);
  };

  if (gameOver) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = Math.round((correctCount / (currentIdx + 1)) * 100);

    const summaryStats: GameSummaryStats = {
      gameId: 'grammar-battle',
      gameTitle: 'Grammar Battle',
      score,
      highScore: Math.max(score, Number(localStorage.getItem('dq_hs_grammar_battle') || 0)),
      accuracy,
      itemsCount: currentIdx + 1,
      correctCount,
      streakCount: correctCount,
      xpEarned: Math.min(60, correctCount * 12 + 10),
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
          <Swords className="w-4 h-4" />
          <span>Grammatik-Duell</span>
        </span>
        <span className="text-xs font-bold text-slate-400">
          Runde {currentIdx + 1}/{DUEL_QUESTIONS.length}
        </span>
      </div>

      {/* Duel Arena: Player vs Boss Health */}
      <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        {/* Player Stats */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Du</span>
            </span>
            <span className="text-slate-500 font-mono">{playerHp} HP</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${playerHp}%` }}
            />
          </div>
        </div>

        {/* Boss Stats */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
              <Swords className="w-3.5 h-3.5" />
              <span>Grammatik-Drache</span>
            </span>
            <span className="text-slate-500 font-mono">{bossHp} HP</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${bossHp}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Question Box */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center flex flex-col gap-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
          {currentQ.topic}: {currentQ.prompt}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {currentQ.sentence}
        </h3>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-3 gap-3">
        {currentQ.options.map(opt => (
          <button
            key={opt}
            type="button"
            disabled={feedback !== null}
            onClick={() => handleAnswer(opt)}
            className="py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:bg-red-50/40 dark:hover:bg-red-950/30 text-slate-900 dark:text-slate-100 font-black text-lg active:scale-95 shadow-sm transition-all"
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div className={`p-4 rounded-2xl border flex items-center gap-2 text-xs font-bold animate-in fade-in ${
          feedback === 'hit'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
            : 'bg-rose-50 text-rose-800 border-rose-300'
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{currentQ.explanation}</span>
        </div>
      )}
    </div>
  );
};
