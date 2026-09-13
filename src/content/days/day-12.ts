import { DayLesson } from '../../core/types/curriculum';

export const day12: DayLesson = {
  dayNumber: 12,
  dayId: 'day-12',
  title: 'Pluralformen der Nomen',
  goal: 'Du erkennst die wichtigsten Pluralmuster im Deutschen und lernst Nomen immer mit Plural.',
  objective: 'Die 5 typischen Pluralendungen (-e, -(e)n, -er, -s, -Ø) und den Umlautwechsel (a->ä, o->ö, u->ü) beherrschen.',
  explanation: 'Im Gegensatz zu Englisch (-s) oder Französisch (-s) gibt es im Deutschen 5 verschiedene Pluralmuster, oft kombiniert mit Umlaut. Alle Nomen im Plural haben im Nominativ denselben bestimmten Artikel: DIE.',
  phase: 2,
  phaseTitle: 'Phase 2: Bausteine & Nomen',
  concept: {
    summary: 'Alle Plural-Nomen haben den Artikel DIE. 5 Hauptmuster: -e, -(e)n, -er (+Umlaut), -s, keine Endung (-Ø).',
    rules: [
      '• Muster 1 (-e, oft mit Umlaut): der Tag -> die Tage, der Stuhl -> die Stühle.',
      '• Muster 2 (-(e)n, typisch feminin): die Frau -> die Frauen, die Schule -> die Schulen.',
      '• Muster 3 (-er, fast immer mit Umlaut): das Kind -> die Kinder, das Buch -> die Bücher.',
      '• Muster 4 (-s, Fremdwörter & Abkürzungen): das Auto -> die Autos, das Handy -> die Handys.',
      '• Muster 5 (-Ø, keine Endung, oft mit Umlaut): der Lehrer -> die Lehrer, der Vater -> die Väter.',
      '• Regel: Lerne jedes Wort als Dreiklang: der Tisch, die Tische.'
    ],
    formula: 'Singular: der/die/das + Nomen -> Plural: IMMER die + Pluralform'
  },
  grammar: {
    title: 'Die 5 Pluralmuster der deutschen Sprache',
    explanation: 'Fast alle femininen Nomen bilden den Plural auf -(e)n (90%). Neutrale Einsilbler bilden den Plural oft auf -er mit Umlaut (Buch -> Bücher, Bild -> Bilder). Maskuline Nomen bilden häufig die Endung -e (Tag -> Tage).',
    formula: 'der Tag -> die Tage | die Frau -> die Frauen | das Buch -> die Bücher | das Auto -> die Autos',
    examples: [
      'Ich habe ein Buch. -> Ich habe viele Bücher.',
      'Der Tisch ist besetzt. -> Die Tische sind besetzt.',
      'Die Schule ist neu. -> Die Schulen sind modern.',
      'Das Auto fährt schnell. -> Die Autos fahren schnell.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Umlaut im Plural', rule: 'a wird zu ä [ɛ:], o zu ö [ø:], u zu ü [y:]', examples: ['Buch -> Bücher', 'Stuhl -> Stühle', 'Hand -> Hände'] },
    { sound: 'en am Ende', rule: 'Das e wird kaum gesprochen, n silbisch [fʁaʊ̯ən] / [fʁaʊ̯n]', examples: ['Frauen', 'Schulen'] }
  ],
  vocabulary: [
    {
      id: 'd12-v1',
      german: 'das Buch, die Bücher',
      english: 'book, books',
      french: 'le livre, les livres',
      arabicClue: 'كتاب / كتب (جمع بتغيير الحركات)',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Umlaut u->ü + -er: Bücher'
    },
    {
      id: 'd12-v2',
      german: 'der Tag, die Tage',
      english: 'day, days',
      french: 'le jour, les jours',
      arabicClue: 'يوم / أيام',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Endung -e: die Tage'
    },
    {
      id: 'd12-v3',
      german: 'die Frau, die Frauen',
      english: 'woman, women',
      french: 'la femme, les femmes',
      arabicClue: 'امرأة / نساء',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Feminin auf -en: die Frauen'
    },
    {
      id: 'd12-v4',
      german: 'das Kind, die Kinder',
      english: 'child, children',
      french: 'l’enfant, les enfants',
      arabicClue: 'طفل / أطفال',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Neutrum auf -er: die Kinder'
    },
    {
      id: 'd12-v5',
      german: 'das Auto, die Autos',
      english: 'car, cars',
      french: 'la voiture, les voitures',
      arabicClue: 'سيارة / سيارات',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Endung auf Vokal -> Plural auf -s: Autos'
    },
    {
      id: 'd12-v6',
      german: 'der Freund, die Freunde',
      english: 'friend, friends',
      french: 'l’ami, les amis',
      arabicClue: 'صديق / أصدقاء',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Endung -e: die Freunde'
    }
  ],
  examples: [
    'Wir haben viele Bücher im Klassenzimmer.',
    'Die Tage im Sommer sind lang und warm.',
    'Drei Schüler und zwei Schülerinnen sprechen Deutsch.',
    'Die Kinder spielen draußen mit ihren Freunden.'
  ],
  speakingModel: {
    german: 'Ich habe ein Buch. Ich habe zwei Bücher. Hier stehen Tische und Stühle. Wir sind gute Freunde.',
    english: 'I have a book. I have two books. Here are tables and chairs. We are good friends.',
    french: 'J\'ai un livre. J\'ai deux livres. Ici il y a des tables et des chaises. Nous sommes de bons amis.',
    note: 'Übe bewusst den Sprung von Singular zu Plural mit verändertem Vokal.'
  },
  mnemonicTrick: {
    tip: 'Merke dir: Alle Nomen haben im Plural denselben Artikel: DIE. Wenn du ein Nomen lernst, sage immer: "der Tisch, die Tische"!',
    warning: 'Hänge nicht einfach an jedes deutsche Wort ein "-s"! Das "-s" gilt fast nur für moderne Lehnwörter (Autos, Handys, Fotos).'
  },
  practiceTask: 'Bilde die Pluralformen zu: das Haus, die Stadt, der Apfel, das Heft, der Schüler, die Lampe.',
  dailyChallenge: 'Zähle laut 5 Gegenstände in deiner Wohnung im Plural auf (z.B. zwei Handys, drei Bücher, vier Stühle).',
  reviewItems: [
    { id: 'd12-r1', front: 'Welcher Artikel steht vor allen deutschen Pluralnomen?', back: 'die (z.B. die Bücher, die Tische, die Frauen)' },
    { id: 'd12-r2', front: 'Wie lautet der Plural von "das Buch"?', back: 'die Bücher (mit Umlaut ü und Endung -er)' },
    { id: 'd12-r3', front: 'Wie lautet der Plural von "das Auto"?', back: 'die Autos (mit Endung -s)' },
    { id: 'd12-r4', front: 'Wie bilden die meisten femininen Nomen (die) ihren Plural?', back: 'Auf -(e)n (z.B. die Schule -> die Schulen, die Frau -> die Frauen)' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Plural-Quiz und bilde die 5 Pluraltypen fehlerfrei.',
  exercises: [
    {
      id: 'ex-12-1',
      type: 'multiple-choice',
      prompt: 'Wie lautet der korrekte Plural von "das Buch"?',
      question: 'Wähle die richtige Pluralform:',
      options: [
        'die Bücher',
        'die Buchs',
        'die Buchen'
      ],
      correctAnswer: 'die Bücher',
      explanation: '"das Buch" bildet den Plural mit Umlaut und Endung -er: "die Bücher".'
    },
    {
      id: 'ex-12-2',
      type: 'multiple-choice',
      prompt: 'Wie lautet der Plural von "die Schule"?',
      question: 'Wähle die passende Pluralform:',
      options: [
        'die Schulen',
        'die Schuler',
        'die Schules'
      ],
      correctAnswer: 'die Schulen',
      explanation: 'Feminine Nomen auf -e bilden den Plural fast immer mit einem zusätzlichen -n: "die Schulen".'
    },
    {
      id: 'ex-12-3',
      type: 'syntax-order',
      prompt: 'Bringe die Wörter zum Plural-Satz zusammen:',
      question: 'Ordne die Wörter:',
      words: ['Zwei Schüler', 'lesen', 'zusammen', 'viele', 'Bücher'],
      correctAnswer: 'Zwei Schüler lesen zusammen viele Bücher',
      explanation: 'Subjekt im Plural ("Zwei Schüler") verlangt die Verbendung -en ("lesen").'
    }
  ]
};
