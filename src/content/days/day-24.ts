import { DayLesson } from '../../core/types/curriculum';

export const day24: DayLesson = {
  dayNumber: 24,
  dayId: 'day-24',
  title: 'Konnektoren (und, aber, oder, weil, deshalb)',
  goal: 'Du verbindest kurze Sätze zu flüssigen, komplexen Gedanken.',
  objective: 'Nebenordnende Konnektoren (Position 0: und, aber, oder) und unterordnende Konnektoren (Verb am Ende: weil) fehlerfrei anwenden.',
  explanation: 'Um wie ein echter Sprecher zu klingen, musst du Einzelsätze verbinden. Es gibt zwei Arten von Konnektoren: 1. Position 0 (ADUSO: aber, denn, und, sondern, oder) – die Wortstellung ändert sich NICHT. 2. Nebensatz-Konnektoren (weil, dass, wenn) – das Verb wandert GANZ ANS SATZENDE!',
  phase: 4,
  phaseTitle: 'Phase 4: Satzbau & Capstone',
  concept: {
    summary: 'und/aber/oder = Position 0 (normale Wortstellung). weil = Nebensatz (konjugiertes Verb fliegt ans Satzende!).',
    rules: [
      '• und (and): verbindet Aufzählungen oder gleichwertige Sätze (Pos 0).',
      '• aber (but): drückt einen Gegensatz aus (Pos 0).',
      '• oder (or): zeigt Alternativen (Pos 0).',
      '• weil (because): leitet einen Kausalnebensatz ein -> das Verb steht IMMER am Satzende!',
      '• deshalb (therefore): steht auf Position 1 im Hauptsatz -> Verb folgt direkt auf Position 2: "Deshalb lerne ich."'
    ],
    formula: 'Hauptsatz + [weil] + Subjekt + Mittelfeld + [konjugiertes Verb am ENDE!]'
  },
  grammar: {
    title: 'Die WEIL-Regel: Verb ans Satzende',
    explanation: 'Der Konnektor "weil" ist der wichtigste Nebensatzeinleiter. Sobald "weil" im Satz auftaucht, wird das konjugierte Verb magnetisch an das allerletzte Satzende gezogen.',
    formula: 'Ich lerne Deutsch, weil ich in Deutschland [studieren möchte].',
    examples: [
      'Ich lerne Deutsch, weil die Sprache sehr schön ist.',
      'Ich gehe früh ins Bett, weil ich müde bin.',
      'Ich trinke viel Wasser, denn ich habe Durst.',
      'Deutsch ist nicht leicht, aber es macht großen Spaß.'
    ]
  },
  pronunciationNotes: [
    { sound: 'weil', rule: 'Diphthong EI [vaɪ̯l], klingt wie engl. "vile"', examples: ['weil', 'mein'] },
    { sound: 'deshalb', rule: 'Betonung auf erster Silbe: DES-halb [ˈdɛsˌhalp]', examples: ['deshalb', 'deswegen'] }
  ],
  vocabulary: [
    {
      id: 'd24-v1',
      german: 'und (Position 0)',
      english: 'and',
      french: 'et',
      arabicClue: 'و (حرف عطف)',
      gender: null,
      partOfSpeech: 'connector',
      memoryClue: 'Verbindung ohne Positionsänderung'
    },
    {
      id: 'd24-v2',
      german: 'aber (Position 0)',
      english: 'but',
      french: 'mais',
      arabicClue: 'لكن',
      gender: null,
      partOfSpeech: 'connector',
      memoryClue: 'Gegensatz: aber'
    },
    {
      id: 'd24-v3',
      german: 'oder (Position 0)',
      english: 'or',
      french: 'ou',
      arabicClue: 'أو',
      gender: null,
      partOfSpeech: 'connector',
      memoryClue: 'Alternative: Tee oder Kaffee?'
    },
    {
      id: 'd24-v4',
      german: 'weil (Verb am Ende!)',
      english: 'because',
      french: 'parce que',
      arabicClue: 'لأنّ (الفعل في آخر الجملة)',
      gender: null,
      partOfSpeech: 'connector',
      memoryClue: 'Grund: Verb fliegt ganz ans Ende'
    },
    {
      id: 'd24-v5',
      german: 'deshalb (Position 1)',
      english: 'therefore / that\'s why',
      french: 'c\'est pourquoi / donc',
      arabicClue: 'لذلك (يتبعه الفعل مباشرة)',
      gender: null,
      partOfSpeech: 'connector',
      memoryClue: 'Folge: Deshalb lerne ich'
    }
  ],
  examples: [
    'Ich lerne Deutsch, weil ich später in Berlin studieren will.',
    'Ich habe wenig Zeit, aber ich übe trotzdem jeden Tag.',
    'Möchtest du Wasser oder Apfelsaft trinken?',
    'Ich bin krank, deshalb bleibe ich heute zu Hause.'
  ],
  speakingModel: {
    german: 'Ich lerne Deutsch, weil ich die Sprache liebe. Deutsch ist nicht einfach, aber sehr logisch.',
    english: 'I learn German because I love the language. German is not easy, but very logical.',
    french: 'J\'apprends l\'allemand parce que j\'aime la langue. L\'allemand n\'est pas facile, mais très logique.',
    note: 'Halte inne bei "... weil ich die Sprache...", atme durch und setze das Verb "liebe" ganz ans Ende!'
  },
  mnemonicTrick: {
    tip: 'Merke dir: "WEIL wirft das Verb ins Weite!" Sobald "weil" kommt, schießt das konjugierte Verb mit Katapult ganz ans Satzende!',
    warning: 'Niemals sagen: "Weil ich lerne Deutsch"! Richtig ist IMMER: "Weil ich Deutsch LERNE"!'
  },
  practiceTask: 'Verbinde jeweils zwei Sätze mit "weil": 1. Ich trinke Wasser. (Ich habe Durst.) 2. Ich lerne viel. (Ich will die Prüfung schaffen.)',
  dailyChallenge: 'Erkläre auf Deutsch in einem weil-Satz, warum du Deutsch lernst ("Ich lerne Deutsch, weil...").',
  reviewItems: [
    { id: 'd24-r1', front: 'Wo steht das Verb in einem weil-Satz?', back: 'Immer ganz am Ende des Nebensatzes!' },
    { id: 'd24-r2', front: 'Welche Position hat der Konnektor "aber"?', back: 'Position 0 (die normale Satzstellung bleibt erhalten: "aber ich lerne...").' },
    { id: 'd24-r3', front: 'Welche Position hat "deshalb"?', back: 'Position 1 im Hauptsatz (das Verb folgt direkt auf Position 2: "Deshalb lerne ich...").' },
    { id: 'd24-r4', front: 'Ist der Satz "Ich schlafe, weil ich müde bin" grammatikalisch korrekt?', back: 'Ja, absolut perfekt ("bin" steht am Satzende).' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Konnektoren-Quiz und bilde 3 fehlerfreie weil-Sätze.',
  exercises: [
    {
      id: 'ex-24-1',
      type: 'multiple-choice',
      prompt: 'Welcher weil-Satz ist grammatikalisch korrekt gebildet?',
      question: 'Wähle den richtigen Satz:',
      options: [
        'Ich lerne Deutsch, weil ich in Deutschland studieren möchte.',
        'Ich lerne Deutsch, weil ich möchte in Deutschland studieren.',
        'Ich lerne Deutsch, weil möchte ich in Deutschland studieren.'
      ],
      correctAnswer: 'Ich lerne Deutsch, weil ich in Deutschland studieren möchte.',
      explanation: 'Im weil-Nebensatz wandert das konjugierte Verb ("möchte") ganz ans Ende, hinter den Infinitiv "studieren".'
    },
    {
      id: 'ex-24-2',
      type: 'multiple-choice',
      prompt: '"Deutsch ist schwer, _____ es macht sehr viel Spaß." Welcher Konnektor drückt den Gegensatz aus?',
      question: 'Wähle den passenden Konnektor:',
      options: [
        'aber',
        'oder',
        'denn'
      ],
      correctAnswer: 'aber',
      explanation: '"aber" drückt einen Gegensatz aus und behält Position 0 bei ("aber es macht Spaß").'
    },
    {
      id: 'ex-24-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz mit weil in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Ich gehe ins Bett', 'weil', 'ich', 'sehr', 'müde', 'bin'],
      correctAnswer: 'Ich gehe ins Bett weil ich sehr müde bin',
      explanation: 'Nebensatzeinleiter "weil" + Subjekt "ich" + Adjektiv "sehr müde" + finites Verb "bin" am Ende.'
    }
  ]
};
