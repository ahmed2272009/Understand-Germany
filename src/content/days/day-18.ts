import { DayLesson } from '../../core/types/curriculum';

export const day18: DayLesson = {
  dayNumber: 18,
  dayId: 'day-18',
  title: 'Modalverben und die Satzklammer',
  goal: 'Du lernst die Modalverben (können, müssen, wollen) und die berühmte deutsche Satzklammer.',
  objective: 'Modalverben im Präsens konjugieren und den zweiten Infinitiv ganz ans Satzende stellen (Satzklammer).',
  explanation: 'Modalverben modifizieren die Bedeutung einer Handlung: können (Fähigkeit/Möglichkeit), müssen (Pflicht/Notwendigkeit), wollen (Wille/Plan). Die goldene Regel: Das Modalverb steht auf Position 2, das Vollverb wandert im Infinitiv ganz ans Satzende!',
  phase: 3,
  phaseTitle: 'Phase 3: Kasus & Modale',
  concept: {
    summary: 'können (can), müssen (must), wollen (want). Modalverb auf Position 2, Vollverb im Infinitiv am Satzende!',
    rules: [
      '• Modalverb-Besonderheit: 1. und 3. Person Singular sind immer identisch und haben KEINE Endung! (ich kann, er kann | ich muss, er muss | ich will, er will).',
      '• Der Vokal ändert sich im Singular: können -> ich kann, müssen -> ich muss, wollen -> ich will.',
      '• Satzklammer-Prinzip: "Ich [kann] sehr gut Deutsch [sprechen]."'
    ],
    formula: 'Position 1 + Modalverb (Pos 2) + Mittelfeld + Infinitiv (Satzende!)'
  },
  grammar: {
    title: 'Die deutsche Satzklammer mit Modalverben',
    explanation: 'Das finite Modalverb und der Infinitiv am Satzende bilden eine Klammer um den gesamten Restsatz (das "Mittelfeld"). Egal wie viele Wörter dazwischen stehen, der Infinitiv wartet brav am Schluss.',
    formula: 'Subjekt + [kann / muss / will] + ... + [Infinitiv am Ende]',
    examples: [
      'Ich kann Deutsch sprechen.',
      'Ich muss heute fleißig für die Schule lernen.',
      'Wir wollen im Sommer nach Deutschland reisen.',
      'Kannst du mir bitte helfen?'
    ]
  },
  pronunciationNotes: [
    { sound: 'ö in können', rule: 'Lippen runden wie für O, aber E sagen [œ]', examples: ['können', 'möchten'] },
    { sound: 'ü in müssen', rule: 'Lippen spitzen wie für U, aber I sagen [ʏ]', examples: ['müssen', 'fünf'] }
  ],
  vocabulary: [
    {
      id: 'd18-v1',
      german: 'können (ich kann, du kannst, er kann)',
      english: 'can / to be able to',
      french: 'pouvoir',
      arabicClue: 'يستطيع / يقدر',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Fähigkeit: Ich kann Deutsch'
    },
    {
      id: 'd18-v2',
      german: 'müssen (ich muss, du musst, er muss)',
      english: 'must / to have to',
      french: 'devoir / falloir',
      arabicClue: 'يجب عليه / لا بد',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Notwendigkeit: Ich muss lernen'
    },
    {
      id: 'd18-v3',
      german: 'wollen (ich will, du willst, er will)',
      english: 'to want',
      french: 'vouloir',
      arabicClue: 'يريد',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Wille/Absicht: Ich will reisen'
    },
    {
      id: 'd18-v4',
      german: 'helfen (du hilfst)',
      english: 'to help',
      french: 'aider',
      arabicClue: 'يساعد',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Kannst du mir helfen?'
    },
    {
      id: 'd18-v5',
      german: 'reisen',
      english: 'to travel',
      french: 'voyager',
      arabicClue: 'يسافر',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'In andere Länder reisen'
    }
  ],
  examples: [
    'Ich kann schon einfache deutsche Sätze bilden.',
    'Morgen muss ich früh aufstehen und zur Schule gehen.',
    'Mein Freund will im nächsten Jahr Informatik studieren.',
    'Können Sie das bitte noch einmal wiederholen?'
  ],
  speakingModel: {
    german: 'Ich kann Deutsch sprechen. Ich muss fleißig lernen. Ich will meine Prüfung gut schaffen.',
    english: 'I can speak German. I must study diligently. I want to pass my exam well.',
    french: 'Je peux parler allemand. Je dois étudier assidûment. Je veux bien réussir mon examen.',
    note: 'Halte den Atem an, bis der Infinitiv ganz am Ende des Satzes ankommt!'
  },
  mnemonicTrick: {
    tip: 'Merke dir: Modalverben sind wie eine Zange oder Klammer. Das Modalverb öffnet die Klammer auf Platz 2, der Infinitiv schließt die Klammer am Satzende!',
    warning: 'Niemals zwei konjugierte Verben nebeneinander! Falsch: "Ich will lerne". Richtig: "Ich will lernen"!'
  },
  practiceTask: 'Schreibe je 2 Sätze mit "können", "müssen" und "wollen". Achte streng darauf, dass der Infinitiv ganz am Ende steht.',
  dailyChallenge: 'Sage 3 Ziele laut auf: "Ich will...", "Ich kann...", "Ich muss...".',
  reviewItems: [
    { id: 'd18-r1', front: 'Wo steht das zweite Verb bei einem Satz mit Modalverb?', back: 'Im Infinitiv ganz am Ende des Satzes (Satzklammer)!' },
    { id: 'd18-r2', front: 'Wie lautet die "er/sie/es"-Form von können?', back: 'er kann (OHNE Endung -t!)' },
    { id: 'd18-r3', front: 'Wie lautet die "er/sie/es"-Form von müssen?', back: 'er muss (OHNE Endung -t!)' },
    { id: 'd18-r4', front: 'Wie lautet die "ich"-Form von wollen?', back: 'ich will (nicht ich wolle!)' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Modalverb-Quiz und baue 3 korrekte Satzklammern.',
  exercises: [
    {
      id: 'ex-18-1',
      type: 'multiple-choice',
      prompt: '"Ich _____ heute für die Klassenarbeit lernen." Welches Modalverb passt grammatikalisch zu "ich"?',
      question: 'Wähle die richtige Form für "müssen":',
      options: [
        'muss',
        'müsse',
        'müsst'
      ],
      correctAnswer: 'muss',
      explanation: 'Die 1. Person Singular von müssen heißt "ich muss" (ohne Umlaut und ohne Endung).'
    },
    {
      id: 'ex-18-2',
      type: 'multiple-choice',
      prompt: 'Wo muss der Infinitiv "sprechen" im Satz stehen: "Ich kann sehr gut Deutsch _____"?',
      question: 'Wähle die richtige Position:',
      options: [
        'ganz am Satzende ("... Deutsch sprechen.")',
        'direkt nach "kann" ("Ich kann sprechen...")',
        'an erster Stelle'
      ],
      correctAnswer: 'ganz am Satzende ("... Deutsch sprechen.")',
      explanation: 'Im deutschen Hauptsatz mit Modalverb wandert das Vollverb als Infinitiv ans Satzende (Satzklammer).'
    },
    {
      id: 'ex-18-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz mit Modalverb in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Wir', 'wollen', 'in Deutschland', 'fließend', 'sprechen'],
      correctAnswer: 'Wir wollen in Deutschland fließend sprechen',
      explanation: 'Subjekt ("Wir") + Modalverb ("wollen") + Mittelfeld + Infinitiv am Satzende ("sprechen").'
    }
  ]
};
