import { DayLesson } from '../../core/types/curriculum';

export const day07: DayLesson = {
  dayNumber: 7,
  dayId: 'day-07',
  title: 'Fragewörter und Fragen (W-Fragen & Ja/Nein-Fragen)',
  goal: 'Du lernst, gezielt Informationen zu erfragen und Ja/Nein-Entscheidungsfragen zu stellen.',
  objective: 'W-Fragen mit den 7 Fragewörtern (wer, was, wo, wann, warum, wie, woher/wohin) und Ja/Nein-Fragen mit Verb auf Position 1 bilden.',
  explanation: 'Im Deutschen gibt es zwei Hauptarten von Fragen: 1. W-Fragen: Fragewort auf Position 1, konjugiertes Verb auf Position 2. 2. Ja/Nein-Fragen: Das konjugierte Verb steht direkt auf Position 1!',
  phase: 1,
  phaseTitle: 'Phase 1: Das Fundament',
  concept: {
    summary: 'wer = who, was = what, wo = where, wann = when, warum = why, wie = how, woher = where from, wohin = where to.',
    rules: [
      '• W-Frage Struktur: W-Wort (Pos 1) + finites Verb (Pos 2) + Subjekt (Pos 3) + Rest? (z.B. "Wo wohnst du?")',
      '• Ja/Nein-Frage Struktur: Finites Verb (Pos 1) + Subjekt (Pos 2) + Rest? (z.B. "Lernst du Deutsch?")',
      '• "Wer" fragt nach Personen (Subjekt), "Was" nach Dingen/Aktivitäten.',
      '• "Wo" = Ort (statisch), "Wohin" = Richtung (Akkusativ), "Woher" = Herkunft (Dativ).'
    ],
    formula: 'W-Frage: W-Wort + Verb + Subjekt? | Ja/Nein-Frage: Verb + Subjekt + Rest?'
  },
  grammar: {
    title: 'Fragesatzbau im Deutschen',
    explanation: 'Während im Englischen Hilfsverben wie "do/does" nötig sind ("Do you learn German?"), dreht das Deutsche einfach Verb und Subjekt um: "Lernst du Deutsch?". Das finite Verb steht bei Ja/Nein-Fragen immer an allererster Stelle.',
    formula: 'Verb (Pos 1) + Subjekt (Pos 2) + Ergänzung?',
    examples: [
      'Wie heißt du? - Ich heiße Alex.',
      'Woher kommst du? - Ich komme aus Tunesien.',
      'Bist du Schüler? - Ja, ich bin Schüler.',
      'Hast du heute Zeit? - Nein, leider nicht.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Fragemelodie (Ja/Nein)', rule: 'Bei Ja/Nein-Fragen steigt die Satzmelodie am Ende deutlich an ↗', examples: ['Kommst du mit? ↗', 'Hast du Zeit? ↗'] },
    { sound: 'Fragemelodie (W-Frage)', rule: 'Bei W-Fragen fällt die Intonation am Ende meist leicht ab ↘', examples: ['Wo wohnst du? ↘', 'Wie heißt du? ↘'] }
  ],
  vocabulary: [
    {
      id: 'd7-v1',
      german: 'wer',
      english: 'who',
      french: 'qui',
      arabicClue: 'مَن',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Fragt nach Personen: Wer ist das?'
    },
    {
      id: 'd7-v2',
      german: 'was',
      english: 'what',
      french: 'quoi / que',
      arabicClue: 'ماذا / ما',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Fragt nach Dingen: Was machst du?'
    },
    {
      id: 'd7-v3',
      german: 'wo',
      english: 'where',
      french: 'où',
      arabicClue: 'أين',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Fragt nach dem Ort: Wo bist du?'
    },
    {
      id: 'd7-v4',
      german: 'wann',
      english: 'when',
      french: 'quand',
      arabicClue: 'متى',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Fragt nach der Zeit: Wann beginnt die Schule?'
    },
    {
      id: 'd7-v5',
      german: 'warum',
      english: 'why',
      french: 'pourquoi',
      arabicClue: 'لماذا',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Fragt nach dem Grund: Warum Deutsch?'
    },
    {
      id: 'd7-v6',
      german: 'wie',
      english: 'how',
      french: 'comment',
      arabicClue: 'كيف',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Fragt nach der Art: Wie geht es dir?'
    },
    {
      id: 'd7-v7',
      german: 'woher',
      english: 'where from',
      french: 'd’où',
      arabicClue: 'من أين',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Fragt nach Herkunft: Woher kommst du?'
    }
  ],
  examples: [
    'Wie heißt du und wie alt bist du?',
    'Wo wohnst du jetzt?',
    'Warum lernst du die deutsche Sprache?',
    'Sprichst du auch Französisch und Englisch?',
    'Verstehst du diesen Text?'
  ],
  speakingModel: {
    german: 'Wie heißt du? Wo wohnst du? Was machst du heute? Warum lernst du Deutsch?',
    english: 'What is your name? Where do you live? What are you doing today? Why are you learning German?',
    french: 'Comment t\'appelles-tu ? Où habites-tu ? Que fais-tu aujourd\'hui ? Pourquoi apprends-tu l\'allemand ?',
    note: 'Übe die Fragen mit natürlicher Betonung auf dem Fragewort und dem Verb.'
  },
  mnemonicTrick: {
    tip: 'Merke: "Woher" = HER zu mir (Woher kommst du?). "Wohin" = HIN von mir weg (Wohin gehst du?). Bei Ja/Nein-Fragen springt das Verb auf Platz 1!',
    warning: 'Verwechsle nicht "wer" (who) und "wo" (where)! Im Deutschen ist "wer" = who, "wo" = where.'
  },
  practiceTask: 'Schreibe 6 W-Fragen und 4 Ja/Nein-Fragen auf und beantworte jede Frage in einem vollständigen deutschen Satz.',
  dailyChallenge: 'Führe ein kurzes Interview mit einem Lernpartner oder vor dem Spiegel: Stelle 5 Fragen und antworte fließend.',
  reviewItems: [
    { id: 'd7-r1', front: 'Welches Fragewort bedeutet "where" auf Deutsch?', back: 'wo' },
    { id: 'd7-r2', front: 'Welches Fragewort bedeutet "who" auf Deutsch?', back: 'wer' },
    { id: 'd7-r3', front: 'Wo steht das Verb bei einer Ja/Nein-Frage?', back: 'Auf Position 1 (z.B. "Kommst du heute?")' },
    { id: 'd7-r4', front: 'Wo steht das Verb bei einer W-Frage?', back: 'Auf Position 2, direkt nach dem W-Wort.' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Fragen-Quiz und meistere Phase 1: Das Fundament!',
  exercises: [
    {
      id: 'ex-7-1',
      type: 'multiple-choice',
      prompt: 'Du möchtest wissen, woher jemand kommt. Welche Frage ist grammatikalisch korrekt?',
      question: 'Wähle die richtige Frage:',
      options: [
        'Woher kommst du?',
        'Woher du kommst?',
        'Kommst woher du?'
      ],
      correctAnswer: 'Woher kommst du?',
      explanation: 'W-Wort ("Woher") auf Position 1, finites Verb ("kommst") auf Position 2, Subjekt ("du") auf Position 3.'
    },
    {
      id: 'ex-7-2',
      type: 'multiple-choice',
      prompt: 'Wie formuliert man die Aussage "Du bist Schüler" als Ja/Nein-Frage?',
      question: 'Wähle die korrekte Frage:',
      options: [
        'Bist du Schüler?',
        'Du bist Schüler?',
        'Schüler bist du?'
      ],
      correctAnswer: 'Bist du Schüler?',
      explanation: 'Bei einer Ja/Nein-Entscheidungsfrage wandert das finite Verb ("Bist") an die allererste Satzstelle.'
    },
    {
      id: 'ex-7-3',
      type: 'syntax-order',
      prompt: 'Bringe die Wörter zu einer korrekten W-Frage zusammen:',
      question: 'Ordne die Wörter:',
      words: ['Warum', 'lernst', 'du', 'jeden', 'Tag', 'Deutsch'],
      correctAnswer: 'Warum lernst du jeden Tag Deutsch',
      explanation: 'Fragewort "Warum" (Pos 1), Verb "lernst" (Pos 2), Subjekt "du" (Pos 3).'
    }
  ]
};
