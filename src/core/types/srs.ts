export type SRSRating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface SRSCard {
  cardId: string;
  userId: string;
  daySource: number;
  german: string;
  english: string;
  french: string;
  arabicClue?: string;
  gender?: 'der' | 'die' | 'das';
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'connector' | 'phrase';
  box: number; // 1 to 5 (Leitner)
  intervalDays: number;
  easeFactor: number; // default 2.5
  repetitionCount: number;
  nextReviewDate: string; // YYYY-MM-DD
  lastReviewedAt: string | null;
}
