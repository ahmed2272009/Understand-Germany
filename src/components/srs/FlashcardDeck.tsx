import React, { useState, useEffect } from 'react';
import { SRSCard, SRSRating } from '../../core/types/srs';
import { useServices } from '../../context/ServiceContext';
import { useAuth } from '../../context/AuthContext';
import { Volume2, RotateCw } from 'lucide-react';

export const FlashcardDeck: React.FC = () => {
  const { srsStore } = useServices();
  const { user } = useAuth();
  const [cards, setCards] = useState<SRSCard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    srsStore.getDueCards(user.uid).then((res) => {
      setCards(res);
      setLoading(false);
    });
  }, [user, srsStore]);

  const currentCard = cards[currentIdx];

  const handleRate = async (rating: SRSRating) => {
    if (!user || !currentCard) return;
    await srsStore.rateCard(user.uid, currentCard.cardId, rating);
    setIsFlipped(false);
    if (currentIdx + 1 < cards.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCards([]); // Finished queue!
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      window.speechSynthesis.speak(u);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-400">Lade Wiederholungskarten...</div>;
  }

  if (!currentCard || cards.length === 0) {
    return (
      <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center gap-3 shadow-md">
        <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center text-2xl">
          ✓
        </div>
        <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
          Alles wiederholt!
        </h3>
        <p className="text-xs text-slate-500 max-w-xs">
          Keine Karten mehr fällig für heute. Dein Langzeitgedächtnis ist optimal trainiert.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-400">
        <span>Karte {currentIdx + 1} von {cards.length}</span>
        <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 px-2 py-0.5 rounded-full font-mono">
          Leitner Box {currentCard.box}/5
        </span>
      </div>

      {/* 3D-Like Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`min-h-[220px] p-6 rounded-3xl cursor-pointer border transition-all flex flex-col items-center justify-center text-center shadow-lg relative ${
          isFlipped
            ? 'bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-700'
            : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="absolute top-4 right-4 text-slate-400 text-xs flex items-center gap-1">
          <RotateCw className="w-3.5 h-3.5" />
          <span className="text-[10px]">Tippen zum Umdrehen</span>
        </div>

        {!isFlipped ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-black">{currentCard.german}</span>
            {currentCard.gender && (
              <span className={`text-[10px] font-black px-2 py-0.5 rounded text-white ${
                currentCard.gender === 'der' ? 'bg-sky-600' : currentCard.gender === 'die' ? 'bg-rose-500' : 'bg-amber-500'
              }`}>
                {currentCard.gender}
              </span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); speak(currentCard.german); }}
              className="mt-2 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-slate-900"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 animate-in fade-in">
            <span className="text-xl font-black text-indigo-200">{currentCard.english}</span>
            <span className="text-sm font-semibold text-slate-300">🇫🇷 {currentCard.french}</span>
            {currentCard.arabicClue && (
              <span className="text-sm font-semibold text-amber-300 font-sans">
                💡 {currentCard.arabicClue}
              </span>
            )}
          </div>
        )}
      </div>

      {/* SRS Rating Bar */}
      {isFlipped && (
        <div className="grid grid-cols-4 gap-2 animate-in slide-in-from-bottom-2">
          <button
            onClick={() => handleRate(1)}
            className="py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md"
          >
            Nochmal
          </button>
          <button
            onClick={() => handleRate(2)}
            className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md"
          >
            Schwer
          </button>
          <button
            onClick={() => handleRate(3)}
            className="py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md"
          >
            Gut
          </button>
          <button
            onClick={() => handleRate(4)}
            className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
          >
            Einfach
          </button>
        </div>
      )}
    </div>
  );
};
