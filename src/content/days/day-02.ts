import { DayLesson } from '../../core/types/curriculum';

export const day02: DayLesson = {
  dayNumber: 2,
  dayId: 'day-02',
  title: 'Begrüßungen und Höflichkeit',
  goal: 'Du kannst Menschen begrüßen, verabschieden und höflich antworten.',
  objective: 'Formelle und informelle Begrüßungen, Abschiedsformeln und Höflichkeitsfloskeln im Alltag sicher anwenden.',
  explanation: 'Im Deutschen unterscheidet man klar zwischen formeller Anrede (mit Fremden, Vorgesetzten, Erwachsenen: "Sie / Ihnen") und informeller Anrede (mit Freunden, Familie, Mitschülern: "du / dir").',
  phase: 1,
  phaseTitle: 'Phase 1: Das Fundament',
  concept: {
    summary: 'Hallo! Guten Morgen! Guten Tag! Guten Abend! Gute Nacht! Tschüss! Auf Wiedersehen! Danke! Bitte! Entschuldigung!',
    rules: [
      '• "Wie geht es dir?" ist informell (Duz-Form). Antwort: "Mir geht es gut."',
      '• "Wie geht es Ihnen?" ist formell (Sie-Form). Großgeschriebenes "Ihnen".',
      '• "Guten Morgen" bis ca. 11 Uhr, "Guten Tag" tagsüber, "Guten Abend" ab ca. 18 Uhr.',
      '• "Gute Nacht" nur, wenn man direkt schlafen geht.',
      '• "Tschüss" ist informell (unter Freunden), "Auf Wiedersehen" formell.'
    ],
    formula: 'Gruß + Befinden-Frage + Antwort + Gegenfrage (z.B. Hallo! Wie geht\'s? Gut, danke! Und dir?)'
  },
  grammar: {
    title: 'Höflichkeitsstufen und Dativ-Floskeln',
    explanation: 'Bei "Wie geht es dir / Ihnen?" verwenden wir grammatikalisch bereits den Dativ der Personalpronomen (dir = informell, Ihnen = formell). Es ist eine feste Wendung.',
    formula: 'Wie geht es + [dir / Ihnen]? -> [Mir] geht es gut.',
    examples: [
      'Wie geht es dir? - Danke, mir geht es super!',
      'Guten Tag, Herr Weber, wie geht es Ihnen?',
      'Entschuldigung, darf ich etwas fragen?'
    ]
  },
  pronunciationNotes: [
    { sound: 'tsch', rule: 'Wie engl. ch / [tʃ] (z.B. Tschüss)', examples: ['Tschüss', 'Deutschland'] },
    { sound: 'ig am Ende', rule: 'Klingt in Deutschland meist wie "-ich" [ɪç] (Entschuldigung endet aber auf -ung)', examples: ['König', 'fertig'] },
    { sound: 'h am Wortanfang', rule: 'Klar behauchter H-Laut (Hallo, haben)', examples: ['Hallo', 'heute'] }
  ],
  vocabulary: [
    {
      id: 'd2-v1',
      german: 'Hallo!',
      english: 'Hello!',
      french: 'Salut / Bonjour!',
      arabicClue: 'مرحبا',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Universelle Begrüßung zu jeder Tageszeit'
    },
    {
      id: 'd2-v2',
      german: 'Guten Tag!',
      english: 'Good day / Hello!',
      french: 'Bonjour!',
      arabicClue: 'يوم سعيد',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Höfliche Tagesbegrüßung'
    },
    {
      id: 'd2-v3',
      german: 'Tschüss!',
      english: 'Bye!',
      french: 'Salut / Ciao!',
      arabicClue: 'مع السلامة',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Lockerer Abschied unter Freunden'
    },
    {
      id: 'd2-v4',
      german: 'Auf Wiedersehen!',
      english: 'Goodbye!',
      french: 'Au revoir!',
      arabicClue: 'إلى اللقاء',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Formeller Abschied (wörtlich: bis zum Wieder-Sehen)'
    },
    {
      id: 'd2-v5',
      german: 'Danke schön!',
      english: 'Thank you very much!',
      french: 'Merci beaucoup!',
      arabicClue: 'شكرا جزيلا',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Höfliche Danksagung'
    },
    {
      id: 'd2-v6',
      german: 'Bitte sehr!',
      english: 'You are welcome / Please!',
      french: 'Je vous en prie / De rien!',
      arabicClue: 'عفواً',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Antwort auf Danke oder freundliche Bitte'
    },
    {
      id: 'd2-v7',
      german: 'Entschuldigung!',
      english: 'Excuse me / Sorry!',
      french: 'Pardon / Excusez-moi!',
      arabicClue: 'عذراً / المعذرة',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Um Aufmerksamkeit bitten oder sich entschuldigen'
    }
  ],
  examples: [
    'Hallo! Wie geht es dir?',
    'Mir geht es sehr gut, danke.',
    'Guten Morgen, Frau Müller!',
    'Entschuldigung, wo ist der Bahnhof?',
    'Auf Wiedersehen und einen schönen Tag!'
  ],
  speakingModel: {
    german: 'Mini-Dialog: Hallo! Wie geht es dir? - Mir geht es gut, danke. Und dir? - Auch gut, danke!',
    english: 'Mini-Dialog: Hello! How are you? - I am doing well, thanks. And you? - Also good, thanks!',
    french: 'Mini-dialogue : Salut ! Comment vas-tu ? - Ça va bien, merci. Et toi ? - Bien aussi, merci !',
    note: 'Übe beide Rollen des Mini-Dialogs flüssig und mit natürlicher Satzmelodie.'
  },
  mnemonicTrick: {
    tip: 'Merke dir: "Auf Wieder-SEHEN" nutzt man, wenn man jemanden SIEHT (persönlich). Am Telefon sagt man oft "Auf Wieder-HÖREN"!',
    warning: 'Sag niemals "Gute Nacht" zur Begrüßung am Abend! "Gute Nacht" bedeutet immer "Schlaf gut" zum Abschied.'
  },
  practiceTask: 'Schreibe einen Dialog mit 6 Zeilen zwischen zwei Schülern, die sich morgens vor der Schule treffen.',
  dailyChallenge: 'Begrüße heute mindestens drei Personen in Gedanken oder laut auf Deutsch (Morgen, Tag, Abend).',
  reviewItems: [
    { id: 'd2-r1', front: 'Wie fragt man einen Mitschüler nach seinem Befinden?', back: 'Wie geht es dir? (oder kurz: Wie geht\'s?)' },
    { id: 'd2-r2', front: 'Wie fragt man einen Lehrer oder Chef höflich nach dem Befinden?', back: 'Wie geht es Ihnen?' },
    { id: 'd2-r3', front: 'Was antwortet man typischerweise auf "Danke schön"?', back: 'Bitte schön! / Bitte sehr! / Gern geschehen!' },
    { id: 'd2-r4', front: 'Wann sagt man "Gute Nacht"?', back: 'Nur unmittelbar vor dem Schlafen/Schlafengehen, niemals als Abendgruß.' }
  ],
  completionRequirement: 'Schließe das Begrüßungs-Quiz mit mindestens 80% ab und sprich den Mini-Dialog fehlerfrei.',
  exercises: [
    {
      id: 'ex-2-1',
      type: 'multiple-choice',
      prompt: 'Du triffst deinen Lehrer um 14 Uhr auf dem Flur. Wie grüßt du ihn korrekt?',
      question: 'Wähle die passende Begrüßung:',
      options: [
        'Guten Tag, Herr Müller!',
        'Gute Nacht, Herr Müller!',
        'Tschüss, Müller!'
      ],
      correctAnswer: 'Guten Tag, Herr Müller!',
      explanation: 'Tagsüber ist "Guten Tag" die höfliche Standardbegrüßung für Erwachsene und Respektspersonen.'
    },
    {
      id: 'ex-2-2',
      type: 'multiple-choice',
      prompt: 'Jemand sagt zu dir: "Vielen Dank für deine Hilfe!" Was antwortest du freundlich?',
      question: 'Wähle die passende Antwort:',
      options: [
        'Bitte sehr, gerne!',
        'Auf Wiedersehen!',
        'Entschuldigung!'
      ],
      correctAnswer: 'Bitte sehr, gerne!',
      explanation: 'Auf Dank antwortet man im Deutschen mit "Bitte", "Bitte sehr" oder "Gern geschehen".'
    },
    {
      id: 'ex-2-3',
      type: 'syntax-order',
      prompt: 'Bringe den Dialog-Satz in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Mir', 'geht', 'es', 'heute', 'gut'],
      correctAnswer: 'Mir geht es heute gut',
      explanation: 'Im Satz "Mir geht es heute gut" steht das finite Verb "geht" auf Position 2.'
    }
  ]
};
