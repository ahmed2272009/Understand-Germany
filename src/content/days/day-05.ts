import { DayLesson } from '../../core/types/curriculum';

export const day05: DayLesson = {
  dayNumber: 5,
  dayId: 'day-05',
  title: 'Das Verb HABEN',
  goal: 'Du lernst das Hilfsverb haben (to have) und drückst Besitz und Beziehungen aus.',
  objective: 'Die Konjugation von "haben" (habe, hast, hat, haben, habt, haben) beherrschen und Sätze über Besitz bilden.',
  explanation: 'Neben "sein" ist "haben" das zweite fundamentale Verb. Es zeigt Besitz (Ich habe ein Buch), Verwandtschaftsbeziehungen (Ich habe einen Bruder) und fungiert später als Hilfsverb im Perfekt.',
  phase: 1,
  phaseTitle: 'Phase 1: Das Fundament',
  concept: {
    summary: 'ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.',
    rules: [
      '• du hast: das -b- fällt weg! (Nicht "du habst", sondern "du hast").',
      '• er/sie/es hat: das -b- fällt weg! (Nicht "er habt", sondern "er hat").',
      '• ihr habt: behält das -b- (ihr habt).',
      '• nach haben steht das direkte Objekt meist im Akkusativ (Ich habe einen Bruder).'
    ],
    formula: 'Subjekt + [habe / hast / hat / haben / habt] + Akkusativ-Objekt'
  },
  grammar: {
    title: 'Konjugation von HABEN mit Stammverkürzung',
    explanation: 'Bei den 2. und 3. Personen Singular (du, er/sie/es) verkürzt sich der Verbstamm "hab-" zu "ha-". Das ist eine historische Vereinfachung der Aussprache.',
    formula: 'ich habe | du hast | er/sie/es hat | wir haben | ihr habt | sie/Sie haben',
    examples: [
      'Ich habe ein interessantes Buch.',
      'Hast du heute Zeit für mich?',
      'Er hat einen schnellen Computer.',
      'Wir haben viel Glück und Erfolg.'
    ]
  },
  pronunciationNotes: [
    { sound: 'h am Anfang', rule: 'Deutlicher Hauchlaut [h] (habe, hast, hat)', examples: ['haben', 'heute', 'hier'] },
    { sound: 'bt in habt', rule: 'Klingt stimmlos wie [pt]', examples: ['habt', 'lebt'] }
  ],
  vocabulary: [
    {
      id: 'd5-v1',
      german: 'haben',
      english: 'to have',
      french: 'avoir',
      arabicClue: 'يملك / عنده',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Besitz ausdrücken: ich habe'
    },
    {
      id: 'd5-v2',
      german: 'das Buch',
      english: 'book',
      french: 'le livre',
      arabicClue: 'كتاب',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Lerngegenstand: [das Buch]'
    },
    {
      id: 'd5-v3',
      german: 'die Zeit',
      english: 'time',
      french: 'le temps',
      arabicClue: 'وقت',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Ich habe keine Zeit'
    },
    {
      id: 'd5-v4',
      german: 'das Handy',
      english: 'mobile phone',
      french: 'le téléphone portable',
      arabicClue: 'هاتف محمول',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Auf Deutsch sächlich: das Handy'
    },
    {
      id: 'd5-v5',
      german: 'der Bruder',
      english: 'brother',
      french: 'le frère',
      arabicClue: 'أخ',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Familie: mein Bruder'
    },
    {
      id: 'd5-v6',
      german: 'die Schwester',
      english: 'sister',
      french: 'la sœur',
      arabicClue: 'أخت',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Familie: meine Schwester'
    }
  ],
  examples: [
    'Ich habe ein Buch und ein Handy.',
    'Hast du Geschwister?',
    'Er hat einen Bruder und eine Schwester.',
    'Wir haben heute Deutschunterricht.',
    'Habt ihr eure Hausaufgaben gemacht?'
  ],
  speakingModel: {
    german: 'Ich habe ein Buch. Du hast Zeit. Er hat ein Handy. Wir haben heute Deutschunterricht.',
    english: 'I have a book. You have time. He has a cell phone. We have German class today.',
    french: 'J\'ai un livre. Tu as le temps. Il a un portable. Nous avons cours d\'allemand aujourd\'hui.',
    note: 'Achte darauf, das -b- bei "du hast" und "er hat" nicht mitzusprechen.'
  },
  mnemonicTrick: {
    tip: 'Merke: "Du hast" (wie das berühmte Lied!). Das "b" macht Pause bei du und er: du hast, er hat.',
    warning: 'Verwechsle nicht "ihr habt" mit "er hat"! Ihr hat immer das "b": ihr habt.'
  },
  practiceTask: 'Schreibe 8 Sätze mit "haben": 4 mit "ich habe", 2 mit "du hast", 2 mit "wir haben".',
  dailyChallenge: 'Zähle 5 Dinge in deiner Schultasche auf Deutsch auf, die du hast ("Ich habe...").',
  reviewItems: [
    { id: 'd5-r1', front: 'Wie lautet die "du"-Form von haben?', back: 'du hast (ohne b!)' },
    { id: 'd5-r2', front: 'Wie lautet die "er/sie/es"-Form von haben?', back: 'er/sie/es hat (ohne b!)' },
    { id: 'd5-r3', front: 'Wie lautet die "ihr"-Form von haben?', back: 'ihr habt (mit b!)' },
    { id: 'd5-r4', front: 'Welchen Artikel hat das Wort "Buch"?', back: 'das Buch (neutrum)' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Haben-Quiz und konjugiere das Verb fehlerfrei.',
  exercises: [
    {
      id: 'ex-5-1',
      type: 'multiple-choice',
      prompt: '"_____ du heute Nachmittag Zeit für mich?" Welches Wort fehlt?',
      question: 'Wähle die passende Verbform:',
      options: [
        'Hast',
        'Habst',
        'Hat',
        'Habe'
      ],
      correctAnswer: 'Hast',
      explanation: 'Die 2. Person Singular (du) von haben lautet "hast" (das b entfällt).'
    },
    {
      id: 'ex-5-2',
      type: 'multiple-choice',
      prompt: '"Mein Bruder _____ ein neues Handy." Welche Form gehört hierhin?',
      question: 'Wähle die richtige Form für "Mein Bruder" (er):',
      options: [
        'hat',
        'habt',
        'haben',
        'hast'
      ],
      correctAnswer: 'hat',
      explanation: '"Mein Bruder" entspricht der 3. Person Singular (er), daher ist "hat" korrekt.'
    },
    {
      id: 'ex-5-3',
      type: 'syntax-order',
      prompt: 'Bringe die Wörter in die korrekte Satzstellung:',
      question: 'Ordne die Wörter:',
      words: ['Wir', 'haben', 'heute', 'keine', 'Zeit'],
      correctAnswer: 'Wir haben heute keine Zeit',
      explanation: 'Subjekt ("Wir") auf Position 1, Verb ("haben") auf Position 2, gefolgt von der Zeit- und Verneinungsangabe.'
    }
  ]
};
