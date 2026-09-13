import { DayLesson } from '../../core/types/curriculum';

export const day17: DayLesson = {
  dayNumber: 17,
  dayId: 'day-17',
  title: 'Adjektive (Prädikative Verwendung & Gegenteile)',
  goal: 'Du beschreibst Personen, Gegenstände und Zustände mit passenden Eigenschaftswörtern.',
  objective: 'Adjektive nach "sein / finden" ohne Endung anwenden (prädikativ) und 8 wichtige Gegenteil-Paare beherrschen.',
  explanation: 'Das Schöne im Deutschen: Steht ein Adjektiv HINTER dem Nomen mit "sein" oder "finden" (prädikative Verwendung), wird es NICHT dekliniert und bekommt KEINE Endung! (z.B. "Der Tisch ist groß. Die Schule ist groß. Das Buch ist groß.").',
  phase: 3,
  phaseTitle: 'Phase 3: Kasus & Modale',
  concept: {
    summary: 'Nach sein/werden/finden: Adjektiv bleibt in der Grundform ohne Endung! Wichtige Paare: groß/klein, alt/neu, gut/schlecht.',
    rules: [
      '• Prädikativ: Subjekt + sein + Adjektiv (ohne Endung!): "Das Auto ist schnell."',
      '• Wichtige Paare: gut - schlecht, groß - klein, alt - neu / jung, schnell - langsam, leicht - schwer, teuer - billig.',
      '• Gefühlszustände: müde (tired), glücklich (happy), traurig (sad), hungrig (hungry).'
    ],
    formula: 'Nomen + sein (ist / sind) + Adjektiv-Grundform (KEINE Endung!)'
  },
  grammar: {
    title: 'Die prädikative Verwendung von Adjektiven',
    explanation: 'Während im Französischen Adjektive immer nach Geschlecht und Zahl angepasst werden ("Le livre est grand / La table est grande"), bleibt das deutsche Adjektiv nach "sein" unveränderlich wie im Englischen ("The book is big / The table is big").',
    formula: 'der/die/das + Nomen + ist/sind + [Adjektiv unverändert]',
    examples: [
      'Das Buch ist sehr interessant.',
      'Die deutsche Sprache ist wunderschön und logisch.',
      'Meine Schule ist alt, aber mein Klassenzimmer ist modern.',
      'Die Aufgaben sind heute nicht schwer.'
    ]
  },
  pronunciationNotes: [
    { sound: 'sch- in schnell / schwer', rule: 'Deutlicher Sh-Laut [ʃ] (schnell, schwer, schön)', examples: ['schnell', 'schwer', 'schön'] },
    { sound: 'ig in fleißig / traurig', rule: 'Klingt wie weiches "-ich" [ɪç]', examples: ['fleißig', 'traurig', 'billig'] }
  ],
  vocabulary: [
    {
      id: 'd17-v1',
      german: 'gut / schlecht',
      english: 'good / bad',
      french: 'bon / mauvais',
      arabicClue: 'جيد / سيء',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Basis-Bewertung'
    },
    {
      id: 'd17-v2',
      german: 'groß / klein',
      english: 'big (tall) / small',
      french: 'grand / petit',
      arabicClue: 'كبير / صغير',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Größenvergleich'
    },
    {
      id: 'd17-v3',
      german: 'alt / neu',
      english: 'old / new',
      french: 'vieux / nouveau',
      arabicClue: 'قديم / جديد',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Alter von Gegenständen'
    },
    {
      id: 'd17-v4',
      german: 'schnell / langsam',
      english: 'fast / slow',
      french: 'rapide / lent',
      arabicClue: 'سريع / بطيء',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Geschwindigkeit'
    },
    {
      id: 'd17-v5',
      german: 'interessant',
      english: 'interesting',
      french: 'intéressant',
      arabicClue: 'مثير للاهتمام / شيق',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Spannender Inhalt'
    }
  ],
  examples: [
    'Ich bin heute sehr glücklich und motiviert.',
    'Der deutsche Satzbau ist logisch und klar.',
    'Das neue Handy ist leider sehr teuer.',
    'Der Unterricht bei Herrn Müller ist nie langweilig.'
  ],
  speakingModel: {
    german: 'Ich bin müde, aber glücklich. Das Buch ist gut. Die Schule ist groß. Der Computer ist schnell und neu.',
    english: 'I am tired, but happy. The book is good. The school is big. The computer is fast and new.',
    french: 'Je suis fatigué, mais heureux. Le livre est bon. L\'école est grande. L\'ordinateur est rapide et neuf.',
    note: 'Sprich die Adjektive mit Nachdruck aus: gut, groß, neu, schnell.'
  },
  mnemonicTrick: {
    tip: 'Lerne Adjektive immer paarweise mit ihrem Gegenteil: groß <-> klein, alt <-> neu, schnell <-> langsam. So lernst du doppelt so schnell!',
    warning: 'Hänge nach "ist" keine Endungen an! Nicht: "Die Schule ist große", sondern immer: "Die Schule ist groß"!'
  },
  practiceTask: 'Beschreibe 5 Gegenstände in deiner Wohnung mit je zwei Adjektiven (z.B. "Mein Bett ist groß und bequem.").',
  dailyChallenge: 'Finde zu 6 deutschen Adjektiven das genaue deutsche Gegenteil aus dem Kopf.',
  reviewItems: [
    { id: 'd17-r1', front: 'Welche Endung hat das Adjektiv im Satz "Die Tasche ist schön"?', back: 'Keine Endung! Nach "sein" bleibt das Adjektiv in der Grundform.' },
    { id: 'd17-r2', front: 'Was ist das Gegenteil von "schnell"?', back: 'langsam' },
    { id: 'd17-r3', front: 'Was ist das Gegenteil von "schwer"?', back: 'leicht (oder einfach)' },
    { id: 'd17-r4', front: 'Wie übersetzt man: "Der Computer ist neu"?', back: 'The computer is new / L\'ordinateur est neuf.' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Adjektiv-Quiz und wende die Gegenteile korrekt an.',
  exercises: [
    {
      id: 'ex-17-1',
      type: 'multiple-choice',
      prompt: '"Die deutsche Sprache ist sehr _____." Welche Form ist grammatikalisch korrekt?',
      question: 'Wähle das richtige Adjektiv nach "ist":',
      options: [
        'interessant',
        'interessante',
        'interessantes'
      ],
      correctAnswer: 'interessant',
      explanation: 'Nach dem Verb "sein" ("ist") bleibt das Adjektiv immer in der Grundform ohne Endung.'
    },
    {
      id: 'ex-17-2',
      type: 'multiple-choice',
      prompt: 'Was ist das Gegenteil von "teuer"?',
      question: 'Wähle das passende Antonym:',
      options: [
        'billig / günstig',
        'schlecht',
        'alt'
      ],
      correctAnswer: 'billig / günstig',
      explanation: 'Das Gegenteil von teuer (expensive) ist billig oder günstig (cheap / affordable).'
    },
    {
      id: 'ex-17-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Mein Zimmer', 'ist', 'klein', 'aber', 'sehr gemütlich'],
      correctAnswer: 'Mein Zimmer ist klein aber sehr gemütlich',
      explanation: 'Subjekt ("Mein Zimmer") + Verb ("ist") + Adjektive mit Konnektor "aber".'
    }
  ]
};
