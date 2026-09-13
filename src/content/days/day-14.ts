import { DayLesson } from '../../core/types/curriculum';

export const day14: DayLesson = {
  dayNumber: 14,
  dayId: 'day-14',
  title: 'Regelmäßige Verbkonjugation (Präsens)',
  goal: 'Du beherrschst das Grundmuster aller regelmäßigen Verben im Präsens.',
  objective: 'Die Personalendungen regelmäßiger Verben (-e, -st, -t, -en, -t, -en) fehlerfrei auf beliebige Verbstämme anwenden.',
  explanation: 'Im Deutschen werden regelmäßige Verben nach einer festen Formel konjugiert: Man nimmt den Verbstamm (Infinitiv ohne "-en") und hängt die passende Personalendung an. Das gilt für über 80% aller Verben.',
  phase: 2,
  phaseTitle: 'Phase 2: Bausteine & Nomen',
  concept: {
    summary: 'Stamm + Endung: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.',
    rules: [
      '• Beispiel lernen (Stamm: lern-): ich lerne, du lernst, er lernt, wir lernen, ihr lernt, sie lernen.',
      '• Merke die Formel: e - st - t - en - t - en (Es-Te-Te-En-Te-En).',
      '• Stämme auf -t oder -d (z.B. arbeiten -> arbeit-) schieben bei du/er/ihr ein -e- ein: du arbeitest, er arbeitet.',
      '• wir und sie/Sie sind immer identisch mit dem Infinitiv!'
    ],
    formula: 'Verbstamm + [-e | -st | -t | -en | -t | -en]'
  },
  grammar: {
    title: 'Die Konjugationsformel für regelmäßige schwache Verben',
    explanation: 'Vergleiche mit dem Französischen (-e, -es, -e, -ons, -ez, -ent): Auch im Deutschen spiegelt die Endung das Subjekt wider. Im Deutschen werden aber fast alle Endungen deutlich mitgesprochen!',
    formula: 'lern + [e / st / t / en / t / en] | mach + [e / st / t / en / t / en]',
    examples: [
      'Ich mache meine Hausaufgaben.',
      'Du lernst sehr schnell Deutsch.',
      'Er spielt gerne Fußball.',
      'Wir hören gute Musik.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Endung -st', rule: 'Scharfes s gefolgt von t [st] (lernst, machst)', examples: ['lernst', 'kommst'] },
    { sound: 'Endung -t', rule: 'Kurzer, klarer Verschlusslaut am Wortende (lernt, macht)', examples: ['lernt', 'spielt'] }
  ],
  vocabulary: [
    {
      id: 'd14-v1',
      german: 'lernen (ich lerne, du lernst)',
      english: 'to learn',
      french: 'apprendre',
      arabicClue: 'يتعلم',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Musterverb für Konjugation'
    },
    {
      id: 'd14-v2',
      german: 'arbeiten (du arbeitest)',
      english: 'to work',
      french: 'travailler',
      arabicClue: 'يعمل',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Stamm auf -t: bekommt ein Extra-e'
    },
    {
      id: 'd14-v3',
      german: 'hören',
      english: 'to hear / listen',
      french: 'écouter / entendre',
      arabicClue: 'يسمع',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Musik hören'
    },
    {
      id: 'd14-v4',
      german: 'fragen',
      english: 'to ask',
      french: 'demander',
      arabicClue: 'يسأل',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Eine Frage stellen'
    },
    {
      id: 'd14-v5',
      german: 'antworten',
      english: 'to answer',
      french: 'répondre',
      arabicClue: 'يجيب',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Auf eine Frage antworten'
    }
  ],
  examples: [
    'Ich frage und du antwortest.',
    'Mein Vater arbeitet bei einer internationalen Firma.',
    'Wir hören im Unterricht genau zu.',
    'Ihr macht das wirklich großartig!'
  ],
  speakingModel: {
    german: 'Ich lerne. Du lernst. Er lernt. Wir lernen. Ihr lernt. Sie lernen. Ich lerne jeden Tag Deutsch.',
    english: 'I learn. You learn. He learns. We learn. You all learn. They learn. I learn German every day.',
    french: 'J\'apprends. Tu apprends. Il apprend. Nous apprenons. Vous apprenez. Ils apprennent. J\'apprends l\'allemand chaque jour.',
    note: 'Sage die Konjugationsreihe rhythmisch auf wie ein Gedicht: e, st, t, en, t, en.'
  },
  mnemonicTrick: {
    tip: 'Merke dir das Merkwort: "E-ST-T-EN-T-EN" (sprich: Est-ten-ten). Das sind die 6 Endungen für ich, du, er, wir, ihr, sie.',
    warning: 'Vergiss bei Verben auf -t (arbeiten, antworten) nicht das Verbindungs-e: er arbeit-e-t, nicht "er arbeitt"!'
  },
  practiceTask: 'Konjugiere die Verben "spielen", "machen" und "fragen" für alle 6 Personen komplett auf Papier.',
  dailyChallenge: 'Konjugiere laut ohne Pause: ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen.',
  reviewItems: [
    { id: 'd14-r1', front: 'Welche Endung gehört zu "du"?', back: '-st (z.B. du lernst, du machst)' },
    { id: 'd14-r2', front: 'Welche Endung gehört zu "er/sie/es"?', back: '-t (z.B. er lernt, sie macht)' },
    { id: 'd14-r3', front: 'Welche Endung gehört zu "ihr"?', back: '-t (z.B. ihr lernt, ihr spielt)' },
    { id: 'd14-r4', front: 'Wie konjugiert man "arbeiten" für "du"?', back: 'du arbeitest (mit Extra-e vor dem -st!)' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Konjugations-Quiz und wende alle 6 Endungen richtig an.',
  exercises: [
    {
      id: 'ex-14-1',
      type: 'multiple-choice',
      prompt: '"Du _____ wirklich sehr schnell!" Welches Verb ist richtig konjugiert?',
      question: 'Wähle die passende Form für "lernen":',
      options: [
        'lernst',
        'lernt',
        'lerne'
      ],
      correctAnswer: 'lernst',
      explanation: 'Die 2. Person Singular (du) hat immer die Endung -st: "du lernst".'
    },
    {
      id: 'ex-14-2',
      type: 'multiple-choice',
      prompt: '"Mein Vater _____ in Berlin." Wie heißt die richtige Form von "arbeiten"?',
      question: 'Wähle die korrekte Form für "er":',
      options: [
        'arbeitet',
        'arbeitt',
        'arbeiten'
      ],
      correctAnswer: 'arbeitet',
      explanation: 'Bei Verbstämmen auf -t wird ein e zur Ausspracheerleichterung eingeschoben: "er arbeitet".'
    },
    {
      id: 'ex-14-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Ihr', 'spielt', 'jeden Samstag', 'zusammen', 'Fußball'],
      correctAnswer: 'Ihr spielt jeden Samstag zusammen Fußball',
      explanation: 'Subjekt ("Ihr") + konjugiertes Verb ("spielt") + Zeitangabe + Rest.'
    }
  ]
};
