export type PhaseNumber = 1 | 2 | 3 | 4;

export interface VocabItem {
  id: string;
  german: string;
  english: string;
  french: string;
  arabicClue?: string | null;
  gender?: 'der' | 'die' | 'das' | null;
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'connector' | 'phrase' | 'number';
  memoryClue?: string | null;
  audioUrl?: string;
}

export interface GrammarRule {
  title: string;
  explanation: string;
  formula?: string | null; // e.g., "Position 1 + Verb + Subjekt + Rest"
  examples: string[];
}

export interface PronunciationNote {
  sound: string;
  rule: string;
  examples: string[];
}

export interface ReviewItem {
  id: string;
  front: string;
  back: string;
  hint?: string;
  arabicClue?: string;
}

import { ExerciseType, MatchingPair } from './learning';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  question: string;
  explanation: string;
  hint?: string;
  options?: string[];
  correctAnswer: string;
  words?: string[]; // for sentence-ordering / syntax-order
  pairs?: MatchingPair[]; // for matching
  imageUrl?: string; // for image-vocab
  imageIcon?: string; // for image-vocab
  audioText?: string; // for listening & pronunciation
  targetText?: string; // for listening & pronunciation
  phoneticGuide?: string; // for pronunciation
  sourceLang?: 'de' | 'en' | 'fr'; // for translation
  targetLang?: 'de' | 'en' | 'fr'; // for translation
  requiredKeywords?: string[]; // for writing
  minWords?: number; // for writing
  sampleSolution?: string; // for writing
}

export interface DayLesson {
  dayNumber: number; // 1 to 30
  dayId: string; // 'day-01'
  title: string;
  goal: string;
  objective?: string; // Explicit objective alias
  explanation?: string; // High-level lesson explanation
  phase: PhaseNumber;
  phaseTitle: string;
  concept: {
    summary: string;
    rules: string[];
    formula?: string | null;
  };
  grammar?: GrammarRule; // Extended structured grammar
  pronunciationNotes?: PronunciationNote[]; // Phonetics & pronunciation
  vocabulary: VocabItem[];
  examples?: string[]; // Model German example sentences
  speakingModel: {
    german: string;
    english: string;
    french: string;
    note: string;
  };
  mnemonicTrick: {
    tip: string;
    warning?: string;
  };
  practiceTask: string;
  dailyChallenge?: string; // Specific daily mission/challenge
  reviewItems?: ReviewItem[]; // Spaced repetition deck items for Leitner review
  completionRequirement?: string; // Specific criteria to pass the day
  exercises: Exercise[];
}
