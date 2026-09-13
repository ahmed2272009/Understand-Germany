import { TextValidationResult, ValidationWarning } from '../types/text-builder';

const COMMON_GERMAN_VERBS = [
  'bin', 'bist', 'ist', 'sind', 'seid', 'war',
  'habe', 'hast', 'hat', 'haben', 'habt', 'hatte',
  'lerne', 'lernst', 'lernt', 'lernen',
  'gehe', 'gehst', 'geht', 'gehen',
  'mache', 'machst', 'macht', 'machen',
  'wohne', 'wohnst', 'wohnt', 'wohnen',
  'komme', 'kommst', 'kommt', 'kommen',
  'kann', 'kannst', 'können', 'könnt',
  'muss', 'musst', 'müssen', 'müsst',
  'will', 'willst', 'wollen', 'wollt',
  'möchte', 'möchtest', 'möchten', 'möchtet',
  'spiele', 'spielst', 'spielt', 'spielen',
  'arbeite', 'arbeitest', 'arbeitet', 'arbeiten',
  'spreche', 'sprichst', 'spricht', 'sprechen',
  'beginnt', 'beginnen', 'begann',
  'höre', 'hörst', 'hört', 'hören',
  'lese', 'liest', 'lesen',
  'koche', 'kochst', 'kocht', 'kochen',
  'heißt', 'heißen',
  'hilft', 'helfen',
  'schaffen', 'schaffe', 'schafft',
  'erreicht'
];

const CONNECTORS = ['und', 'aber', 'oder', 'weil', 'denn', 'deshalb', 'dann', 'auch', 'dass', 'wenn'];

export class TextValidatorEngine {
  static validateEssay(rawText: string, targetLines: number = 20): TextValidationResult {
    const lines = rawText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    const lineCount = lines.length;
    const words = rawText.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    const warnings: ValidationWarning[] = [];
    const connectorsFoundSet = new Set<string>();
    let v2CompliantLines = 0;

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      const lineWords = line.split(/\s+/).filter(w => w.length > 0);

      // Check connectors
      CONNECTORS.forEach(c => {
        if (line.toLowerCase().includes(c)) {
          connectorsFoundSet.add(c);
        }
      });

      // V2 Position Check heuristic:
      // German main clauses place the finite verb in Position 2.
      // Position 1 can be a single word (Ich, Heute), a noun phrase (Meine Schule, Mein bester Freund),
      // or a prepositional phrase (In der Schule, Am Wochenende, In meiner Freizeit, In der Zukunft).
      let hasVerbInPositionTwo = false;
      if (lineWords.length >= 2) {
        // Look within the first 4 words for a finite verb
        const checkLimit = Math.min(lineWords.length, 5);
        for (let i = 1; i < checkLimit; i++) {
          const cleanWord = lineWords[i].toLowerCase().replace(/[^a-zäöüß]/g, '');
          if (COMMON_GERMAN_VERBS.includes(cleanWord)) {
            hasVerbInPositionTwo = true;
            v2CompliantLines++;
            break;
          }
        }

        // Subordinate clause (e.g. weil ...) where verb is sentence-final
        if (!hasVerbInPositionTwo && lineWords[0].toLowerCase().startsWith('weil')) {
          const lastWord = lineWords[lineWords.length - 1].toLowerCase().replace(/[^a-zäöüß]/g, '');
          if (COMMON_GERMAN_VERBS.includes(lastWord)) {
            hasVerbInPositionTwo = true;
            v2CompliantLines++;
          }
        }
      }

      if (!hasVerbInPositionTwo && lineWords.length >= 3) {
        warnings.push({
          line: lineNum,
          type: 'v2-position',
          message: `Prüfe die Verbposition in Zeile ${lineNum}. Im Hauptsatz steht das konjugierte Verb auf Position 2.`
        });
      }
    });

    const hasEnoughLines = lineCount >= targetLines;
    const v2CompliantRatio = lineCount > 0 ? Math.round((v2CompliantLines / lineCount) * 100) : 0;
    
    // Overall score calculation
    let score = 0;
    score += Math.min(50, Math.round((lineCount / targetLines) * 50));
    score += Math.round((v2CompliantRatio / 100) * 30);
    score += Math.min(20, connectorsFoundSet.size * 4);

    return {
      lineCount,
      targetLineCount: targetLines,
      wordCount,
      hasEnoughLines,
      v2CompliantRatio,
      connectorsFound: Array.from(connectorsFoundSet),
      warnings,
      overallScore: Math.min(100, Math.max(0, score))
    };
  }
}
