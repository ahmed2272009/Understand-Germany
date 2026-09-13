import { DayLesson } from '../../core/types/curriculum';

export const day06: DayLesson = {
  dayNumber: 6,
  dayId: 'day-06',
  title: 'Der einfache Hauptsatz (V2-Regel)',
  goal: 'Du lernst die wichtigste deutsche Satzbauregel: Das Verb auf Position 2.',
  objective: 'Die V2-Regel (Verb an zweiter Satzstelle) in Normal- und Inversionssätzen mit Zeitangaben sicher beherrschen.',
  explanation: 'Im deutschen Hauptsatz (Aussagesatz) ist die Position des konjugierten Verbs heilig: Es steht IMMER an Position 2. Steht etwas anderes als das Subjekt auf Position 1 (z.B. eine Zeitangabe), rutscht das Subjekt hinter das Verb (Inversion).',
  phase: 1,
  phaseTitle: 'Phase 1: Das Fundament',
  concept: {
    summary: 'Normal: Subjekt + Verb + Rest. Inversion: Zeit/Ort + Verb + Subjekt + Rest.',
    rules: [
      '• Regel 1: Das konjugierte Verb steht immer auf Position 2 im Hauptsatz.',
      '• Regel 2: Auf Position 1 kann fast jedes Satzglied stehen (Subjekt, Zeit, Ort, Objekt).',
      '• Regel 3: Steht z.B. "Heute" auf Position 1, folgt sofort das Verb ("lerne") und erst danach das Subjekt ("ich"): "Heute lerne ich Deutsch."',
      '• Merke: "Heute ich lerne" ist im Deutschen ein schwerer Fehler!'
    ],
    formula: 'Position 1 + Verb (Pos 2) + Subjekt (Pos 3) + Rest (Pos 4)'
  },
  grammar: {
    title: 'Die unverrückbare V2-Stellung (Verbzweitstellung)',
    explanation: 'Position 1 kann aus einem einzelnen Wort ("Heute") oder einer ganzen Wortgruppe ("Am frühen Morgen") bestehen. Das gesamte Element zählt als Position 1. Unmittelbar danach folgt das finite Verb.',
    formula: '[Element 1] + [FINITES VERB] + [Subjekt] + [Objekt / Adverbial]',
    examples: [
      'Ich lerne heute Deutsch. (Subjekt auf Pos 1)',
      'Heute lerne ich Deutsch. (Zeit auf Pos 1 -> Inversion)',
      'Deutsch lerne ich heute. (Objekt auf Pos 1 -> Inversion)',
      'Am Nachmittag spielen wir Fußball.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Satzmelodie', rule: 'Im deutschen Aussagesatz sinkt die Stimme am Satzende deutlich ab', examples: ['Ich lerne Deutsch. ↘', 'Heute lerne ich. ↘'] },
    { sound: 'h in heute', rule: 'Hauchlaut am Anfang, EU als [ɔɪ̯]', examples: ['heute', 'Häuser'] }
  ],
  vocabulary: [
    {
      id: 'd6-v1',
      german: 'heute',
      english: 'today',
      french: 'aujourd’hui',
      arabicClue: 'اليوم',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Zeitangabe: Heute lerne ich'
    },
    {
      id: 'd6-v2',
      german: 'lernen',
      english: 'to learn / study',
      french: 'apprendre',
      arabicClue: 'يتعلم',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ich lerne fleißig Deutsch'
    },
    {
      id: 'd6-v3',
      german: 'spielen',
      english: 'to play',
      french: 'jouer',
      arabicClue: 'يلعب',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Fußball spielen'
    },
    {
      id: 'd6-v4',
      german: 'der Fußball',
      english: 'soccer / football',
      french: 'le football',
      arabicClue: 'كرة القدم',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Fuß + Ball = der Fußball'
    },
    {
      id: 'd6-v5',
      german: 'morgen',
      english: 'tomorrow',
      french: 'demain',
      arabicClue: 'غداً',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Kleingeschrieben: der nächste Tag'
    },
    {
      id: 'd6-v6',
      german: 'am Abend',
      english: 'in the evening',
      french: 'le soir',
      arabicClue: 'في المساء',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Tageszeit auf Position 1'
    }
  ],
  examples: [
    'Heute lerne ich Deutsch.',
    'Morgen spielen wir Fußball im Park.',
    'Am Abend lese ich ein Buch.',
    'In Berlin wohnen meine Freunde.',
    'Jetzt trinke ich ein Glas Wasser.'
  ],
  speakingModel: {
    german: 'Heute lerne ich Deutsch. Morgen spiele ich Fußball. Am Abend lese ich mein Buch.',
    english: 'Today I learn German. Tomorrow I play soccer. In the evening I read my book.',
    french: 'Aujourd\'hui j\'apprends l\'allemand. Demain je joue au foot. Le soir je lis mon livre.',
    note: 'Achte peinlich genau darauf: Das Verb steht an zweiter Stelle, direkt nach der Zeitangabe!'
  },
  mnemonicTrick: {
    tip: 'Visualisiere die Position 2 wie einen Magneten für das Verb. Egal was auf Platz 1 hüpft (Heute, Morgen, Hier) – das Verb klebt stur auf Platz 2!',
    warning: 'Niemals aus dem Englischen/Französischen wörtlich übersetzen: "Today I learn" ist NICHT "Heute ich lerne", sondern "Heute lerne ich"!'
  },
  practiceTask: 'Forme 5 Sätze um: Setze zuerst das Subjekt an den Anfang, danach beginne mit "Heute" oder "Morgen".',
  dailyChallenge: 'Bilde 3 echte Sätze über deinen heutigen Tagesablauf und beginne jeden Satz mit einer Zeitangabe (Heute, Jetzt, Am Abend).',
  reviewItems: [
    { id: 'd6-r1', front: 'Welche Satzposition hat das konjugierte Verb im Hauptsatz?', back: 'Immer Position 2 (V2-Regel).' },
    { id: 'd6-r2', front: 'Was passiert mit dem Subjekt, wenn "Heute" auf Position 1 steht?', back: 'Es rutscht hinter das Verb auf Position 3 (Inversion).' },
    { id: 'd6-r3', front: 'Ist der Satz "Morgen ich gehe zur Schule" richtig oder falsch?', back: 'FALSCH! Richtig ist: "Morgen gehe ich zur Schule."' },
    { id: 'd6-r4', front: 'Zählt "Am frühen Morgen" als eine oder drei Positionen?', back: 'Als EINE Position (Position 1), danach folgt direkt das Verb.' }
  ],
  completionRequirement: 'Schließe das V2-Quiz mit voller Punktzahl ab und baue 3 korrekte Inversionssätze.',
  exercises: [
    {
      id: 'ex-6-1',
      type: 'multiple-choice',
      prompt: 'Welcher Satz folgt der deutschen V2-Regel korrekt?',
      question: 'Wähle den grammatikalisch richtigen Satz:',
      options: [
        'Heute lerne ich Deutsch.',
        'Heute ich lerne Deutsch.',
        'Lerne heute ich Deutsch.'
      ],
      correctAnswer: 'Heute lerne ich Deutsch.',
      explanation: '"Heute" steht auf Position 1, das Verb "lerne" auf Position 2, das Subjekt "ich" auf Position 3.'
    },
    {
      id: 'ex-6-2',
      type: 'multiple-choice',
      prompt: 'Beginne mit "Morgen": "Wir spielen Fußball."',
      question: 'Wie lautet der umgeformte Satz?',
      options: [
        'Morgen spielen wir Fußball.',
        'Morgen wir spielen Fußball.',
        'Morgen Fußball wir spielen.'
      ],
      correctAnswer: 'Morgen spielen wir Fußball.',
      explanation: 'Bei Voranstellung der Zeitangabe ("Morgen") wandert das finite Verb ("spielen") direkt an Position 2.'
    },
    {
      id: 'ex-6-3',
      type: 'syntax-order',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge mit "Am Abend" am Satzanfang:',
      question: 'Ordne die Wörter:',
      words: ['Am Abend', 'liest', 'mein', 'Vater', 'die Zeitung'],
      correctAnswer: 'Am Abend liest mein Vater die Zeitung',
      explanation: 'Position 1: "Am Abend", Position 2: "liest", gefolgt vom Subjekt "mein Vater".'
    }
  ]
};
