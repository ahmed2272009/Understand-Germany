import React, { useState, useEffect } from 'react';
import { IMAGE_VOCAB_ITEMS } from '../../content/image-vocab';
import { GameSummary } from './GameSummary';
import { GameSummaryStats } from '../../core/types/image-vocab';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';

interface CardItem {
  id: string; // unique card id
  pairId: string;
  type: 'german' | 'translation';
  label: string;
  subLabel?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryCardsGameProps {
  onExit: () => void;
  onRewardXP?: (xp: number) => void;
}

export const MemoryCardsGame: React.FC<MemoryCardsGameProps> = ({ onExit, onRewardXP }) => {
  const PAIRS_COUNT = 6; // 12 cards total (6 pairs)
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());

  // Initialize deck
  useEffect(() => {
    setupNewGame();
  }, []);

  const setupNewGame = () => {
    const picked = [...IMAGE_VOCAB_ITEMS].sort(() => 0.5 - Math.random()).slice(0, PAIRS_COUNT);
    const deck: CardItem[] = [];

    picked.forEach((item) => {
      // German card
      deck.push({
        id: `de-${item.id}`,
        pairId: item.id,
        type: 'german',
        label: `${item.article} ${item.german}`,
        subLabel: item.plural,
        isFlipped: false,
        isMatched: false
      });
      // Translation card
      deck.push({
        id: `tr-${item.id}`,
        pairId: item.id,
        type: 'translation',
        label: item.english,
        subLabel: item.arabic,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle deck
    setCards(deck.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
  };

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || selectedCards.length >= 2) {
      return;
    }

    // Flip card
    const updated = [...cards];
    updated[index].isFlipped = true;
    setCards(updated);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newSelected;
      const firstCard = updated[firstIdx];
      const secondCard = updated[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        setTimeout(() => {
          setCards(prev => {
            const next = [...prev];
            next[firstIdx].isMatched = true;
            next[secondIdx].isMatched = true;
            return next;
          });
          setSelectedCards([]);
          setMatches(m => {
            const nextM = m + 1;
            if (nextM >= PAIRS_COUNT) {
              setGameOver(true);
              const xp = Math.max(15, 50 - moves * 2);
              onRewardXP?.(xp);
            }
            return nextM;
          });
        }, 500);
      } else {
        // Not matched -> Flip back
        setTimeout(() => {
          setCards(prev => {
            const next = [...prev];
            next[firstIdx].isFlipped = false;
            next[secondIdx].isFlipped = false;
            return next;
          });
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  if (gameOver) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const score = Math.max(50, 200 - moves * 8);
    const accuracy = Math.round((PAIRS_COUNT / Math.max(PAIRS_COUNT, moves)) * 100);

    const summaryStats: GameSummaryStats = {
      gameId: 'memory-cards',
      gameTitle: 'Memory Cards',
      score,
      highScore: Math.max(score, Number(localStorage.getItem('dq_hs_memory') || 0)),
      accuracy,
      itemsCount: moves,
      correctCount: PAIRS_COUNT,
      streakCount: PAIRS_COUNT,
      xpEarned: Math.min(50, Math.floor(score / 5)),
      timeSpentSeconds: timeSpent
    };

    return (
      <GameSummary
        stats={summaryStats}
        onPlayAgain={setupNewGame}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-6 max-w-xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>3D Memory Cards</span>
        </span>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">
            Züge: {moves}
          </span>
          <div className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            <Trophy className="w-3.5 h-3.5" />
            <span>Paare: {matches}/{PAIRS_COUNT}</span>
          </div>
        </div>
      </div>

      {/* Grid of 12 Cards (3x4 or 4x3) */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 perspective-1000">
        {cards.map((card, idx) => {
          const isFlipped = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-28 rounded-2xl cursor-pointer transition-all duration-500 transform-style-3d relative select-none ${
                isFlipped ? 'rotate-y-180' : 'hover:-translate-y-1 hover:shadow-lg'
              } ${card.isMatched ? 'opacity-60 pointer-events-none' : ''}`}
            >
              {/* Card Back (Faced Down) */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex flex-col items-center justify-center border border-indigo-400/40 shadow-md backface-hidden">
                <span className="text-2xl font-black opacity-80">DQ</span>
                <span className="text-[10px] font-mono tracking-widest opacity-60 mt-0.5">QUEST</span>
              </div>

              {/* Card Front (Faced Up) */}
              <div
                className={`absolute inset-0 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden border-2 shadow-md ${
                  card.isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                    : card.type === 'german'
                    ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 text-sky-900 dark:text-sky-100'
                    : 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-100'
                }`}
              >
                <span className="text-xs md:text-sm font-black tracking-tight leading-tight line-clamp-2">
                  {card.label}
                </span>
                {card.subLabel && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1 line-clamp-1">
                    {card.subLabel}
                  </span>
                )}
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 mt-1">
                  {card.type === 'german' ? 'DE' : 'EN/AR'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={setupNewGame}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Neu mischen</span>
        </button>

        <span className="text-xs text-slate-400 italic">
          Finde die zusammengehörigen Wortpaare!
        </span>
      </div>
    </div>
  );
};
