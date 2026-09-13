import { DayLesson } from '../../core/types/curriculum';

export const day25: DayLesson = {
  dayNumber: 25,
  dayId: 'day-25',
  title: 'Wortstellung mit Zeitangaben (Inversion & Variation)',
  goal: 'Du variierst deine Satzanfänge sicher, ohne jemals die Verbposition 2 zu verletzen.',
  objective: 'Zeitangaben, Ortsangaben und Objekte auf Position 1 setzen und das Subjekt automatisch auf Position 3 rücken.',
  explanation: 'Wenn jeder Satz mit "Ich..." beginnt, klingt ein Text monoton und unnatürlich ("Ich lerne... Ich esse... Ich gehe..."). Auf Deutsch kannst du fast jedes Satzglied an den Satzanfang stellen. Entscheidend ist nur: Das konjugierte Verb bleibt stur auf Position 2!',
  phase: 4,
  phaseTitle: 'Phase 4: Satzbau & Capstone',
  concept: {
    summary: 'Position 1 (Zeitangabe) -> Position 2 (Verb) -> Position 3 (Subjekt) -> Position 4 (Rest).',
    rules: [
      '• Variante A (Normal): "Ich stehe um sieben Uhr auf."',
      '• Variante B (Inversion mit Zeit): "Um sieben Uhr stehe ich auf."',
      '• Variante C (Inversion mit Ort): "In der Schule lerne ich viele Dinge."',
      '• Das Subjekt (ich, du, er...) wandert direkt hinter das Verb auf Position 3.',
      '• Das Verb weicht niemals von Position 2 ab!'
    ],
    formula: '[Zeitangabe / Ortsangabe] + [FINITES VERB] + [Subjekt] + [Objekt / Rest]'
  },
  grammar: {
    title: 'Text-Dynamik durch Spitzenstellungs-Variation',
    explanation: 'Im Deutschen nennt man die Position 1 das "Vorfeld". Das Vorfeld kann ein einzelnes Adverb sein ("Heute") oder eine ganze Präpositionalgruppe ("Am frühen Montagmorgen"). Das Verb bleibt das unerschütterliche Scharnier auf Position 2.',
    formula: 'Vorfeld (Pos 1) + Finites Verb (Pos 2) + Mittelfeld (Subjekt auf Pos 3)',
    examples: [
      'Heute lerne ich Grammatik.',
      'Morgen schreibe ich einen Aufsatz.',
      'Am Wochenende treffe ich meine Freunde.',
      'In Berlin wohnen viele Studenten.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Pausen-Setzung', rule: 'Nach einer längeren Zeitangabe auf Position 1 keine übertriebene Kunstpause machen, das Verb schließt flüssig an', examples: ['Am Nachmittag gehe ich...', 'Heute lerne ich...'] }
  ],
  vocabulary: [
    {
      id: 'd25-v1',
      german: 'am Nachmittag',
      english: 'in the afternoon',
      french: 'l’après-midi',
      arabicClue: 'بعد الظهر',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Tageszeit auf Position 1'
    },
    {
      id: 'd25-v2',
      german: 'am Wochenende',
      english: 'on the weekend',
      french: 'le week-end',
      arabicClue: 'في عطلة نهاية الأسبوع',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Samstag und Sonntag'
    },
    {
      id: 'd25-v3',
      german: 'manchmal',
      english: 'sometimes',
      french: 'parfois',
      arabicClue: 'أحياناً',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Häufigkeitsangabe: Manchmal koche ich'
    },
    {
      id: 'd25-v4',
      german: 'oft',
      english: 'often',
      french: 'souvent',
      arabicClue: 'غالباً / كثيراً',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Oft übe ich Deutsch'
    },
    {
      id: 'd25-v5',
      german: 'jeden Tag',
      english: 'every day',
      french: 'chaque jour',
      arabicClue: 'كل يوم',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Jeden Tag lerne ich Wörter'
    }
  ],
  examples: [
    'Am Vormittag habe ich Unterricht.',
    'Am Nachmittag mache ich Sport.',
    'Manchmal spiele ich mit Freunden Videospiele.',
    'Oft lese ich abends ein gutes Buch.'
  ],
  speakingModel: {
    german: 'Heute lerne ich Deutsch. Am Nachmittag treffe ich Freunde. Am Abend koche ich mit meiner Familie. Manchmal sehe ich fern.',
    english: 'Today I study German. In the afternoon I meet friends. In the evening I cook with my family. Sometimes I watch TV.',
    french: 'Aujourd\'hui j\'étudie l\'allemand. L\'après-midi je retrouve des amis. Le soir je cuisine avec ma famille. Parfois je regarde la télé.',
    note: 'Höre auf den Satzrhythmus: Zeit -> Verb -> ich -> Rest. Das klingt sofort wie echtes Deutsch!'
  },
  mnemonicTrick: {
    tip: 'Präge dir den Satzrhythmus als Walzer ein: EINS (Heute) - ZWEI (lerne) - DREI (ich)! Das Verb ist immer der Taktgeber auf der Zwei.',
    warning: 'Vermeide den typischen Schülerfehler: "Heute ich lerne". Das Subjekt darf dem Verb die Position 2 niemals wegnehmen!'
  },
  practiceTask: 'Nimm deinen Tagesablauf und schreibe 5 Sätze, bei denen JEDER Satz mit einer anderen Zeitangabe beginnt.',
  dailyChallenge: 'Erzähle deinen Tag in 4 Sätzen laut, ohne ein einziges Mal mit "Ich" zu beginnen!',
  reviewItems: [
    { id: 'd25-r1', front: 'Wo steht das Verb, wenn "Am Nachmittag" auf Position 1 steht?', back: 'Auf Position 2 (direkt nach der Angabe: "Am Nachmittag spiele ich...").' },
    { id: 'd25-r2', front: 'Wo steht das Subjekt bei der Inversion?', back: 'Auf Position 3, direkt hinter dem konjugierten Verb.' },
    { id: 'd25-r3', front: 'Ist "Manchmal ich trinke Tee" richtig?', back: 'Nein! Richtig ist: "Manchmal trinke ich Tee."' },
    { id: 'd25-r4', front: 'Warum variiert man Satzanfänge in einem Text?', back: 'Damit der Text lebendig, elegant und abwechslungsreich klingt.' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Quiz und bilde 3 abwechslungsreiche Inversionssätze.',
  exercises: [
    {
      id: 'ex-25-1',
      type: 'multiple-choice',
      prompt: 'Forme um: "Ich gehe am Samstag mit Freunden ins Kino."',
      question: 'Wie lautet der Satz mit "Am Samstag" auf Position 1?',
      options: [
        'Am Samstag gehe ich mit Freunden ins Kino.',
        'Am Samstag ich gehe mit Freunden ins Kino.',
        'Am Samstag mit Freunden ich gehe ins Kino.'
      ],
      correctAnswer: 'Am Samstag gehe ich mit Freunden ins Kino.',
      explanation: '"Am Samstag" (Pos 1) verlangt direkt das Verb "gehe" (Pos 2), gefolgt vom Subjekt "ich" (Pos 3).'
    },
    {
      id: 'ex-25-2',
      type: 'multiple-choice',
      prompt: 'Welcher Satz ist grammatikalisch absolut korrekt gebaut?',
      question: 'Wähle den korrekten Satz:',
      options: [
        'Manchmal koche ich mit meiner Mutter am Abend.',
        'Manchmal ich koche mit meiner Mutter am Abend.',
        'Manchmal mit meiner Mutter koche ich am Abend.'
      ],
      correctAnswer: 'Manchmal koche ich mit meiner Mutter am Abend.',
      explanation: 'Nach dem Adverb "Manchmal" steht das finite Verb "koche" an zweiter Stelle.'
    },
    {
      id: 'ex-25-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz in die korrekte Reihenfolge mit der Zeitangabe am Anfang:',
      question: 'Ordne die Wörter:',
      words: ['Jeden Morgen', 'trinkt', 'mein Vater', 'eine Tasse', 'Kaffee'],
      correctAnswer: 'Jeden Morgen trinkt mein Vater eine Tasse Kaffee',
      explanation: 'Position 1: "Jeden Morgen", Position 2: Verb "trinkt", Position 3: Subjekt "mein Vater".'
    }
  ]
};
