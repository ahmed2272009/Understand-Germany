import { DayLesson } from '../../core/types/curriculum';

export const day22: DayLesson = {
  dayNumber: 22,
  dayId: 'day-22',
  title: 'Der Dativ: Erste Stufe (dem, der, den)',
  goal: 'Du lernst den Dativ (3. Fall) nach typischen Präpositionen und Verben.',
  objective: 'Die Dativartikel (dem für Maskulin/Neutrum, der für Feminin, den + -n für Plural) nach "mit / helfen" beherrschen.',
  explanation: 'Der Dativ ist der 3. Fall und antwortet auf die Frage "Wem?". Er zeigt meist den indirekten Empfänger einer Handlung (Ich helfe dem Schüler) oder folgt festen Präpositionen wie "mit" (Ich spreche mit der Lehrerin).',
  phase: 4,
  phaseTitle: 'Phase 4: Satzbau & Capstone',
  concept: {
    summary: 'Dativ-Formen: der -> dem, das -> dem, die -> der, Plural -> den (+ n am Nomen).',
    rules: [
      '• Maskulinum & Neutrum teilen sich die Endung -m: der Mann -> dem Mann, das Kind -> dem Kind.',
      '• Femininum wechselt zu -r: die Frau -> der Frau, die Lehrerin -> der Lehrerin.',
      '• Plural wechselt zu den + Nomen-n: die Freunde -> den Freunden, die Kinder -> den Kindern.',
      '• Feste Dativ-Präposition: MIT verlangt IMMER den Dativ!',
      '• Typische Dativ-Verben: helfen (to help), danken (to thank), gefallen (to please).'
    ],
    formula: 'der -> dem | das -> dem | die -> der | Plural: die -> den (+n)'
  },
  grammar: {
    title: 'Die Dativ-Tabelle der bestimmten Artikel',
    explanation: 'Merke dir das Dativ-Kürzel "MRMN" (Maskulin -m, Feminin -r, Neutrum -m, Plural -n): dem, der, dem, den (+n). Der Dativ ist die Königsklasse der deutschen Kasuslehre.',
    formula: 'mit + [dem (m/n) / der (f) / den (pl)]',
    examples: [
      'Ich spreche mit dem Lehrer.',
      'Ich helfe der Schülerin.',
      'Wir spielen mit dem Kind.',
      'Ich danke den Freunden.'
    ]
  },
  pronunciationNotes: [
    { sound: 'dem vs den', rule: 'Lippen schließen bei -m [deːm] | Zunge an den Gaumen bei -n [deːn]', examples: ['dem Mann (m)', 'den Freunden (n)'] }
  ],
  vocabulary: [
    {
      id: 'd22-v1',
      german: 'dem',
      english: 'the (dative masculine & neuter)',
      french: 'au / à la (datif masc./neutre)',
      arabicClue: 'أداة المجرور للمذكر والمحايد',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Dativ maskulin/neutrum: dem'
    },
    {
      id: 'd22-v2',
      german: 'der (Dativ feminin)',
      english: 'the (dative feminine)',
      french: 'à la (datif fém.)',
      arabicClue: 'أداة المجرور للمؤنث',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Feminin im Dativ wird zu "der"'
    },
    {
      id: 'd22-v3',
      german: 'helfen (du hilfst, er hilft)',
      english: 'to help (+ dative)',
      french: 'aider (+ datif)',
      arabicClue: 'يساعد (يأخذ مجرور)',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Dativ-Verb: Ich helfe dir'
    },
    {
      id: 'd22-v4',
      german: 'danken (+ Dativ)',
      english: 'to thank (+ dative)',
      french: 'remercier (+ datif)',
      arabicClue: 'يشكر',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ich danke dem Lehrer'
    },
    {
      id: 'd22-v5',
      german: 'der Lehrer / die Lehrerin',
      english: 'teacher (m / f)',
      french: 'le professeur / l\'enseignante',
      arabicClue: 'أستاذ / أستاذة',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Unterrichtet die Klasse'
    }
  ],
  examples: [
    'Ich spreche jeden Tag mit dem Lehrer.',
    'Kannst du der Schülerin bei den Aufgaben helfen?',
    'Wir danken dem Vater für seine Hilfe.',
    'Ich spiele gerne mit den Kindern im Garten.'
  ],
  speakingModel: {
    german: 'Ich spreche mit dem Lehrer. Ich helfe der Frau. Ich spiele mit dem Kind. Ich danke den Freunden.',
    english: 'I speak with the teacher. I help the woman. I play with the child. I thank the friends.',
    french: 'Je parle avec le professeur. J\'aide la femme. Je joue avec l\'enfant. Je remercie les amis.',
    note: 'Achte auf den Kontrast: mit DEM Mann (m), mit DER Frau (f), mit DEM Kind (n), mit DEN Freunden (pl).'
  },
  mnemonicTrick: {
    tip: 'Merke dir: Nach "mit" gibt es niemals "der" oder "die"! Nach "mit" heißt es immer DEM, DER, DEM, DEN!',
    warning: 'Verwechsle nicht das feminine "der" im Dativ mit dem maskulinen Nominativ: "der Frau" ist hier Dativ feminin!'
  },
  practiceTask: 'Setze nach "mit" den richtigen Dativ-Artikel ein: 1. mit _____ (der) Bus. 2. mit _____ (die) Mutter. 3. mit _____ (das) Auto. 4. mit _____ (die Freunde).',
  dailyChallenge: 'Bilde 3 Dativsätze mit "helfen" oder "mit": "Ich helfe dem...", "Ich spreche mit der...", "Ich fahre mit dem...".',
  reviewItems: [
    { id: 'd22-r1', front: 'Welchen Artikel bekommt ein maskulines Nomen im Dativ?', back: 'dem (der Mann -> dem Mann)' },
    { id: 'd22-r2', front: 'Welchen Artikel bekommt ein feminines Nomen im Dativ?', back: 'der (die Frau -> der Frau)' },
    { id: 'd22-r3', front: 'Welchen Artikel bekommt ein neutrales Nomen im Dativ?', back: 'dem (das Buch -> dem Buch)' },
    { id: 'd22-r4', front: 'Was passiert im Dativ Plural mit dem Nomen?', back: 'Der Artikel wird "den" und das Nomen bekommt meist ein extra "-n" (den Freunden).' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Dativ-Quiz und wende dem/der/den sicher an.',
  exercises: [
    {
      id: 'ex-22-1',
      type: 'multiple-choice',
      prompt: '"Ich spreche nach dem Unterricht mit _____ Lehrerin." Welcher Dativ-Artikel gehört zu "die Lehrerin"?',
      question: 'Wähle die passende Dativ-Form:',
      options: [
        'der',
        'dem',
        'die'
      ],
      correctAnswer: 'der',
      explanation: 'Feminine Nomen ("die Lehrerin") wechseln im Dativ zum Artikel "der": "mit der Lehrerin".'
    },
    {
      id: 'ex-22-2',
      type: 'multiple-choice',
      prompt: '"Mein Bruder hilft _____ Vater bei der Gartenarbeit." Welcher Artikel passt für "der Vater"?',
      question: 'Wähle die richtige Dativ-Form nach "helfen":',
      options: [
        'dem',
        'den',
        'des'
      ],
      correctAnswer: 'dem',
      explanation: 'Das Verb "helfen" verlangt den Dativ. Maskuline Nomen ("der Vater") werden im Dativ zu "dem Vater".'
    },
    {
      id: 'ex-22-3',
      type: 'syntax-order',
      prompt: 'Bringe den Dativsatz in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Ich', 'helfe', 'dem Schüler', 'jeden Tag', 'gerne'],
      correctAnswer: 'Ich helfe dem Schüler jeden Tag gerne',
      explanation: 'Subjekt ("Ich") + Verb ("helfe") + Dativobjekt ("dem Schüler") + Zeit- und Modalangaben.'
    }
  ]
};
