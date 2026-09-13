import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { ISRSStore } from '../../core/ports/srs-store.interface';
import { SRSCard, SRSRating } from '../../core/types/srs';
import { getFirebaseDb, isFirebaseConfigured } from './firebase-config';
import { LocalSRSService } from '../local/local-srs.service';

export class FirestoreSRSService implements ISRSStore {
  private localFallback = new LocalSRSService();

  async getDueCards(userId: string, targetDate?: string): Promise<SRSCard[]> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.getDueCards(userId, targetDate);
    }
    try {
      const db = getFirebaseDb();
      const colRef = collection(db, 'users', userId, 'srs_cards');
      const snap = await getDocs(colRef);
      const cards: SRSCard[] = [];
      const today = targetDate || new Date().toISOString().split('T')[0];
      snap.forEach(d => {
        const c = d.data() as SRSCard;
        if (c.nextReviewDate <= today) {
          cards.push(c);
        }
      });
      return cards.length > 0 ? cards : this.localFallback.getDueCards(userId, targetDate);
    } catch (e) {
      console.warn('Firestore getDueCards fallback to local:', e);
      return this.localFallback.getDueCards(userId, targetDate);
    }
  }

  async getAllCards(userId: string): Promise<SRSCard[]> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.getAllCards(userId);
    }
    try {
      const db = getFirebaseDb();
      const colRef = collection(db, 'users', userId, 'srs_cards');
      const snap = await getDocs(colRef);
      const cards: SRSCard[] = [];
      snap.forEach(d => cards.push(d.data() as SRSCard));
      return cards.length > 0 ? cards : this.localFallback.getAllCards(userId);
    } catch (e) {
      console.warn('Firestore getAllCards fallback to local:', e);
      return this.localFallback.getAllCards(userId);
    }
  }

  async enrollCards(
    userId: string,
    cards: Omit<SRSCard, 'cardId' | 'userId' | 'box' | 'intervalDays' | 'easeFactor' | 'repetitionCount' | 'nextReviewDate' | 'lastReviewedAt'>[]
  ): Promise<void> {
    await this.localFallback.enrollCards(userId, cards);
    if (isFirebaseConfigured()) {
      try {
        const db = getFirebaseDb();
        const all = await this.localFallback.getAllCards(userId);
        for (const c of all) {
          await setDoc(doc(db, 'users', userId, 'srs_cards', c.cardId), c, { merge: true });
        }
      } catch (e) {
        console.warn('Firestore enrollCards sync error:', e);
      }
    }
  }

  async rateCard(userId: string, cardId: string, rating: SRSRating): Promise<SRSCard> {
    const updated = await this.localFallback.rateCard(userId, cardId, rating);
    if (isFirebaseConfigured()) {
      try {
        const db = getFirebaseDb();
        await setDoc(doc(db, 'users', userId, 'srs_cards', cardId), updated, { merge: true });
      } catch (e) {
        console.warn('Firestore rateCard sync error:', e);
      }
    }
    return updated;
  }
}
