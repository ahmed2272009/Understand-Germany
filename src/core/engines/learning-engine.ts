import { Exercise, DayLesson } from '../types/curriculum';
import { DayCompletion } from '../types/progress';
import {
  EvaluationResult,
  LessonSubmissionPayload,
  LessonValidationResult,
  MatchingPair
} from '../types/learning';

/**
 * Text normalizer for German and cross-language comparisons.
 * Preserves essential German umlauts (ä, ö, ü, ß) while trimming punctuation and multiple spaces.
 */
export function normalizeGermanText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“»«]/g, '')
    .replace(/\s+/g, ' ');
}

export function normalizeStandard(text: string): string {
  if (!text) return '';
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

export class LearningEngine {
  /**
   * Evaluates any of the 10 exercise types deterministically.
   */
  static evaluateExercise(exercise: Exercise, userAnswer: any): EvaluationResult {
    const rawAnswer = userAnswer !== undefined && userAnswer !== null ? String(userAnswer).trim() : '';

    switch (exercise.type) {
      // 1. Multiple Choice
      case 'multiple-choice': {
        const isCorrect = normalizeStandard(rawAnswer) === normalizeStandard(exercise.correctAnswer);
        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? 'Richtig! Ausgezeichnet gewählt.'
            : `Nicht ganz. Die richtige Antwort lautet: "${exercise.correctAnswer}".`,
          correctAnswerDisplay: exercise.correctAnswer,
          userAnswerDisplay: rawAnswer || '(keine Auswahl)'
        };
      }

      // 2. Fill in the Blank
      case 'fill-in': {
        const normUser = normalizeGermanText(rawAnswer);
        const acceptableAnswers = Array.isArray(exercise.correctAnswer)
          ? exercise.correctAnswer.map(normalizeGermanText)
          : [normalizeGermanText(exercise.correctAnswer)];

        const isCorrect = acceptableAnswers.includes(normUser);
        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? 'Perfekt eingesetzt!'
            : `Falsch eingesetzt. Richtig ist: "${exercise.correctAnswer}".`,
          correctAnswerDisplay: String(exercise.correctAnswer),
          userAnswerDisplay: rawAnswer || '(leer)'
        };
      }

      // 3. Sentence Ordering (and syntax-order alias)
      case 'sentence-ordering':
      case 'syntax-order': {
        let assembled = '';
        if (Array.isArray(userAnswer)) {
          assembled = userAnswer.join(' ');
        } else {
          assembled = rawAnswer;
        }

        const normUser = normalizeGermanText(assembled);
        const normCorrect = normalizeGermanText(exercise.correctAnswer);
        const isCorrect = normUser === normCorrect;

        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? 'Wunderbar! Die Satzstruktur stimmt genau.'
            : `Reihenfolge nicht korrekt. Richtig: "${exercise.correctAnswer}".`,
          correctAnswerDisplay: exercise.correctAnswer,
          userAnswerDisplay: assembled || '(keine Wörter angeordnet)'
        };
      }

      // 4. Translation
      case 'translation': {
        const normUser = normalizeGermanText(rawAnswer);
        const acceptable = Array.isArray(exercise.correctAnswer)
          ? exercise.correctAnswer.map(normalizeGermanText)
          : [normalizeGermanText(exercise.correctAnswer)];

        const isCorrect = acceptable.some(ans => ans === normUser);
        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? 'Klasse Übersetzung!'
            : `Nicht exakt übersetzt. Richtig ist: "${exercise.correctAnswer}".`,
          correctAnswerDisplay: String(exercise.correctAnswer),
          userAnswerDisplay: rawAnswer || '(keine Übersetzung eingegeben)'
        };
      }

      // 5. Article Selection (der, die, das)
      case 'article-select': {
        const normUser = normalizeStandard(rawAnswer);
        const normCorrect = normalizeStandard(exercise.correctAnswer);
        const isCorrect = normUser === normCorrect;

        const genderLabel = normCorrect === 'der' ? 'maskulin (der)' : normCorrect === 'die' ? 'feminin (die)' : 'neutral (das)';
        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? `Richtig! Das Nomen ist ${genderLabel}.`
            : `Falscher Artikel. Das Nomen ist ${genderLabel}: "${exercise.correctAnswer}".`,
          correctAnswerDisplay: exercise.correctAnswer,
          userAnswerDisplay: rawAnswer || '(kein Artikel gewählt)'
        };
      }

      // 6. Matching (Pairs)
      case 'matching': {
        // userAnswer should be Record<string, string> or array of pairs
        const pairs: MatchingPair[] = exercise.pairs || [];
        let totalPairs = pairs.length;
        if (totalPairs === 0) {
          totalPairs = 1;
        }

        let correctMatches = 0;
        if (typeof userAnswer === 'object' && userAnswer !== null) {
          pairs.forEach(p => {
            const matchedRight = (userAnswer as Record<string, string>)[p.left] || (userAnswer as Record<string, string>)[p.id];
            if (matchedRight && normalizeStandard(matchedRight) === normalizeStandard(p.right)) {
              correctMatches++;
            }
          });
        }

        const isCorrect = correctMatches === totalPairs;
        const score = totalPairs > 0 ? correctMatches / totalPairs : 0;
        const pairStrings = pairs.map(p => `${p.left} ↔ ${p.right}`).join(', ');

        return {
          isCorrect,
          score,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? 'Alle Wortpaare perfekt zugeordnet!'
            : `${correctMatches} von ${totalPairs} Paaren korrekt zugeordnet. Paare: ${pairStrings}.`,
          correctAnswerDisplay: pairStrings,
          userAnswerDisplay: typeof userAnswer === 'object' ? JSON.stringify(userAnswer) : rawAnswer
        };
      }

      // 7. Image Vocabulary
      case 'image-vocab': {
        const normUser = normalizeGermanText(rawAnswer);
        const normCorrect = normalizeGermanText(exercise.correctAnswer);
        const isCorrect = normUser === normCorrect;

        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? 'Richtig erkannt!'
            : `Falsch. Das gesuchte Wort ist: "${exercise.correctAnswer}".`,
          correctAnswerDisplay: exercise.correctAnswer,
          userAnswerDisplay: rawAnswer || '(nichts eingegeben)'
        };
      }

      // 8. Listening
      case 'listening': {
        const normUser = normalizeGermanText(rawAnswer);
        const target = exercise.audioText || exercise.correctAnswer;
        const normCorrect = normalizeGermanText(exercise.correctAnswer);
        const isCorrect = normUser === normCorrect || (normUser === normalizeGermanText(target));

        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? 'Hervorragend herausgehört!'
            : `Nicht richtig gehört. Gesprochen wurde: "${exercise.correctAnswer}".`,
          correctAnswerDisplay: exercise.correctAnswer,
          userAnswerDisplay: rawAnswer || '(nichts eingegeben)'
        };
      }

      // 9. Writing (sentence composition or guided text)
      case 'writing': {
        const words = rawAnswer.split(/\s+/).filter(Boolean);
        const minWords = exercise.minWords || 3;
        const normUser = normalizeGermanText(rawAnswer);
        const requiredKeywords = exercise.requiredKeywords || [];

        // Check required keywords
        const missingKeywords = requiredKeywords.filter(
          kw => !normUser.includes(normalizeGermanText(kw))
        );

        const meetsLength = words.length >= minWords;
        const keywordsPresent = missingKeywords.length === 0;

        // If specific sample solution or exact answer is provided
        const matchesExact = normalizeGermanText(exercise.correctAnswer) === normUser;
        const isCorrect = (meetsLength && keywordsPresent) || matchesExact;

        let feedback = '';
        if (isCorrect) {
          feedback = 'Sehr gut formuliert! Alle Anforderungen erfüllt.';
        } else if (!meetsLength) {
          feedback = `Dein Text ist zu kurz (${words.length}/${minWords} Wörter).`;
        } else if (!keywordsPresent) {
          feedback = `Folgende Schlüsselwörter fehlen: ${missingKeywords.join(', ')}.`;
        } else {
          feedback = `Bitte orientiere dich an der Musterlösung: "${exercise.sampleSolution || exercise.correctAnswer}".`;
        }

        return {
          isCorrect,
          score: isCorrect ? 1 : (meetsLength ? 0.5 : 0),
          explanation: exercise.explanation,
          feedback,
          correctAnswerDisplay: exercise.sampleSolution || exercise.correctAnswer,
          userAnswerDisplay: rawAnswer || '(kein Text verfasst)'
        };
      }

      // 10. Pronunciation (speech recognition / shadowing check)
      case 'pronunciation': {
        const normUser = normalizeGermanText(rawAnswer);
        const target = exercise.targetText || exercise.correctAnswer;
        const normCorrect = normalizeGermanText(target);
        const isCorrect = normUser === normCorrect || normUser.length > 0;

        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect
            ? 'Starke Aussprache! Phonetik gut getroffen.'
            : `Achte auf die korrekte Aussprache: "${target}" ${exercise.phoneticGuide ? `[${exercise.phoneticGuide}]` : ''}.`,
          correctAnswerDisplay: `${target} ${exercise.phoneticGuide ? `[${exercise.phoneticGuide}]` : ''}`,
          userAnswerDisplay: rawAnswer || '(keine Aufnahme/Aussprache geprüft)'
        };
      }

      default: {
        const isCorrect = normalizeStandard(rawAnswer) === normalizeStandard(exercise.correctAnswer);
        return {
          isCorrect,
          score: isCorrect ? 1 : 0,
          explanation: exercise.explanation,
          feedback: isCorrect ? 'Richtig!' : `Falsch. Richtig: "${exercise.correctAnswer}".`,
          correctAnswerDisplay: exercise.correctAnswer,
          userAnswerDisplay: rawAnswer
        };
      }
    }
  }

  /**
   * Server-side reward validation and anti-duplicate defense.
   * NEVER trust client-sent XP numbers!
   * The server/engine parses authentic curriculum exercises, grades answers, and computes XP.
   */
  static validateAndAwardLessonCompletion(
    lesson: DayLesson,
    payload: LessonSubmissionPayload,
    previousCompletions: Record<string, DayCompletion>,
    processedSubmissionTokens: Set<string>,
    currentTotalXp: number
  ): LessonValidationResult {
    // 1. Idempotency Check (Prevent duplicate submissions / replay attacks)
    if (processedSubmissionTokens.has(payload.submissionToken)) {
      const existing = previousCompletions[payload.dayId];
      return {
        success: true,
        dayId: payload.dayId,
        dayNumber: payload.dayNumber,
        scorePercentage: existing?.scorePercentage || 100,
        passed: existing?.passed || true,
        xpEarned: 0, // 0 XP for duplicate replay!
        newTotalXp: currentTotalXp,
        isDuplicate: true,
        message: 'Duplicate submission token detected. Reward already claimed.',
        results: {}
      };
    }

    // 2. Server-side Grading
    const results: Record<string, EvaluationResult> = {};
    let totalScore = 0;
    const totalExercises = lesson.exercises.length || 1;

    for (const ex of lesson.exercises) {
      const ans = payload.answers[ex.id];
      const evalRes = this.evaluateExercise(ex, ans);
      results[ex.id] = evalRes;
      totalScore += evalRes.score;
    }

    const scorePercentage = Math.round((totalScore / totalExercises) * 100);
    const passed = scorePercentage >= 75; // Standard passing bar

    // 3. Server-side XP Calculation
    let xpEarned = 0;
    const existingCompletion = previousCompletions[payload.dayId];
    const isFirstTime = !existingCompletion || !existingCompletion.passed;

    if (!passed) {
      // Consolation XP for effort
      xpEarned = 10;
    } else if (isFirstTime) {
      // First time completion: 50 XP base
      xpEarned = 50;
      // Bonuses for excellence
      if (scorePercentage === 100) {
        xpEarned += 25; // Perfect score bonus
      } else if (scorePercentage >= 90) {
        xpEarned += 15; // High score bonus
      }
    } else {
      // Repeat review practice
      xpEarned = 15;
      if (scorePercentage === 100) {
        xpEarned += 10;
      }
    }

    const newTotalXp = currentTotalXp + xpEarned;

    // Record submission token in processed set
    processedSubmissionTokens.add(payload.submissionToken);

    const completionRecord: DayCompletion = {
      dayId: payload.dayId,
      dayNumber: payload.dayNumber,
      scorePercentage,
      xpEarned,
      timeSpentSeconds: payload.timeSpentSeconds || 60,
      passed,
      attemptsCount: (existingCompletion?.attemptsCount || 0) + 1,
      completedAt: new Date().toISOString()
    };

    return {
      success: true,
      dayId: payload.dayId,
      dayNumber: payload.dayNumber,
      scorePercentage,
      passed,
      xpEarned,
      newTotalXp,
      isDuplicate: false,
      message: passed
        ? `Lektion erfolgreich gemeistert! +${xpEarned} XP vergeben.`
        : `Lektion noch nicht bestanden (${scorePercentage}%). Wiederhole die Übungen für volle XP.`,
      results,
      completionRecord
    };
  }
}
