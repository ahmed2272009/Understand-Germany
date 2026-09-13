import { DayLesson } from '../../core/types/curriculum';

export const day26: DayLesson = {
  dayNumber: 26,
  dayId: 'day-26',
  title: 'Satzbau meisterhaft beherrschen (Die Synthese)',
  goal: 'Du kombinierst Hauptsätze, Fragen, Satzklammern und weil-Nebensätze zu einer sicheren Gesamtstruktur.',
  objective: 'Die 4 zentralen deutschen Satzbaumuster (Hauptsatz V2, Inversion, Satzklammer, Nebensatz Verb-Ende) fehlerfrei gegeneinander abgrenzen und steuern.',
  explanation: 'Heute bringen wir alle Satzbausteine zusammen. Ein deutscher Satz folgt einer kristallklaren architektonischen Logik: 1. Hauptsatz = Verb Pos 2. 2. Ja/Nein-Frage = Verb Pos 1. 3. Modal/Perfekt/Trennbar = Satzklammer (zweiter Teil am Ende). 4. Weil-Nebensatz = Verb ganz am Ende.',
  phase: 4,
  phaseTitle: 'Phase 4: Satzbau & Capstone',
  concept: {
    summary: 'Die 4 Grundmuster: 1. Normal (V2) 2. Inversion (Zeit + V2) 3. Satzklammer (V2 ... Inf/Partizip) 4. Nebensatz (weil ... Verb-Ende).',
    rules: [
      '• Muster 1 (V2 Normal): Ich lerne fleißig Deutsch.',
      '• Muster 2 (V2 Inversion): Heute lerne ich fleißig Deutsch.',
      '• Muster 3 (Satzklammer): Ich will heute fleißig Deutsch lernen.',
      '• Muster 4 (Nebensatz): Ich lerne fleißig Deutsch, weil ich die Prüfung schaffen will.'
    ],
    formula: 'V2 (Hauptsatz) vs. Verb-Ende (weil-Satz) vs. Satzklammer (Modal/Perfekt)'
  },
  grammar: {
    title: 'Die 4 goldenen Satzbau-Muster der deutschen Grammatik',
    explanation: 'Wer diese 4 Muster sicher beherrscht, macht im schriftlichen und mündlichen Deutsch praktisch keine Strukturfehler mehr. Vergleiche die Positionen des Verbs.',
    formula: 'Pos 1 (Vorfeld) | Pos 2 (Linke Klammer) | Mittelfeld | Satzende (Rechte Klammer)',
    examples: [
      'Muster 1: Ich lerne Deutsch.',
      'Muster 2: Jetzt lerne ich Deutsch.',
      'Muster 3: Ich kann Deutsch sprechen.',
      'Muster 4: Ich lerne, weil ich Deutsch sprechen möchte.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Kommasetzung & Pause', rule: 'Vor "weil", "aber" und "dass" steht im Deutschen IMMER ein Komma mit einer kurzen Sprechpause', examples: ['Ich lerne, weil...', 'Ich will, aber...'] }
  ],
  vocabulary: [
    {
      id: 'd26-v1',
      german: 'der Satzbau',
      english: 'sentence structure / syntax',
      french: 'la structure de la phrase',
      arabicClue: 'بناء الجملة / تركيب الجملة',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Satz + Bau = Satzbau'
    },
    {
      id: 'd26-v2',
      german: 'das Muster',
      english: 'pattern / model',
      french: 'le modèle / patron',
      arabicClue: 'نمط / نموذج',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Ein grammatikalisches Muster'
    },
    {
      id: 'd26-v3',
      german: 'kombinieren',
      english: 'to combine',
      french: 'combiner',
      arabicClue: 'يربط / يجمع بين',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Satzteile kombinieren'
    },
    {
      id: 'd26-v4',
      german: 'die Regel',
      english: 'rule',
      french: 'la règle',
      arabicClue: 'قاعدة',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Die goldene Grammatikregel'
    },
    {
      id: 'd26-v5',
      german: 'die Prüfung',
      english: 'exam / test',
      french: 'l’examen / l\'épreuve',
      arabicClue: 'امتحان / اختبار',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Eine A1-Prüfung bestehen'
    }
  ],
  examples: [
    'Ich beherrsche den deutschen Satzbau jetzt viel besser.',
    'Wenn ich die vier Muster kenne, kann ich jeden Text schreiben.',
    'Heute lerne ich, weil ich die Prüfung bestehen will.',
    'Zuerst übe ich Grammatik, dann schreibe ich Sätze.'
  ],
  speakingModel: {
    german: 'Ich lerne Deutsch. Heute lerne ich fleißig. Ich will die Sprache sprechen. Ich lerne viel, weil ich in Deutschland leben möchte.',
    english: 'I learn German. Today I study diligently. I want to speak the language. I study a lot because I would like to live in Germany.',
    french: 'J\'apprends l\'allemand. Aujourd\'hui j\'étudie assidûment. Je veux parler la langue. J\'étudie beaucoup parce que j\'aimerais vivre en Allemagne.',
    note: 'Sprich alle vier Muster nacheinander und spüre den Wechsel der Verbposition.'
  },
  mnemonicTrick: {
    tip: 'Denke an eine Ampel: GRÜN = Position 2 (Normal & Inversion). GELB = Satzklammer (Verb 1 auf Pos 2, Verb 2 ganz am Ende). ROT = Weil-Satz (Alles stoppt, Verb ganz ans Ende!).',
    warning: 'Mische niemals Hauptsatz und Nebensatz: Nach "weil" darf das Verb NIE auf Position 2 stehen!'
  },
  practiceTask: 'Bilde zu jedem der 4 Muster genau 2 eigene Sätze zum Thema "Schule und Sprachen".',
  dailyChallenge: 'Erstelle einen komplexen Satz, der ein Modalverb, eine Zeitangabe und einen weil-Nebensatz enthält.',
  reviewItems: [
    { id: 'd26-r1', front: 'Wo steht das Verb im Hauptsatz?', back: 'Immer auf Position 2.' },
    { id: 'd26-r2', front: 'Wo steht das Verb im weil-Nebensatz?', back: 'Immer ganz am Satzende.' },
    { id: 'd26-r3', front: 'Wo steht der Infinitiv beim Modalverb?', back: 'Ganz am Satzende (Satzklammer).' },
    { id: 'd26-r4', front: 'Muss vor "weil" im Deutschen ein Komma stehen?', back: 'Ja, vor "weil" steht im Deutschen IMMER ein Komma!' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Synthese-Quiz und weise alle 4 Satzmuster fehlerfrei nach.',
  exercises: [
    {
      id: 'ex-26-1',
      type: 'multiple-choice',
      prompt: 'Welcher Satz enthält eine korrekte Satzklammer mit Modalverb und Infinitiv?',
      question: 'Wähle den richtigen Satz:',
      options: [
        'Ich möchte heute meine Hausaufgaben machen.',
        'Ich möchte machen heute meine Hausaufgaben.',
        'Ich mache heute meine Hausaufgaben möchten.'
      ],
      correctAnswer: 'Ich möchte heute meine Hausaufgaben machen.',
      explanation: 'Modalverb "möchte" steht auf Position 2, der Infinitiv "machen" schließt die Satzklammer am Ende.'
    },
    {
      id: 'ex-26-2',
      type: 'multiple-choice',
      prompt: 'Welcher Satz kombiniert Inversion und Nebensatz grammatikalisch korrekt?',
      question: 'Wähle den richtigen Satz:',
      options: [
        'Heute lerne ich viel, weil ich morgen einen Test habe.',
        'Heute ich lerne viel, weil ich habe morgen einen Test.',
        'Heute lerne ich viel, weil morgen ich einen Test habe.'
      ],
      correctAnswer: 'Heute lerne ich viel, weil ich morgen einen Test habe.',
      explanation: 'Hauptsatz hat Inversion ("Heute lerne ich"), Nebensatz hat das Verb am Ende ("... einen Test habe").'
    },
    {
      id: 'ex-26-3',
      type: 'syntax-order',
      prompt: 'Ordne die Wörter zu einem vollständigen 4-Muster-Satz:',
      question: 'Bringe die Wörter in die richtige Reihenfolge:',
      words: ['Am Wochenende', 'will', 'ich', 'Deutsch lernen', 'weil', 'es', 'wichtig', 'ist'],
      correctAnswer: 'Am Wochenende will ich Deutsch lernen weil es wichtig ist',
      explanation: 'Zeit auf Pos 1, Modalverb "will" auf Pos 2, Infinitiv "lernen", gefolgt vom weil-Satz mit "ist" am Ende.'
    }
  ]
};
