export type Article = 'der' | 'die' | 'das';

export interface ImageVocabItem {
  id: string;
  german: string;
  article: Article;
  plural: string;
  english: string;
  french: string;
  arabic: string;
  imageSvg: string; // inline SVG markup or data URI
  audio: string; // German pronunciation string
  exampleSentence: string;
  exampleTranslation: {
    english: string;
    french: string;
    arabic: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lesson: number; // 1 to 30
  category: 'object' | 'home' | 'technology' | 'transport' | 'nature' | 'food' | 'people';
}

export interface ImageExercise {
  id: string;
  vocabId: string;
  question: string; // e.g. "Was ist das?"
  imageSvg: string;
  options: string[]; // e.g. ["der Tisch", "das Buch", "die Schule"]
  correctAnswer: string; // e.g. "das Buch"
  explanation: {
    word: string; // e.g. "das Buch"
    plural: string; // e.g. "die Bücher"
    exampleSentence: string; // e.g. "Ich lese ein Buch."
    english: string; // "book"
    french: string; // "le livre"
    arabic: string; // "كتاب"
  };
}

export type GameId =
  | 'word-rush'
  | 'article-master'
  | 'sentence-builder'
  | 'memory-cards'
  | 'listening-match'
  | 'grammar-battle'
  | 'picture-quiz'
  | 'twenty-line';

export interface GameSummaryStats {
  gameId: GameId;
  gameTitle: string;
  score: number;
  highScore: number;
  accuracy: number; // 0 to 100
  itemsCount: number;
  correctCount: number;
  streakCount: number;
  xpEarned: number;
  timeSpentSeconds: number;
}
