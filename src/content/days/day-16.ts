import { DayLesson } from '../../core/types/curriculum';

export const day16: DayLesson = {
  dayNumber: 16,
  dayId: 'day-16',
  title: 'Der Akkusativ (Das direkte Objekt)',
  goal: 'Du meisterst den Akkusativ und lernst die maskuline Veränderung: der -> den, ein -> einen.',
  objective: 'Den Akkusativ als Fall des direkten Objekts (Frage: Wen oder Was?) verstehen und maskuline Nomen (den/einen/keinen) fehlerfrei anwenden.',
  explanation: 'Der Akkusativ ist der 4. Fall im Deutschen und markiert das Ziel einer Handlung (das direkte Objekt). Das Geniale: Nur das Maskulinum verändert seine Form! Feminin, Neutrum und Plural bleiben unverändert.',
  phase: 3,
  phaseTitle: 'Phase 3: Kasus & Modale',
  concept: {
    summary: 'Nur Maskulinum ändert sich: der -> den, ein -> einen, kein -> keinen. Feminin & Neutrum bleiben gleich!',
    rules: [
      '• Nominativ maskulin: der Tisch / ein Tisch. -> Akkusativ maskulin: den Tisch / einen Tisch.',
      '• Neutrum bleibt gleich: das Buch / ein Buch -> Akkusativ: das Buch / ein Buch.',
      '• Feminin bleibt gleich: die Tasche / eine Tasche -> Akkusativ: die Tasche / eine Tasche.',
      '• Plural bleibt gleich: die Bücher -> Akkusativ: die Bücher.',
      '• Typische Verben mit Akkusativ: haben, sehen, lesen, schreiben, kaufen, brauchen, essen, trinken.'
    ],
    formula: 'der -> den | ein -> einen | kein -> keinen (NUR maskulin!)'
  },
  grammar: {
    title: 'Die maskuline -en Regel im Akkusativ',
    explanation: 'Der Akkusativ antwortet auf die Frage "Wen oder was?". Fast jedes alltägliche Verb, das ein Objekt verlangt (haben, suchen, finden, sehen), fordert den Akkusativ. Präge dir die Endung -en für Maskulinum ein.',
    formula: 'Subjekt (Nominativ) + Verb + direktes Objekt (Akkusativ: den/einen/keinen)',
    examples: [
      'Ich sehe den Mann. (Wen sehe ich? Den Mann.)',
      'Ich habe einen Bruder. (Wen habe ich? Einen Bruder.)',
      'Ich lese das Buch. (Neutrum bleibt unverändert.)',
      'Ich trinke den Kaffee. (der Kaffee -> den Kaffee)'
    ]
  },
  pronunciationNotes: [
    { sound: 'den / einen', rule: 'Deutliche Endsilbe auf -en [eːn] / [ən] mit klarem n-Laut', examples: ['den Tisch', 'einen Freund'] }
  ],
  vocabulary: [
    {
      id: 'd16-v1',
      german: 'den / einen',
      english: 'the / a (accusative masculine)',
      french: 'le / un (accusatif masc.)',
      arabicClue: 'أداة المفعول به للمذكر',
      gender: 'der',
      partOfSpeech: 'phrase',
      memoryClue: 'Akkusativ maskulin bekommt immer -en'
    },
    {
      id: 'd16-v2',
      german: 'sehen (ich sehe, du siehst)',
      english: 'to see',
      french: 'voir',
      arabicClue: 'يرى',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ich sehe den Freund'
    },
    {
      id: 'd16-v3',
      german: 'kaufen',
      english: 'to buy',
      french: 'acheter',
      arabicClue: 'يشتري',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Einen Computer kaufen'
    },
    {
      id: 'd16-v4',
      german: 'brauchen',
      english: 'to need',
      french: 'avoir besoin de',
      arabicClue: 'يحتاج',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ich brauche einen Stift'
    },
    {
      id: 'd16-v5',
      german: 'der Apfel (Akk: den Apfel)',
      english: 'apple',
      french: 'la pomme',
      arabicClue: 'تفاحة',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Ich esse einen Apfel'
    }
  ],
  examples: [
    'Ich habe einen neuen Computer gekauft.',
    'Siehst du den Mann dort drüben?',
    'Ich brauche einen Bleistift für die Schule.',
    'Er isst jeden Morgen einen Apfel.'
  ],
  speakingModel: {
    german: 'Ich sehe den Tisch. Ich habe einen Freund. Ich brauche einen Stift. Aber ich lese das Buch.',
    english: 'I see the table. I have a friend. I need a pen. But I read the book.',
    french: 'Je vois la table. J\'ai un ami. J\'ai besoin d\'un stylo. Mais je lis le livre.',
    note: 'Betone die Endung "-en" beim Maskulinum übertrieben deutlich: den Tisch, einen Stift.'
  },
  mnemonicTrick: {
    tip: 'Merke dir: Der Akkusativ ist der "EN-Fall" für Männer (maskulin)! der -> d-en, ein -> ein-en, kein -> kein-en, mein -> mein-en.',
    warning: 'Verändere nicht das Neutrum oder Femininum! "Ich sehe das Buch" bleibt "das Buch", NICHT "den Buch"!'
  },
  practiceTask: 'Setze "der/den" oder "ein/einen" ein: 1. Ich habe _____ (der) Computer. 2. Er sieht _____ (die) Schule. 3. Wir kaufen _____ (ein) Tisch. 4. Sie liest _____ (das) Buch.',
  dailyChallenge: 'Finde 3 maskuline Gegenstände in deinem Raum und bilde Sätze mit "Ich habe einen..." und "Ich sehe den...".',
  reviewItems: [
    { id: 'd16-r1', front: 'Welches Genus verändert seinen Artikel im Akkusativ?', back: 'NUR das Maskulinum (der -> den, ein -> einen, kein -> keinen).' },
    { id: 'd16-r2', front: 'Wie lautet der Akkusativ von "das Buch"?', back: 'das Buch (Neutrum bleibt im Akkusativ völlig unverändert).' },
    { id: 'd16-r3', front: 'Mit welcher Frage ermittelt man den Akkusativ?', back: 'Wen oder was? (z.B. Wen siehst du? Den Mann.)' },
    { id: 'd16-r4', front: 'Wie heißt "Ich brauche einen Stift" auf Französisch?', back: 'J\'ai besoin d\'un stylo.' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Akkusativ-Quiz und wende die maskuline -en Endung sicher an.',
  exercises: [
    {
      id: 'ex-16-1',
      type: 'multiple-choice',
      prompt: '"Ich brauche dringend _____ neuen Stift." Was gehört in die Lücke für "der Stift"?',
      question: 'Wähle den passenden Akkusativ-Artikel:',
      options: [
        'einen',
        'ein',
        'einer'
      ],
      correctAnswer: 'einen',
      explanation: '"der Stift" ist maskulin und steht im Akkusativ, daher heißt es "einen Stift".'
    },
    {
      id: 'ex-16-2',
      type: 'multiple-choice',
      prompt: '"Siehst du _____ Mann dort hinten an der Haltestelle?"',
      question: 'Wähle den richtigen Artikel:',
      options: [
        'den',
        'der',
        'dem'
      ],
      correctAnswer: 'den',
      explanation: 'Nach dem Verb "sehen" steht das direkte Objekt im Akkusativ maskulin: "den Mann".'
    },
    {
      id: 'ex-16-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Heute', 'kaufe', 'ich', 'einen', 'neuen Laptop'],
      correctAnswer: 'Heute kaufe ich einen neuen Laptop',
      explanation: 'Zeitangabe auf Pos 1, Verb "kaufe" auf Pos 2, Subjekt "ich" auf Pos 3, Akkusativobjekt am Ende.'
    }
  ]
};
