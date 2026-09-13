import { DayLesson } from '../../core/types/curriculum';

export const day23: DayLesson = {
  dayNumber: 23,
  dayId: 'day-23',
  title: 'Schuldeutsch (Unterrichtssprache & Kommunikation)',
  goal: 'Du lernst die wichtigsten Redemittel, um dich aktiv im Unterricht auf Deutsch zu verständigen.',
  objective: 'Klassenzimmer-Deutsch (Fragen stellen, um Wiederholung bitten, Unklarheiten ausdrücken) flüssig beherrschen.',
  explanation: 'Schuldeutsch ermöglicht echte Kommunikation im Klassenzimmer. Diese Sätze lernst du am besten als feste, automatische Chunks (Redemittel), damit du sie im richtigen Moment ohne Nachdenken abrufen kannst.',
  phase: 4,
  phaseTitle: 'Phase 4: Satzbau & Capstone',
  concept: {
    summary: 'Wichtige Schulsätze: Ich habe eine Frage. Können Sie das erklären? Was bedeutet dieses Wort? Wie schreibt man das?',
    rules: [
      '• Höfliche Bitte an den Lehrer: "Können Sie das bitte wiederholen?" (Modalverb können + Sie + Infinitiv am Ende).',
      '• Wenn man etwas nicht versteht: "Ich verstehe das nicht. Können Sie mir helfen?"',
      '• Nach Vokabeln fragen: "Was bedeutet das auf Deutsch?" oder "Wie heißt das auf Deutsch?"',
      '• Nach Rechtschreibung fragen: "Wie schreibt man dieses Wort?"'
    ],
    formula: 'Feste Chunks: [Können Sie bitte...] + [Infinitiv]? | [Was bedeutet...]?'
  },
  grammar: {
    title: 'Höfliche Bitten mit Modalverben im Unterricht',
    explanation: 'Im Unterricht nutzt man gegenüber Lehrkräften die formelle Höflichkeitsform "Sie". Mit dem Modalverb "können" wird jede Bitte sofort freundlich und respektvoll.',
    formula: 'Können Sie + bitte + [Akkusativ / Dativ] + [Infinitiv am Satzende]?',
    examples: [
      'Können Sie das bitte an die Tafel schreiben?',
      'Darf ich bitte kurz das Fenster öffnen?',
      'Entschuldigung, auf welcher Seite sind wir?',
      'Was bedeutet das Wort "fleißig"?'
    ]
  },
  pronunciationNotes: [
    { sound: 'Höflichkeits-Intonation', rule: 'Höfliche Bitten mit "bitte" steigen am Ende freundlich an ↗', examples: ['Können Sie mir helfen? ↗', 'Bitte schön!'] }
  ],
  vocabulary: [
    {
      id: 'd23-v1',
      german: 'die Frage (eine Frage haben)',
      english: 'question (to have a question)',
      french: 'la question',
      arabicClue: 'سؤال',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Ich habe eine Frage'
    },
    {
      id: 'd23-v2',
      german: 'erklären',
      english: 'to explain',
      french: 'expliquer',
      arabicClue: 'يشرح / يفسر',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Können Sie das erklären?'
    },
    {
      id: 'd23-v3',
      german: 'verstehen (ich verstehe)',
      english: 'to understand',
      french: 'comprendre',
      arabicClue: 'يفهم',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ich verstehe nicht'
    },
    {
      id: 'd23-v4',
      german: 'wiederholen',
      english: 'to repeat',
      french: 'répéter',
      arabicClue: 'يعيد / يكرر',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Bitte noch einmal wiederholen'
    },
    {
      id: 'd23-v5',
      german: 'die Hausaufgabe',
      english: 'homework',
      french: 'le devoir',
      arabicClue: 'واجب منزلي',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Haus + Aufgabe = Hausaufgabe'
    }
  ],
  examples: [
    'Entschuldigung Herr Müller, ich habe eine Frage.',
    'Können Sie das bitte noch einmal langsam erklären?',
    'Wie schreibt man das Wort "Schülerin" an der Tafel?',
    'Welche Hausaufgaben haben wir für morgen auf?'
  ],
  speakingModel: {
    german: 'Ich habe eine Frage. Ich verstehe das leider nicht. Können Sie das bitte erklären? Was bedeutet dieses Wort?',
    english: 'I have a question. Unfortunately I don\'t understand that. Could you please explain that? What does this word mean?',
    french: 'J\'ai une question. Malheureusement je ne comprends pas cela. Pouvez-vous l\'expliquer s\'il vous plaît ? Que signifie ce mot ?',
    note: 'Übe diesen Dialog flüssig – er ist dein wichtigstes Werkzeug für den echten Deutschunterricht!'
  },
  mnemonicTrick: {
    tip: 'Lerne den 3-Schritt-Rettungsanker bei Unklarheiten: 1. "Entschuldigung!" -> 2. "Ich verstehe nicht." -> 3. "Können Sie das bitte wiederholen?"',
    warning: 'Schäme dich niemals, Fragen zu stellen! Auf Deutsch gilt: "Es gibt keine dummen Fragen, nur dumme Antworten."'
  },
  practiceTask: 'Schreibe einen Mini-Dialog (6 Zeilen) zwischen einem Schüler und einer Lehrerin im Unterricht.',
  dailyChallenge: 'Sage die 4 wichtigsten Schul-Hilfesätze laut auswendig auf, ohne auf den Bildschirm zu schauen.',
  reviewItems: [
    { id: 'd23-r1', front: 'Wie bittet man den Lehrer höflich um eine Erklärung?', back: 'Können Sie das bitte erklären?' },
    { id: 'd23-r2', front: 'Wie fragt man nach der Bedeutung eines Wortes?', back: 'Was bedeutet dieses Wort? / Was heißt das auf Deutsch?' },
    { id: 'd23-r3', front: 'Wie fragt man nach der Rechtschreibung?', back: 'Wie schreibt man das?' },
    { id: 'd23-r4', front: 'Was sagt man, wenn man etwas akustisch nicht verstanden hat?', back: 'Bitte wiederholen Sie das! / Können Sie das bitte wiederholen?' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Schuldeutsch-Quiz und beherrsche alle 4 Rettungsanker.',
  exercises: [
    {
      id: 'ex-23-1',
      type: 'multiple-choice',
      prompt: 'Du hast die Erklärung des Lehrers nicht verstanden. Was sagst du höflich?',
      question: 'Wähle die passende Formulierung:',
      options: [
        'Können Sie das bitte noch einmal erklären?',
        'Erkläre das sofort!',
        'Ich habe keine Lust.'
      ],
      correctAnswer: 'Können Sie das bitte noch einmal erklären?',
      explanation: 'Höfliche Frage mit "Können Sie... bitte" und Infinitiv "erklären" am Satzende.'
    },
    {
      id: 'ex-23-2',
      type: 'multiple-choice',
      prompt: 'Du siehst ein deutsches Wort an der Tafel und kennst den Sinn nicht. Wie fragst du?',
      question: 'Wähle die richtige Frage:',
      options: [
        'Was bedeutet dieses Wort auf Deutsch?',
        'Wer ist dieses Wort?',
        'Wohin geht dieses Wort?'
      ],
      correctAnswer: 'Was bedeutet dieses Wort auf Deutsch?',
      explanation: 'Nach der Wortbedeutung fragt man mit "Was bedeutet...?" oder "Was heißt...?".'
    },
    {
      id: 'ex-23-3',
      type: 'syntax-order',
      prompt: 'Bringe die Frage an die Lehrkraft in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Können', 'Sie', 'das Wort', 'an die Tafel', 'schreiben'],
      correctAnswer: 'Können Sie das Wort an die Tafel schreiben',
      explanation: 'Modalverb "Können" (Pos 1) + Subjekt "Sie" + Objekt + Infinitiv "schreiben" am Ende.'
    }
  ]
};
