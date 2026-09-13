import { DayLesson } from '../../core/types/curriculum';

export const day13: DayLesson = {
  dayNumber: 13,
  dayId: 'day-13',
  title: 'Wichtige Alltagsverben (Kern-Wortschatz)',
  goal: 'Du erweiterst deinen aktiven Kernwortschatz um die wichtigsten 15 Verben des Alltags.',
  objective: '15 elementare Handlungsverben (machen, gehen, kommen, lernen, lesen, schreiben, sprechen, essen, trinken, schlafen, sehen, hören, spielen, wohnen, arbeiten) sicher verstehen und anwenden.',
  explanation: 'Verben sind der Motor jedes deutschen Satzes. Wenn du die 15 Kernverben kennst, kannst du bereits über 70% aller alltäglichen Aktivitäten (Essen, Trinken, Lernen, Schlafen, Arbeiten) präzise ausdrücken.',
  phase: 2,
  phaseTitle: 'Phase 2: Bausteine & Nomen',
  concept: {
    summary: '15 Kernverben: machen, gehen, kommen, lernen, lesen, schreiben, sprechen, essen, trinken, schlafen, sehen, hören, spielen, wohnen, arbeiten.',
    rules: [
      '• Lerne Verben immer mit einem festen Mustersatz: lesen -> "Ich lese ein Buch."',
      '• Bestimmte Verben verlangen Vokalwechsel in der 2./3. Person (sprechen -> du sprichst, lesen -> du liest, essen -> du isst).',
      '• Deutsche Verben enden im Infinitiv fast immer auf -en (lernen, machen, trinken).'
    ],
    formula: 'Verb im Infinitiv (-en) -> Konjugiertes Verb im Aussagesatz auf Position 2'
  },
  grammar: {
    title: 'Aktions- und Zustandsverben im Alltag',
    explanation: 'Einige Verben beschreiben Bewegung (gehen, kommen), andere geistige Tätigkeiten (lernen, lesen, schreiben) oder physische Grundbedürfnisse (essen, trinken, schlafen).',
    formula: 'Subjekt + [Alltagsverb konjugiert] + Objekt / Zeitangabe',
    examples: [
      'Ich lerne Deutsch und du sprichst Englisch.',
      'Wir trinken morgens Tee oder Kaffee.',
      'Er wohnt in Berlin und arbeitet dort.',
      'Am Wochenende schlafe ich lange.'
    ]
  },
  pronunciationNotes: [
    { sound: 'sp- am Wortanfang', rule: 'Klingt wie "schp" [ʃp] (sprechen, spielen)', examples: ['sprechen', 'spielen'] },
    { sound: 'st- am Wortanfang', rule: 'Klingt wie "scht" [ʃt] (stehen, Stift)', examples: ['stehen', 'Stift'] }
  ],
  vocabulary: [
    {
      id: 'd13-v1',
      german: 'machen',
      english: 'to do / make',
      french: 'faire',
      arabicClue: 'يفعل / يعمل',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Universalverb: Was machst du?'
    },
    {
      id: 'd13-v2',
      german: 'gehen',
      english: 'to go / walk',
      french: 'aller',
      arabicClue: 'يذهب',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Zu Fuß gehen'
    },
    {
      id: 'd13-v3',
      german: 'sprechen',
      english: 'to speak',
      french: 'parler',
      arabicClue: 'يتكلم',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Deutsch sprechen (sp = schp)'
    },
    {
      id: 'd13-v4',
      german: 'schreiben',
      english: 'to write',
      french: 'écrire',
      arabicClue: 'يكتب',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Einen Text schreiben'
    },
    {
      id: 'd13-v5',
      german: 'trinken',
      english: 'to drink',
      french: 'boire',
      arabicClue: 'يشرب',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Wasser trinken'
    },
    {
      id: 'd13-v6',
      german: 'wohnen',
      english: 'to live / reside',
      french: 'habiter',
      arabicClue: 'يسكن',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'In einer Stadt wohnen'
    }
  ],
  examples: [
    'Ich spreche Arabisch, Französisch und jetzt Deutsch.',
    'Was machst du heute Nachmittag?',
    'Ich trinke jeden Tag frisches Wasser.',
    'Meine Familie wohnt in Tunis.',
    'Wir schreiben einen deutschen Dialog.'
  ],
  speakingModel: {
    german: 'Ich lerne Deutsch. Ich spreche Arabisch und Französisch. Ich lese ein deutsches Buch und trinke Tee.',
    english: 'I learn German. I speak Arabic and French. I read a German book and drink tea.',
    french: 'J\'apprends l\'allemand. Je parle arabe et français. Je lis un livre allemand et je bois du thé.',
    note: 'Sprich die Verben laut mit "Ich..." aus: Ich mache, ich gehe, ich spreche, ich lerne.'
  },
  mnemonicTrick: {
    tip: 'Merke dir: SP am Anfang klingt wie SCHP (sprechen = [schprechen], spielen = [schpielen])! Genau wie ST = SCHT (stehen = [schtehen]).',
    warning: 'Verwechsle nicht "wohnen" (reside/live) mit "leben" (exist/live). Man sagt: "Ich wohne in Berlin", nicht "Ich wohne das Leben".'
  },
  practiceTask: 'Wähle 8 Verben aus der Liste und schreibe mit jedem Verb einen echten Satz über deinen Alltag.',
  dailyChallenge: 'Erstelle eine Liste deiner täglichen Morgenroutine mit 5 Verben (aufstehen, waschen, essen, trinken, gehen).',
  reviewItems: [
    { id: 'd13-r1', front: 'Wie spricht man Wörter mit "sp-" am Anfang aus?', back: 'Immer als "schp" [ʃp] (z.B. sprechen, spielen).' },
    { id: 'd13-r2', front: 'Was bedeutet "wohnen" auf Englisch und Französisch?', back: 'to live/reside | habiter' },
    { id: 'd13-r3', front: 'Welche Endung haben fast alle deutschen Verben im Infinitiv?', back: 'Die Endung -en (lernen, trinken, machen).' },
    { id: 'd13-r4', front: 'Wie übersetzt man: "Ich trinke Wasser"?', back: 'I drink water / Je bois de l\'eau.' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Verben-Quiz und bilde mit 4 Verben korrekte Aussagesätze.',
  exercises: [
    {
      id: 'ex-13-1',
      type: 'multiple-choice',
      prompt: '"Ich _____ drei Sprachen: Arabisch, Französisch und Deutsch." Welches Verb passt?',
      question: 'Wähle das richtige Verb:',
      options: [
        'spreche',
        'wohne',
        'trinke'
      ],
      correctAnswer: 'spreche',
      explanation: 'Sprachen "spricht" man: "Ich spreche drei Sprachen".'
    },
    {
      id: 'ex-13-2',
      type: 'multiple-choice',
      prompt: '"Wo _____ du zurzeit?" - "In Berlin!" Welches Verb erfragt den Wohnort?',
      question: 'Wähle die passende Verbform:',
      options: [
        'wohnst',
        'lernst',
        'machst'
      ],
      correctAnswer: 'wohnst',
      explanation: 'Nach dem Wohnort fragt man mit wohnen: "Wo wohnst du?".'
    },
    {
      id: 'ex-13-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz in die richtige Reihenfolge:',
      question: 'Ordne die Satzteile:',
      words: ['Jeden Tag', 'trinke', 'ich', 'zwei Liter', 'Wasser'],
      correctAnswer: 'Jeden Tag trinke ich zwei Liter Wasser',
      explanation: 'Zeitangabe "Jeden Tag" auf Position 1, Verb "trinke" auf Position 2, Subjekt "ich" auf Position 3.'
    }
  ]
};
