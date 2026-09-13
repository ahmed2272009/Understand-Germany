import { DayLesson } from '../../core/types/curriculum';

export const day27: DayLesson = {
  dayNumber: 27,
  dayId: 'day-27',
  title: 'Sprechen über dich (Der persönliche Steckbrief)',
  goal: 'Du stellst dich fließend, strukturiert und fehlerfrei auf Deutsch vor.',
  objective: 'Einen vollständigen mündlichen Steckbrief (Name, Alter, Herkunft, Wohnort, Schule, Sprachen, Hobbys, Familie, Zukunft) formulieren.',
  explanation: 'Heute bündelst du das Gelernte zu deiner persönlichen Identitäts-Vorstellung. In jeder A1-Prüfung (z.B. Goethe-Zertifikat A1: "Sich vorstellen") ist dieser mündliche Steckbrief der allererste und wichtigste Prüfungsteil.',
  phase: 4,
  phaseTitle: 'Phase 4: Satzbau & Capstone',
  concept: {
    summary: 'Der 7-Punkte-Steckbrief: 1. Name 2. Alter 3. Land/Herkunft 4. Wohnort 5. Sprachen 6. Beruf/Schule 7. Hobby.',
    rules: [
      '• 1. Name: "Ich heiße..." oder "Mein Name ist...".',
      '• 2. Herkunft: "Ich komme aus..." (aus Tunesien, aus Syrien, aus Deutschland).',
      '• 3. Wohnort: "Ich wohne in..." (in Tunis, in Berlin, in Wien).',
      '• 4. Alter: "Ich bin sechzehn Jahre alt."',
      '• 5. Sprachen: "Ich spreche Arabisch, Französisch und ein bisschen Deutsch."',
      '• 6. Schule: "Ich bin Schüler an der Schule..."',
      '• 7. Hobby: "In meiner Freizeit spiele ich gerne Fußball / höre ich Musik."'
    ],
    formula: 'Name + Herkunft + Wohnort + Alter + Sprachen + Schule + Hobby'
  },
  grammar: {
    title: 'Redemittel für die mündliche Selbstpräsentation',
    explanation: 'Verwende abwechslungsreiche Satzanfänge ("Mein Name ist...", "Ich lebe in...", "In meiner Freizeit..."), damit dein Vortrag lebendig und flüssig klingt.',
    formula: 'Ich heiße... | Ich komme aus... | Ich wohne in... | Ich spreche... | Meine Hobbys sind...',
    examples: [
      'Ich heiße Alex und bin 16 Jahre alt.',
      'Ich komme aus Tunesien und wohne in Tunis.',
      'Ich spreche Arabisch als Muttersprache und lerne Deutsch.',
      'Mein Lieblingshobby ist Informatik und Programmieren.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Ich heiße', rule: 'Scharfes S (Eszett ß) [ˈhaɪ̯sə], kein stimmhaftes z!', examples: ['heiße', 'Fußball'] },
    { sound: 'Jahre alt', rule: 'Gebunden gesprochen: [ˈjaːʁə alt]', examples: ['Jahre alt'] }
  ],
  vocabulary: [
    {
      id: 'd27-v1',
      german: 'heißen (ich heiße)',
      english: 'to be called',
      french: 's’appeler',
      arabicClue: 'يُدعى / اسمه',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ich heiße ...'
    },
    {
      id: 'd27-v2',
      german: 'kommen aus (ich komme aus...)',
      english: 'to come from',
      french: 'venir de',
      arabicClue: 'يأتي من',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Herkunft: Ich komme aus Tunesien'
    },
    {
      id: 'd27-v3',
      german: 'die Freizeit',
      english: 'free time / leisure',
      french: 'le temps libre / les loisirs',
      arabicClue: 'وقت الفراغ',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Frei + Zeit = Freizeit'
    },
    {
      id: 'd27-v4',
      german: 'das Hobby, die Hobbys',
      english: 'hobby, hobbies',
      french: 'le passe-temps / hobby',
      arabicClue: 'هواية / هوايات',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Meine Hobbys sind Sport und Musik'
    },
    {
      id: 'd27-v5',
      german: 'die Muttersprache',
      english: 'native language / mother tongue',
      french: 'la langue maternelle',
      arabicClue: 'اللغة الأم',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Mutter + Sprache'
    }
  ],
  examples: [
    'Mein Name ist Alex und ich bin Schüler.',
    'Ich spreche drei Sprachen fließend.',
    'In meiner Freizeit spiele ich sehr gerne Fußball mit Freunden.',
    'Mein großes Ziel ist ein Studium in Deutschland.'
  ],
  speakingModel: {
    german: 'Hallo! Ich heiße Ahmed. Ich bin 16 Jahre alt und komme aus Tunesien. Ich wohne in Tunis. Ich spreche Arabisch, Französisch und Deutsch. In meiner Freizeit spiele ich gerne Fußball.',
    english: 'Hello! My name is Ahmed. I am 16 years old and come from Tunisia. I live in Tunis. I speak Arabic, French and German. In my free time I like to play soccer.',
    french: 'Bonjour ! Je m\'appelle Ahmed. J\'ai 16 ans et je viens de Tunisie. J\'habite à Tunis. Je parle arabe, français et allemand. Pendant mon temps libre j\'aime jouer au football.',
    note: 'Stelle einen Timer auf 45 Sekunden und sprich diesen Steckbrief laut und ohne abzulesen!'
  },
  mnemonicTrick: {
    tip: 'Merke dir das Wort "HALWOSH" als Spickzettel im Kopf: Herkunft - Alter - Land - Wohnort - Sprachen - Hobbys!',
    warning: 'Vermeide: "Ich habe 16 Jahre" (wie im Französischen "j\'ai 16 ans"). Auf Deutsch heißt es IMMER mit SEIN: "Ich BIN 16 Jahre alt"!'
  },
  practiceTask: 'Nimm dein Smartphone, öffne den Sprachmemos-Rekorder und nimm deine eigene 60-Sekunden-Selbstvorstellung auf Deutsch auf. Höre sie dir an!',
  dailyChallenge: 'Sprich deine komplette Selbstvorstellung fehlerfrei in unter 40 Sekunden laut auf.',
  reviewItems: [
    { id: 'd27-r1', front: 'Wie sagt man sein Alter auf Deutsch korrekt?', back: 'Ich bin ... Jahre alt (mit dem Verb "sein", niemals haben!).' },
    { id: 'd27-r2', front: 'Welche Präposition nutzt man für das Herkunftsland?', back: 'aus (z.B. Ich komme aus Tunesien, aus Syrien, aus der Schweiz).' },
    { id: 'd27-r3', front: 'Welche Präposition nutzt man für den Wohnort?', back: 'in (z.B. Ich wohne in Tunis, in Berlin, in Paris).' },
    { id: 'd27-r4', front: 'Wie formuliert man Hobbys auf Deutsch?', back: '"In meiner Freizeit spiele ich gerne..." oder "Mein Hobby ist..."' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Steckbrief-Quiz und formuliere alle 7 Steckbriefpunkte korrekt.',
  exercises: [
    {
      id: 'ex-27-1',
      type: 'multiple-choice',
      prompt: 'Wie sagst du auf Deutsch korrekt, wie alt du bist?',
      question: 'Wähle den richtigen Satz:',
      options: [
        'Ich bin sechzehn Jahre alt.',
        'Ich habe sechzehn Jahre.',
        'Ich mache sechzehn Jahre alt.'
      ],
      correctAnswer: 'Ich bin sechzehn Jahre alt.',
      explanation: 'Im Deutschen drückt man das Alter IMMER mit dem Verb "sein" aus: "Ich bin ... Jahre alt".'
    },
    {
      id: 'ex-27-2',
      type: 'multiple-choice',
      prompt: '"Ich komme _____ Tunesien und ich wohne _____ Tunis." Welche Präpositionen passen?',
      question: 'Wähle das passende Paar:',
      options: [
        'aus / in',
        'in / aus',
        'nach / bei'
      ],
      correctAnswer: 'aus / in',
      explanation: 'Herkunft mit "aus" (aus Tunesien), Wohnort mit "in" (in Tunis).'
    },
    {
      id: 'ex-27-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz über Hobbys in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['In meiner Freizeit', 'spiele', 'ich', 'sehr gerne', 'Fußball'],
      correctAnswer: 'In meiner Freizeit spiele ich sehr gerne Fußball',
      explanation: 'Position 1: "In meiner Freizeit", Position 2: Verb "spiele", Position 3: Subjekt "ich".'
    }
  ]
};
