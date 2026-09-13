import { DayLesson } from '../../core/types/curriculum';

export const day15: DayLesson = {
  dayNumber: 15,
  dayId: 'day-15',
  title: 'Verneinung: nicht und kein',
  goal: 'Du lernst, Aussagen präzise mit nicht und kein zu verneinen.',
  objective: 'Den genauen Unterschied zwischen "nicht" (für Verben, Adjektive, Eigennamen) und "kein" (für Nomen mit ein/Nullartikel) beherrschen.',
  explanation: 'Im Deutschen gibt es zwei zentrale Verneinungswörter: 1. "kein / keine": verneint Nomen, die sonst mit "ein" oder ohne Artikel stehen würden. 2. "nicht": verneint Verben, Adjektive, Pronomen, bestimmte Artikel (der/die/das) und ganze Sätze.',
  phase: 3,
  phaseTitle: 'Phase 3: Kasus & Modale',
  concept: {
    summary: 'kein verneint unbestimmte Nomen (kein Buch, keine Zeit). nicht verneint den Rest (nicht müde, lerne nicht).',
    rules: [
      '• Regel für KEIN: Ersetze "ein" durch "k-ein" (Ich habe ein Auto -> Ich habe kein Auto).',
      '• Feminin & Plural: keine (keine Frau, keine Bücher, keine Zeit).',
      '• Regel für NICHT: Verneint Adjektive (nicht müde, nicht gut), Verben (Ich schlafe nicht) und feste Satzteile.',
      '• "nicht" steht oft am Satzende, wenn das gesamte Verb verneint wird: "Ich lerne heute nicht."'
    ],
    formula: 'Nomen mit ein/Nullartikel -> kein/keine | Adjektiv / Verb / bestimmt -> nicht'
  },
  grammar: {
    title: 'Die Systematik der Negation: NICHT vs. KEIN',
    explanation: 'Merke die Daumenregel: Wenn im Englischen "no" oder "not a" steht, nutzt man im Deutschen "kein" (I have no time -> Ich habe keine Zeit). Steht im Englischen "not", nutzt man "nicht" (I am not tired -> Ich bin nicht müde).',
    formula: 'kein + Maskulin/Neutrum | keine + Feminin/Plural | nicht + Adjektiv/Verb',
    examples: [
      'Ich bin nicht müde. (Adjektiv verneint)',
      'Ich habe kein Auto. (Nomen verneint)',
      'Wir haben keine Zeit. (Nomen verneint)',
      'Das ist nicht mein Buch. (Besitzpronomen verneint)'
    ]
  },
  pronunciationNotes: [
    { sound: 'nicht', rule: 'Weicher Ich-Laut [nɪçt] mit kurzem i und t am Ende', examples: ['nicht', 'nichts'] },
    { sound: 'kein', rule: 'Diphthong EI [kaɪ̯n], klingt wie "K-eye-n"', examples: ['kein', 'keine'] }
  ],
  vocabulary: [
    {
      id: 'd15-v1',
      german: 'nicht',
      english: 'not',
      french: 'ne ... pas',
      arabicClue: 'ليس / لا (لنفي الأفعال والصفات)',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Verneint Verben und Adjektive'
    },
    {
      id: 'd15-v2',
      german: 'kein / keine',
      english: 'no / not a',
      french: 'aucun / pas de',
      arabicClue: 'لا يوجد / ليس لديه',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Verneint Nomen (k + ein)'
    },
    {
      id: 'd15-v3',
      german: 'neu',
      english: 'new',
      french: 'nouveau',
      arabicClue: 'جديد',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Das Buch ist nicht neu'
    },
    {
      id: 'd15-v4',
      german: 'schwer / schwierig',
      english: 'heavy / difficult',
      french: 'difficile / lourd',
      arabicClue: 'صعب / ثقيل',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Deutsch ist nicht schwer!'
    },
    {
      id: 'd15-v5',
      german: 'das Geld',
      english: 'money',
      french: 'l’argent',
      arabicClue: 'نقود / مال',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Ich habe kein Geld'
    }
  ],
  examples: [
    'Ich lerne heute nicht, denn ich habe keine Zeit.',
    'Das Buch ist nicht schwierig, es ist sehr leicht.',
    'Wir haben kein Auto, aber zwei Fahrräder.',
    'Er ist nicht mein Lehrer, er ist mein Freund.'
  ],
  speakingModel: {
    german: 'Ich bin nicht müde. Ich habe kein Auto. Das Buch ist nicht neu. Deutsch ist gar nicht schwer!',
    english: 'I am not tired. I have no car. The book is not new. German is not difficult at all!',
    french: 'Je ne suis pas fatigué. Je n\'ai pas de voiture. Le livre n\'est pas nouveau. L\'allemand n\'est pas difficile du tout !',
    note: 'Betone das "nicht" und "kein" deutlich, um den negativen Sinn hervorzuheben.'
  },
  mnemonicTrick: {
    tip: 'Merke dir: "k-ein" ist einfach ein unbestimmter Artikel mit einem "k" davor! Aus "ein Buch" wird "kein Buch". Alles andere verneinst du mit "nicht".',
    warning: 'Sag niemals "Ich habe nicht Buch"! Nomen ohne bestimmten Artikel verlangen immer "kein" ("Ich habe kein Buch").'
  },
  practiceTask: 'Verwandle diese 6 Sätze ins Gegenteil: 1. Ich habe ein Auto. 2. Ich bin müde. 3. Ich habe Zeit. 4. Der Tisch ist groß. 5. Wir lernen heute. 6. Er hat Freunde.',
  dailyChallenge: 'Formuliere 3 Dinge, die du heute NICHT tust, und 3 Dinge, die du NICHT hast.',
  reviewItems: [
    { id: 'd15-r1', front: 'Wann benutzt man "kein" statt "nicht"?', back: 'Wenn man ein Nomen verneint, das sonst mit "ein" oder ohne Artikel stünde.' },
    { id: 'd15-r2', front: 'Wie verneint man "Ich bin müde"?', back: 'Ich bin nicht müde. (Adjektiv -> nicht)' },
    { id: 'd15-r3', front: 'Wie verneint man "Ich habe ein Handy"?', back: 'Ich habe kein Handy. (Nomen mit ein -> kein)' },
    { id: 'd15-r4', front: 'Wie lautet die feminine und Plural-Form von kein?', back: 'keine (z.B. keine Zeit, keine Bücher)' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Negations-Quiz und unterscheide nicht/kein fehlerfrei.',
  exercises: [
    {
      id: 'ex-15-1',
      type: 'multiple-choice',
      prompt: '"Ich habe heute leider _____ Zeit." Was gehört in die Lücke?',
      question: 'Wähle das richtige Verneinungswort:',
      options: [
        'keine',
        'nicht',
        'kein'
      ],
      correctAnswer: 'keine',
      explanation: '"die Zeit" ist ein feminines Nomen, daher verneint man mit "keine".'
    },
    {
      id: 'ex-15-2',
      type: 'multiple-choice',
      prompt: '"Deutsch lernen ist _____ schwer." Welches Wort verneint das Adjektiv?',
      question: 'Wähle das passende Wort:',
      options: [
        'nicht',
        'kein',
        'keine'
      ],
      correctAnswer: 'nicht',
      explanation: 'Adjektive ("schwer") werden im Deutschen immer mit "nicht" verneint.'
    },
    {
      id: 'ex-15-3',
      type: 'syntax-order',
      prompt: 'Bringe den verneinten Satz in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Mein Freund', 'hat', 'heute', 'kein', 'Geld'],
      correctAnswer: 'Mein Freund hat heute kein Geld',
      explanation: 'Subjekt ("Mein Freund") + Verb ("hat") + Zeitangabe + verneintes Objekt ("kein Geld").'
    }
  ]
};
