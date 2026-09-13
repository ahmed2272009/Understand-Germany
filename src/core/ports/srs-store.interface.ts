import { SRSCard, SRSRating } from '../types/srs';

export interface ISRSStore {
  getDueCards(userId: string, targetDate?: string): Promise<SRSCard[]>;
  getAllCards(userId: string): Promise<SRSCard[]>;
  enrollCards(userId: string, cards: Omit<SRSCard, 'cardId' | 'userId' | 'box' | 'intervalDays' | 'easeFactor' | 'repetitionCount' | 'nextReviewDate' | 'lastReviewedAt'>[]): Promise<void>;
  rateCard(userId: string, cardId: string, rating: SRSRating): Promise<SRSCard>;
}
