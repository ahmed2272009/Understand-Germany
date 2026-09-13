import React, { useState } from 'react';
import { GameSummary } from './GameSummary';
import { GameSummaryStats } from '../../core/types/image-vocab';
import { Sparkles, Trophy, RotateCcw, Volume2, CheckCircle2, ArrowRight } from 'lucide-react';

interface SentenceChallenge {
  id: string;
  targetSentence: string;
  translation: string;
  ruleHint: string;
  words: string[];
}

const SENTENCE_CHALLENGES: SentenceChallenge[] = [
  {
    id: 'sb-1',
    targetSentence: 'Ich lerne jeden Tag Deutsch.',
    translation: 'I learn German every day.',
    ruleHint: 'V2-Regel: Das finite Verb "lerne" steht immer an Position 2.',
    words: ['Ich', 'lerne', 'jeden', 'Tag', 'Deutsch.']
  },
  {
    id: 'sb-2',
    targetSentence: 'Heute fahre ich nach Berlin.',
    translation: 'Today I drive to Berlin.',
    ruleHint: 'Inversion: Steht die Zeitangabe auf Position 1, folgt sofort das Verb auf Position 2.',
    words: ['Heute', 'fahre', 'ich', 'nach', 'Berlin.']
  },
  {
    id: 'sb-3',
    targetSentence: 'Wir können heute Abend Pizza essen.',
    translation: 'We can eat pizza tonight.',
    ruleHint: 'Satzklammer: Modalverb "können" an Pos. 2, Infinitiv "essen" am Satzende.',
    words: ['Wir', 'können', 'heute', 'Abend', 'Pizza', 'essen.']
  },
  {
    id: 'sb-4',
    targetSentence: 'Er bleibt zu Hause, weil er krank ist.',
    translation: 'He stays at home because he is sick.',
    ruleHint: 'Nebensatz mit "weil": Das konjugierte Verb "ist" wandert ans absolute Satzende.',
    words: ['Er', 'bleibt', 'zu', 'Hause,', 'weil', 'er', 'krank', 'ist.']
  },
  {
    id: 'sb-5',
    targetSentence: 'Hast du das neue Buch gelesen?',
    translation: 'Have you read the new book?',
    ruleHint: 'Ja/Nein-Frage: Das Hilfsverb steht auf Position 1, Partizip II am Ende.',
    words: ['Hast', 'du', 'das', 'neue', 'Buch', 'gelesen?']
  }
];

interface SentenceBuilderGameProps {
  onExit: () => void;
  onRewardXP?: (xp: number) => void;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({ onExit, onRewardXP }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    return [...SENTENCE_CHALLENGES[0].words].sort(() => 0.5 - Math.random());
  });
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());

  const current = SENTENCE_CHALLENGES[currentIdx];

  const handleWordClick = (word: string, indexInAvailable: number) => {
    if (isSubmitted) return;
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, idx) => idx !== indexInAvailable));
  };

  const handleRemoveWord = (indexInSelected: number) => {
    if (isSubmitted) return;
    const word = selectedWords[indexInSelected];
    setSelectedWords(prev => prev.filter((_, idx) => idx !== indexInSelected));
    setAvailableWords(prev => [...prev, word]);
  };

  const resetCurrentChallenge = () => {
    setSelectedWords([]);
    setAvailableWords([...current.words].sort(() => 0.5 - Math.random()));
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const checkSentence = () => {
    const userBuilt = selectedWords.join(' ');
    const correct = userBuilt === current.targetSentence;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      setScore(s => s + 30);
      setCorrectCount(c => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 >= SENTENCE_CHALLENGES.length) {
      setGameOver(true);
      const xp = Math.min(50, (correctCount + (isCorrect ? 1 : 0)) * 10);
      onRewardXP?.(xp);
    } else {
      const nextChallenge = SENTENCE_CHALLENGES[currentIdx + 1];
      setCurrentIdx(i => i + 1);
      setSelectedWords([]);
      setAvailableWords([...nextChallenge.words].sort(() => 0.5 - Math.random()));
      setIsSubmitted(false);
      setIsCorrect(false);
    }
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(current.targetSentence);
      u.lang = 'de-DE';
      window.speechSynthesis.speak(u);
    }
  };

  if (gameOver) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = Math.round((correctCount / SENTENCE_CHALLENGES.length) * 100);
    const summaryStats: GameSummaryStats = {
      gameId: 'sentence-builder',
      gameTitle: 'Sentence Builder',
      score,
      highScore: Math.max(score, Number(localStorage.getItem('dq_hs_sentence_builder') || 0)),
      accuracy,
      itemsCount: SENTENCE_CHALLENGES.length,
      correctCount,
      streakCount: correctCount,
      xpEarned: Math.min(50, correctCount * 10),
      timeSpentSeconds: timeSpent
    };

    return (
      <GameSummary
        stats={summaryStats}
        onPlayAgain={() => {
          setCurrentIdx(0);
          setScore(0);
          setCorrectCount(0);
          setGameOver(false);
          resetCurrentChallenge();
        }}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-6 max-w-xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Satz-Bauer Sprint</span>
        </span>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">
            Satz {currentIdx + 1}/{SENTENCE_CHALLENGES.length}
          </span>
          <div className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            <Trophy className="w-3.5 h-3.5" />
            <span>{score} Pkt</span>
          </div>
        </div>
      </div>

      {/* Target Meaning Box */}
      <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 flex flex-col gap-1 text-center">
        <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
          Bilde diesen Satz auf Deutsch:
        </span>
        <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
          "{current.translation}"
        </h3>
      </div>

      {/* Sentence Building Slots */}
      <div className="min-h-[72px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-2">
        {selectedWords.length === 0 ? (
          <span className="text-xs text-slate-400 italic px-2">
            Klicke auf die Wort-Bausteine unten, um den Satz zu bauen...
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              type="button"
              disabled={isSubmitted}
              onClick={() => handleRemoveWord(idx)}
              className="px-3 py-2 rounded-xl bg-purple-600 text-white font-black text-xs md:text-sm shadow-md hover:bg-purple-700 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>{word}</span>
              {!isSubmitted && <span className="text-[10px] opacity-70">×</span>}
            </button>
          ))
        )}
      </div>

      {/* Available Scrambled Words */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {availableWords.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            type="button"
            disabled={isSubmitted}
            onClick={() => handleWordClick(word, idx)}
            className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs md:text-sm shadow-sm hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/40 active:scale-95 transition-all"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Explanation & Validation Card */}
      {isSubmitted && (
        <div className={`p-4 rounded-2xl border animate-in fade-in flex flex-col gap-2 ${
          isCorrect
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-100'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-black text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCorrect ? 'Perfekt gebaut! +30 Pkt' : 'Fast! Hier ist die richtige Syntax:'}</span>
            </div>
            <button
              type="button"
              onClick={speak}
              className="p-1 rounded-lg bg-white dark:bg-slate-800 shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-sm font-black">
            {current.targetSentence}
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            💡 {current.ruleHint}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={resetCurrentChallenge}
          disabled={isSubmitted && isCorrect}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Zurücksetzen</span>
        </button>

        {!isSubmitted ? (
          <button
            type="button"
            disabled={selectedWords.length === 0}
            onClick={checkSentence}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-xs md:text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>Prüfen</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>Nächster Satz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
