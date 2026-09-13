import React, { useState } from 'react';
import { GameCard } from '../components/ui/GameCard';
import { WordRushGame } from '../components/games/WordRushGame';
import { ArticleMasterGame } from '../components/games/ArticleMasterGame';
import { SentenceBuilderGame } from '../components/games/SentenceBuilderGame';
import { MemoryCardsGame } from '../components/games/MemoryCardsGame';
import { ListeningMatchGame } from '../components/games/ListeningMatchGame';
import { GrammarBattleGame } from '../components/games/GrammarBattleGame';
import { PictureQuizGame } from '../components/games/PictureQuizGame';
import { TwentyLineChallengeGame } from '../components/games/TwentyLineChallengeGame';
import { VisualVocabCard } from '../components/ui/VisualVocabCard';
import { IMAGE_VOCAB_ITEMS } from '../content/image-vocab';
import { useProgress } from '../context/ProgressContext';
import { Gamepad2, ArrowLeft, Sparkles } from 'lucide-react';

export type GameKey =
  | 'hub'
  | 'word-rush'
  | 'article-master'
  | 'sentence-builder'
  | 'memory-cards'
  | 'listening-match'
  | 'grammar-battle'
  | 'picture-quiz'
  | 'twenty-line'
  | 'vocab-gallery';

export const GamesPage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameKey>('hub');
  const { processActivity } = useProgress();

  const handleRewardXP = (xp: number) => {
    if (xp <= 0) return;
    processActivity({
      type: 'exercise_answer',
      userId: 'current-user',
      activityToken: `game-reward-${Date.now()}`,
      metadata: {
        isCorrect: true,
        gameRewardXp: xp
      }
    }).catch(console.error);
  };

  const renderActiveGame = () => {
    switch (activeGame) {
      case 'word-rush':
        return <WordRushGame onExit={() => setActiveGame('hub')} onRewardXP={handleRewardXP} />;
      case 'article-master':
        return <ArticleMasterGame onExit={() => setActiveGame('hub')} onRewardXP={handleRewardXP} />;
      case 'sentence-builder':
        return <SentenceBuilderGame onExit={() => setActiveGame('hub')} onRewardXP={handleRewardXP} />;
      case 'memory-cards':
        return <MemoryCardsGame onExit={() => setActiveGame('hub')} onRewardXP={handleRewardXP} />;
      case 'listening-match':
        return <ListeningMatchGame onExit={() => setActiveGame('hub')} onRewardXP={handleRewardXP} />;
      case 'grammar-battle':
        return <GrammarBattleGame onExit={() => setActiveGame('hub')} onRewardXP={handleRewardXP} />;
      case 'picture-quiz':
        return <PictureQuizGame onExit={() => setActiveGame('hub')} onRewardXP={handleRewardXP} />;
      case 'twenty-line':
        return <TwentyLineChallengeGame onExit={() => setActiveGame('hub')} onRewardXP={handleRewardXP} />;
      case 'vocab-gallery':
        return (
          <div className="flex flex-col gap-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Bild-Wortschatz Galerie
                </h2>
                <p className="text-xs text-slate-500">
                  Entdecke Gegenstände mit Audio, Plural & trilingualer Übersetzung.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveGame('picture-quiz')}
                className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>Quiz starten</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {IMAGE_VOCAB_ITEMS.map((item) => (
                <VisualVocabCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto p-4 md:p-6 pb-24">
      {/* If a game or gallery is active */}
      {activeGame !== 'hub' ? (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <button
            type="button"
            onClick={() => setActiveGame('hub')}
            className="self-start px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Spielhalle</span>
          </button>
          {renderActiveGame()}
        </div>
      ) : (
        /* Arcade Hub Overview */
        <>
          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">
                DeutschQuest Spielhalle
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Lerne mit Spaß & Tempo
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              8 abwechslungsreiche Lernspiele verstärken Vokabular, Artikel, Satzbau und Grammatik.
            </p>
          </div>

          {/* Featured Game: Article Master */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 p-6 text-white shadow-xl shadow-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider w-max">
                🔥 Arcade-Klassiker
              </span>
              <h2 className="text-2xl font-black">Article Master: der, die, das</h2>
              <p className="text-amber-100 text-xs md:text-sm max-w-md">
                Sortiere deutsche Nomen in Höchstgeschwindigkeit nach ihrem grammatikalischen Geschlecht.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveGame('article-master')}
              className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-black text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <span>Jetzt spielen</span>
              <Gamepad2 className="w-4 h-4 text-amber-500" />
            </button>
          </div>

          {/* Quick Access to Visual Vocabulary Gallery */}
          <div className="p-4 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                🖼️
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Visuelle Bild-Vokabelkarten
                </h3>
                <p className="text-xs text-slate-500">
                  Buch, Tisch, Stuhl, Haus, Auto, Handy, Computer & mehr mit Audio.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveGame('vocab-gallery')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs font-black hover:bg-emerald-50 dark:hover:bg-emerald-950/50 shadow-sm transition-all whitespace-nowrap"
            >
              Galerie öffnen
            </button>
          </div>

          {/* All 8 Games Grid */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
              Alle 8 Lern-Spiele
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
              {/* 1. Word Rush */}
              <GameCard
                title="Word Rush"
                subtitle="Temporeicher 45s Vokabelsprint gegen die Uhr."
                badge="⚡"
                difficulty="Mittel"
                highScore={280}
                onClick={() => setActiveGame('word-rush')}
              />

              {/* 2. Article Master */}
              <GameCard
                title="Article Master"
                subtitle="der, die oder das blitzschnell zuordnen."
                badge="🎯"
                difficulty="Leicht"
                highScore={240}
                onClick={() => setActiveGame('article-master')}
              />

              {/* 3. Sentence Builder */}
              <GameCard
                title="Sentence Builder"
                subtitle="Deutsche Sätze mit V2-Syntax zusammenbauen."
                badge="🧱"
                difficulty="Mittel"
                highScore={180}
                onClick={() => setActiveGame('sentence-builder')}
              />

              {/* 4. Memory Cards */}
              <GameCard
                title="Memory Cards"
                subtitle="3D Paarfinder für Wortpaare & Pluralformen."
                badge="🃏"
                difficulty="Leicht"
                highScore={150}
                onClick={() => setActiveGame('memory-cards')}
              />

              {/* 5. Listening Match */}
              <GameCard
                title="Listening Match"
                subtitle="Höre die Aussprache und wähle das richtige Wort."
                badge="🎧"
                difficulty="Mittel"
                highScore={160}
                onClick={() => setActiveGame('listening-match')}
              />

              {/* 6. Grammar Battle */}
              <GameCard
                title="Grammar Battle"
                subtitle="Duelliere dich mit Akkusativ, Dativ & Verben."
                badge="⚔️"
                difficulty="Schwer"
                highScore={210}
                onClick={() => setActiveGame('grammar-battle')}
              />

              {/* 7. Picture Quiz */}
              <GameCard
                title="Picture Quiz"
                subtitle="Was ist das? Bild-Erkennung & Beispielsätze."
                badge="🖼️"
                difficulty="Leicht"
                highScore={200}
                onClick={() => setActiveGame('picture-quiz')}
              />

              {/* 8. 20 Line Challenge */}
              <GameCard
                title="20 Line Challenge"
                subtitle="Schreibe deinen zusammenhängenden 20-Zeilen Text."
                badge="📜"
                difficulty="Schwer"
                highScore={500}
                onClick={() => setActiveGame('twenty-line')}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
