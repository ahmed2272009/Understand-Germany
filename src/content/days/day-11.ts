import { DayLesson } from '../../core/types/curriculum';

export const day11: DayLesson = {
  dayNumber: 11,
  dayId: 'day-11',
  title: 'Ein und eine (Unbestimmte Artikel)',
  goal: 'Du lernst, unbestimmte Dinge und Personen mit ein und eine zu benennen.',
  objective: 'Die unbestimmten Artikel im Nominativ (ein für Maskulinum & Neutrum, eine für Femininum) sicher anwenden.',
  explanation: 'Wenn man von einer Sache zum ersten Mal spricht oder sie unbestimmt ist (a / an), benutzt man "ein" oder "eine". Im Plural gibt es im Deutschen KEINEN unbestimmten Artikel (Nullartikel).',
  phase: 2,
  phaseTitle: 'Phase 2: Bausteine & Nomen',
  concept: {
    summary: 'ein = maskulin & neutrum (ein Tisch, ein Buch). eine = feminin (eine Schule). Kein Artikel im Plural!',
    rules: [
      '• der Mann -> ein Mann (maskulin: ein).',
      '• das Kind -> ein Kind (neutrum: ein).',
      '• die Frau -> eine Frau (feminin: eine).',
      '• Plural: Bücher -> "Ich habe Bücher" (KEIN unbestimmter Artikel im Plural!).',
      '• Verneinung von ein/eine erfolgt mit kein/keine (ein -> kein, eine -> keine).'
    ],
    formula: 'ein + Maskulinum/Neutrum | eine + Femininum | Ø + Plural'
  },
  grammar: {
    title: 'Das System der unbestimmten Artikel im Nominativ',
    explanation: 'Beachte die Symmetrie: Maskulinum und Neutrum teilen sich im Nominativ die Form "ein". Nur das Femininum bekommt das zusätzliche "-e": "eine".',
    formula: 'der -> ein | das -> ein | die -> eine | Plural -> Ø',
    examples: [
      'Das ist ein Tisch.',
      'Dort steht eine Schule.',
      'Hier liegt ein Buch.',
      'Wir haben Stühle und Tische im Raum (Nullartikel).'
    ]
  },
  pronunciationNotes: [
    { sound: 'ein vs eine', rule: 'ein [aɪ̯n] endet mit kurzem n | eine [ˈaɪ̯nə] hat ein unbetontes Schwa-e am Ende', examples: ['ein Tisch', 'eine Tasche'] }
  ],
  vocabulary: [
    {
      id: 'd11-v1',
      german: 'ein',
      english: 'a / an (masculine & neuter)',
      french: 'un',
      arabicClue: 'أداة تنكير للمذكر والمحايد',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'ein Mann, ein Buch'
    },
    {
      id: 'd11-v2',
      german: 'eine',
      english: 'a / an (feminine)',
      french: 'une',
      arabicClue: 'أداة تنكير للمؤنث',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'eine Frau, eine Schule'
    },
    {
      id: 'd11-v3',
      german: 'der Stift',
      english: 'pen / pencil',
      french: 'le stylo / crayon',
      arabicClue: 'قلم',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'ein Stift zum Schreiben'
    },
    {
      id: 'd11-v4',
      german: 'die Lampe',
      english: 'lamp',
      french: 'la lampe',
      arabicClue: 'مصباح',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'eine helle Lampe'
    },
    {
      id: 'd11-v5',
      german: 'das Fenster',
      english: 'window',
      french: 'la fenêtre',
      arabicClue: 'نافذة',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'ein großes Fenster'
    }
  ],
  examples: [
    'Ich habe einen Stift und ein Heft.',
    'Dort drüben steht ein Schüler.',
    'Das Klassenzimmer hat ein großes Fenster und eine Tür.',
    'Ich brauche eine neue Tasche.'
  ],
  speakingModel: {
    german: 'Ich habe ein Buch. Ich habe eine Tasche. Ich habe ein Auto. Im Zimmer stehen Tische.',
    english: 'I have a book. I have a bag. I have a car. In the room there are tables.',
    french: 'J\'ai un livre. J\'ai un sac. J\'ai une voiture. Dans la pièce il y a des tables.',
    note: 'Achte darauf, im Plural niemals "ein" zu verwenden: Nicht "ein Bücher", sondern einfach "Bücher"!'
  },
  mnemonicTrick: {
    tip: 'Merke: "die" endet auf -e -> "eine" endet auf -e! "der" und "das" haben kein -e am Ende -> "ein".',
    warning: 'Im Plural gibt es im Deutschen kein "des" wie im Französischen. Aus "ein Buch" wird im Plural einfach "Bücher"!'
  },
  practiceTask: 'Wähle 10 Gegenstände in deinem Raum und setze entweder "ein" oder "eine" davor.',
  dailyChallenge: 'Beschreibe dein Zimmer in 4 Sätzen mit "Hier ist ein...", "Dort ist eine...", "Hier sind...".',
  reviewItems: [
    { id: 'd11-r1', front: 'Welcher unbestimmte Artikel gehört zu maskulinen Nomen (der)?', back: 'ein (z.B. ein Tisch)' },
    { id: 'd11-r2', front: 'Welcher unbestimmte Artikel gehört zu sächlichen Nomen (das)?', back: 'ein (z.B. ein Buch)' },
    { id: 'd11-r3', front: 'Welcher unbestimmte Artikel gehört zu weiblichen Nomen (die)?', back: 'eine (z.B. eine Schule)' },
    { id: 'd11-r4', front: 'Wie lautet der unbestimmte Artikel im Plural?', back: 'Es gibt keinen! Man nennt das Nullartikel (z.B. "Ich habe Bücher").' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Quiz und setze ein/eine fehlerfrei vor Nomen ein.',
  exercises: [
    {
      id: 'ex-11-1',
      type: 'multiple-choice',
      prompt: '"Dort drüben steht _____ Stuhl." Welcher Artikel passt für "der Stuhl"?',
      question: 'Wähle den richtigen unbestimmten Artikel:',
      options: [
        'ein',
        'eine',
        'eines'
      ],
      correctAnswer: 'ein',
      explanation: '"der Stuhl" ist maskulin, daher ist der unbestimmte Artikel "ein".'
    },
    {
      id: 'ex-11-2',
      type: 'multiple-choice',
      prompt: '"Ich habe _____ Tasche für die Schule." Welcher Artikel gehört zu "die Tasche"?',
      question: 'Wähle die passende Form:',
      options: [
        'eine',
        'ein',
        'einer'
      ],
      correctAnswer: 'eine',
      explanation: '"die Tasche" ist feminin, daher heißt es "eine Tasche".'
    },
    {
      id: 'ex-11-3',
      type: 'syntax-order',
      prompt: 'Ordne die Wörter zu einem vollständigen Satz:',
      question: 'Bringe die Wörter in die richtige Reihenfolge:',
      words: ['Hier', 'liegt', 'ein', 'neues', 'Buch'],
      correctAnswer: 'Hier liegt ein neues Buch',
      explanation: 'Position 1: "Hier", Position 2: Verb "liegt", gefolgt vom Subjekt "ein neues Buch".'
    }
  ]
};
