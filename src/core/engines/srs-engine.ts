import { SRSRating } from '../types/srs';

export class SRSEngine {
  static computeNextReview(
    box: number,
    easeFactor: number,
    _repetitionCount: number,
    rating: SRSRating
  ): { nextBox: number; intervalDays: number; newEaseFactor: number; nextReviewDate: string } {
    let nextBox = box;
    let intervalDays = 1;
    let newEaseFactor = easeFactor;

    if (rating === 1) { // Again (Failed)
      nextBox = 1;
      intervalDays = 1;
      newEaseFactor = Math.max(1.3, easeFactor - 0.2);
    } else { // Hard (2), Good (3), Easy (4)
      if (rating === 2) {
        newEaseFactor = Math.max(1.3, easeFactor - 0.15);
        nextBox = Math.max(1, box);
      } else if (rating === 3) {
        nextBox = Math.min(5, box + 1);
      } else if (rating === 4) {
        newEaseFactor = easeFactor + 0.15;
        nextBox = Math.min(5, box + 2);
      }

      // Interval calculation
      const boxIntervals = [1, 1, 3, 7, 14, 30];
      intervalDays = boxIntervals[nextBox] || 30;
      if (rating === 4) intervalDays = Math.round(intervalDays * 1.3);
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    const nextReviewDate = nextDate.toISOString().split('T')[0];

    return {
      nextBox,
      intervalDays,
      newEaseFactor: Math.round(newEaseFactor * 100) / 100,
      nextReviewDate
    };
  }
}
