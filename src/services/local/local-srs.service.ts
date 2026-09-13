import { ISRSStore } from '../../core/ports/srs-store.interface';
import { SRSCard, SRSRating } from '../../core/types/srs';
import { SRSEngine } from '../../core/engines/srs-engine';

const SRS_PREFIX = 'dq_srs_';

export class LocalSRSService implements ISRSStore {
  async getAllCards(userId: string): Promise<SRSCard[]> {
    const raw = localStorage.getItem(SRS_PREFIX + userId);
    if (!raw) {
      // Seed initial cards from Day 1 & 2
      const seed: SRSCard[] = [
        {
          cardId: 'srs-1',
          userId,
          daySource: 1,
          german: 'das Wasser',
          english: 'water',
          french: 'eau',
          arabicClue: 'ماء',
          gender: 'das',
          partOfSpeech: 'noun',
          box: 1,
          intervalDays: 1,
          easeFactor: 2.5,
          repetitionCount: 0,
          nextReviewDate: new Date().toISOString().split('T')[0],
          lastReviewedAt: null,
        },
        {
          cardId: 'srs-2',
          userId,
          daySource: 1,
          german: 'die Schule',
          english: 'school',
          french: 'école',
          arabicClue: 'مدرسة',
          gender: 'die',
          partOfSpeech: 'noun',
          box: 1,
          intervalDays: 1,
          easeFactor: 2.5,
          repetitionCount: 0,
          nextReviewDate: new Date().toISOString().split('T')[0],
          lastReviewedAt: null,
        },
        {
          cardId: 'srs-3',
          userId,
          daySource: 6,
          german: 'heute',
          english: 'today',
          french: 'aujourd’hui',
          arabicClue: 'اليوم',
          partOfSpeech: 'phrase',
          box: 2,
          intervalDays: 3,
          easeFactor: 2.5,
          repetitionCount: 1,
          nextReviewDate: new Date().toISOString().split('T')[0],
          lastReviewedAt: null,
        }
      ];
      localStorage.setItem(SRS_PREFIX + userId, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  }

  async getDueCards(userId: string, targetDate?: string): Promise<SRSCard[]> {
    const cards = await this.getAllCards(userId);
    const date = targetDate || new Date().toISOString().split('T')[0];
    return cards.filter(c => c.nextReviewDate <= date);
  }

  async enrollCards(userId: string, newCards: any[]): Promise<void> {
    const existing = await this.getAllCards(userId);
    const existingGermans = new Set(existing.map(c => c.german.toLowerCase()));

    const toAdd: SRSCard[] = newCards
      .filter(c => !existingGermans.has(c.german.toLowerCase()))
      .map(c => ({
        ...c,
        cardId: 'srs-' + Math.random().toString(36).substring(2, 9),
        userId,
        box: 1,
        intervalDays: 1,
        easeFactor: 2.5,
        repetitionCount: 0,
        nextReviewDate: new Date().toISOString().split('T')[0],
        lastReviewedAt: null,
      }));

    const combined = [...existing, ...toAdd];
    localStorage.setItem(SRS_PREFIX + userId, JSON.stringify(combined));
  }

  async rateCard(userId: string, cardId: string, rating: SRSRating): Promise<SRSCard> {
    const cards = await this.getAllCards(userId);
    const card = cards.find(c => c.cardId === cardId);
    if (!card) throw new Error(`Card ${cardId} not found`);

    const result = SRSEngine.computeNextReview(card.box, card.easeFactor, card.repetitionCount, rating);
    card.box = result.nextBox;
    card.intervalDays = result.intervalDays;
    card.easeFactor = result.newEaseFactor;
    card.nextReviewDate = result.nextReviewDate;
    card.repetitionCount += 1;
    card.lastReviewedAt = new Date().toISOString();

    localStorage.setItem(SRS_PREFIX + userId, JSON.stringify(cards));
    return card;
  }
}
