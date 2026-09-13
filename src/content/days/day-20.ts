import { DayLesson } from '../../core/types/curriculum';

export const day20: DayLesson = {
  dayNumber: 20,
  dayId: 'day-20',
  title: 'Das Perfekt (Die gesprochene Vergangenheit)',
  goal: 'Du lernst, über vergangene Erlebnisse mit dem Perfekt zu sprechen.',
  objective: 'Das Perfekt mit haben/sein und dem Partizip II (ge- + Stamm + -t) am Satzende sicher bilden.',
  explanation: 'Das Perfekt ist die wichtigste Zeitform für die gesprochene Vergangenheit im Alltag. Es besteht aus zwei Teilen: 1. Dem Hilfsverb "haben" oder "sein" auf Position 2. 2. Dem Partizip II (oft mit Vorsilbe "ge-") ganz am Satzende.',
  phase: 3,
  phaseTitle: 'Phase 3: Kasus & Modale',
  concept: {
    summary: 'Hilfsverb haben/sein auf Pos 2 + Partizip II (z.B. gelernt, gespielt) am Satzende.',
    rules: [
      '• Die meisten Verben bilden das Perfekt mit HABEN: Ich habe gelernt, ich habe gespielt.',
      '• Verben der Ortsveränderung (gehen, fahren, kommen) und Zustandsänderung bilden das Perfekt mit SEIN: Ich bin gegangen, ich bin gekommen.',
      '• Regelmäßiges Partizip II: ge- + Verbstamm + -t (lernen -> ge-lern-t, machen -> ge-mach-t).',
      '• Satzklammer: Das Partizip II steht IMMER an der letzten Position des Satzes!'
    ],
    formula: 'Subjekt + [haben / sein] + Mittelfeld + [Partizip II am Ende]'
  },
  grammar: {
    title: 'Die Perfekt-Konstruktion im Deutschen',
    explanation: 'Vergleiche mit dem Passé Composé im Französischen (j\'ai appris / je suis allé) oder dem Present Perfect im Englischen (I have learned): Das Deutsche nutzt dieselbe Logik (haben vs. sein), platziert aber das Partizip II strikt ans Ende der Satzklammer.',
    formula: 'haben/sein (Position 2) ... ge-Stamm-t (Satzende)',
    examples: [
      'Gestern habe ich zwei Stunden Deutsch gelernt.',
      'Wir haben am Nachmittag Fußball gespielt.',
      'Ich bin gestern um 22 Uhr ins Bett gegangen.',
      'Er ist heute früh zur Schule gefahren.'
    ]
  },
  pronunciationNotes: [
    { sound: 'ge- Vorsilbe', rule: 'Unbetontes Schwa [ɡə] (gelernt, gemacht)', examples: ['gelernt', 'gemacht'] },
    { sound: 'Endung -t im Partizip', rule: 'Klarer Verschlusslaut am Wortende (gehör-t, gespiel-t)', examples: ['gespielt', 'gekauft'] }
  ],
  vocabulary: [
    {
      id: 'd20-v1',
      german: 'gelernt (haben)',
      english: 'learned',
      french: 'appris',
      arabicClue: 'تعلّم (في الماضي)',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ich habe Deutsch gelernt'
    },
    {
      id: 'd20-v2',
      german: 'gemacht (haben)',
      english: 'done / made',
      french: 'fait',
      arabicClue: 'فعل / عمل',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Was hast du gemacht?'
    },
    {
      id: 'd20-v3',
      german: 'gespielt (haben)',
      english: 'played',
      french: 'joué',
      arabicClue: 'لعب',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Fußball gespielt'
    },
    {
      id: 'd20-v4',
      german: 'gegangen (sein)',
      english: 'gone / walked',
      french: 'allé',
      arabicClue: 'ذهب',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Bewegung -> mit sein: Ich bin gegangen'
    },
    {
      id: 'd20-v5',
      german: 'gekauft (haben)',
      english: 'bought',
      french: 'acheté',
      arabicClue: 'اشترى',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ein Buch gekauft'
    }
  ],
  examples: [
    'Gestern habe ich viele neue deutsche Wörter gelernt.',
    'Was hast du am Wochenende gemacht?',
    'Ich bin heute Morgen um sieben Uhr zur Schule gegangen.',
    'Mein Bruder hat ein neues Handy gekauft.'
  ],
  speakingModel: {
    german: 'Gestern habe ich fleißig Deutsch gelernt. Danach habe ich Fußball gespielt und bin nach Hause gegangen.',
    english: 'Yesterday I studied German diligently. Afterwards I played soccer and went home.',
    french: 'Hier j\'ai étudié l\'allemand avec assiduité. Ensuite j\'ai joué au foot et je suis rentré à la maison.',
    note: 'Achte darauf, das Hilfsverb auf Platz 2 zu setzen und das Partizip bis ans Satzende aufzusparen.'
  },
  mnemonicTrick: {
    tip: 'Merke dir: Wer sich von A nach B BEWEGT (gehen, fahren, laufen, kommen), braucht SEIN! Wer an einem Ort bleibt oder Dinge tut (lernen, machen, kaufen), braucht HABEN.',
    warning: 'Sag niemals "Ich habe gegangen"! Da "gehen" eine Ortsveränderung ist, heißt es immer "Ich bin gegangen".'
  },
  practiceTask: 'Schreibe 5 Sätze im Perfekt darüber, was du gestern alles gemacht hast (lernen, essen, trinken, gehen, spielen).',
  dailyChallenge: 'Erzähle laut auf Deutsch in 3 Sätzen deinen gestrigen Tag im Perfekt nach.',
  reviewItems: [
    { id: 'd20-r1', front: 'Aus welchen zwei Elementen besteht das deutsche Perfekt?', back: 'Hilfsverb haben/sein auf Position 2 + Partizip II am Satzende.' },
    { id: 'd20-r2', front: 'Wann bildet ein Verb das Perfekt mit "sein"?', back: 'Bei Ortsveränderung (gehen, fahren) oder Zustandsänderung (aufwachen).' },
    { id: 'd20-r3', front: 'Wie bildet man das regelmäßige Partizip II?', back: 'ge- + Verbstamm + -t (z.B. ge-mach-t, ge-lern-t).' },
    { id: 'd20-r4', front: 'Wo steht das Partizip II im Satz?', back: 'Immer ganz am Ende des Satzes (Satzklammer)!' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Perfekt-Quiz und bilde 3 korrekte Vergangenheitsklammern.',
  exercises: [
    {
      id: 'ex-20-1',
      type: 'multiple-choice',
      prompt: '"Gestern _____ ich zwei Stunden für den Test gelernt." Welches Hilfsverb passt?',
      question: 'Wähle das richtige Hilfsverb für "lernen":',
      options: [
        'habe',
        'bin',
        'werde'
      ],
      correctAnswer: 'habe',
      explanation: '"lernen" ist keine Ortsveränderung, daher bildet es das Perfekt mit "haben": "ich habe gelernt".'
    },
    {
      id: 'ex-20-2',
      type: 'multiple-choice',
      prompt: '"Am Nachmittag _____ meine Freunde zu Fuß nach Hause gegangen." Welches Hilfsverb verlangt "gehen"?',
      question: 'Wähle das passende Hilfsverb für Bewegung:',
      options: [
        'sind',
        'haben',
        'hat'
      ],
      correctAnswer: 'sind',
      explanation: '"gehen" beschreibt eine Ortsveränderung und verlangt daher das Hilfsverb "sein": "sie sind gegangen".'
    },
    {
      id: 'ex-20-3',
      type: 'syntax-order',
      prompt: 'Bringe den Perfektsatz in die richtige Satzklammer:',
      question: 'Ordne die Wörter:',
      words: ['Gestern', 'habe', 'ich', 'ein spannendes Buch', 'gelesen'],
      correctAnswer: 'Gestern habe ich ein spannendes Buch gelesen',
      explanation: 'Zeitangabe ("Gestern") + Hilfsverb ("habe") + Subjekt ("ich") + Objekt + Partizip II ("gelesen") am Ende.'
    }
  ]
};
