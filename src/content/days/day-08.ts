import { DayLesson } from '../../core/types/curriculum';

export const day08: DayLesson = {
  dayNumber: 8,
  dayId: 'day-08',
  title: 'Zahlen (0 bis 100)',
  goal: 'Du lernst die Zahlen von 0 bis 20 und die Logik der Zehnerzahlen bis 100.',
  objective: 'Zahlen von 0 bis 100 verstehen, aussprechen und die deutsche "Einer-vor-Zehner"-Logik (z.B. einundzwanzig) beherrschen.',
  explanation: 'Deutsche Zahlen folgen ab 21 einem besonderen Prinzip: Zuerst wird die Einer-Stelle genannt, dann "und", dann der Zehner (z.B. 21 = ein-und-zwanzig, wörtlich: one and twenty). 16 und 17 verkürzen sich: sechzehn (ohne s), siebzehn (ohne en).',
  phase: 2,
  phaseTitle: 'Phase 2: Bausteine & Nomen',
  concept: {
    summary: '0-12: Grundzahlen. 13-19: Zahl + zehn. 20-90: Zehner mit -zig/-ßig. Ab 21: Einer + und + Zehner.',
    rules: [
      '• 0-12 sind unregelmäßig: null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf.',
      '• 13-19: Zahl + zehn (dreizehn, vierzehn...). Ausnahme: 16 (sechzehn), 17 (siebzehn).',
      '• Zehnerzahlen enden auf -zig (zwanzig, vierzig, fünfzig...). Ausnahme: 30 (dreißig mit ß!).',
      '• Zusammengesetzte Zahlen werden als EIN Wort geschrieben: 21 = einundzwanzig, 35 = fünfunddreißig.',
      '• 100 = (ein)hundert, 1000 = (ein)tausend.'
    ],
    formula: 'Ab 21: [Einerstelle] + und + [Zehnerstelle] (z.B. vier + und + zwanzig = vierundzwanzig)'
  },
  grammar: {
    title: 'Bildung zusammengesetzter Zahlen im Deutschen',
    explanation: 'Bei "eins" entfällt das -s vor "und": 21 ist "einundzwanzig" (nicht einsundzwanzig). Alle Zahlen bis 999.999 werden im Deutschen kleingeschrieben und ohne Leerzeichen zusammengezogen.',
    formula: '21 bis 99: [Einer] + "und" + [Zehner] (z.B. 47 = siebenundvierzig)',
    examples: [
      'Ich bin sechzehn Jahre alt.',
      'Das Buch hat einhundertfünfzig Seiten.',
      'Die Fahrkarte kostet zweiundzwanzig Euro.',
      'In unserer Klasse sind fünfundzwanzig Schüler.'
    ]
  },
  pronunciationNotes: [
    { sound: 'zig am Ende', rule: 'Klingt wie [-tsɪç] mit weichem ch (zwanzig, dreißig, vierzig)', examples: ['zwanzig', 'fünfzig'] },
    { sound: 'ch in sechs vs sechzehn', rule: 'sechs = [zɛks] mit k-Laut | sechzehn = [ˈzɛçtseːn] mit weichem ich-Laut!', examples: ['sechs', 'sechzehn'] }
  ],
  vocabulary: [
    {
      id: 'd8-v1',
      german: 'eins',
      english: 'one',
      french: 'un',
      arabicClue: 'واحد',
      gender: null,
      partOfSpeech: 'number',
      memoryClue: 'Zahl 1 (vor Nomen: ein/eine)'
    },
    {
      id: 'd8-v2',
      german: 'zwei',
      english: 'two',
      french: 'deux',
      arabicClue: 'اثنان',
      gender: null,
      partOfSpeech: 'number',
      memoryClue: 'Zahl 2: [tsvai]'
    },
    {
      id: 'd8-v3',
      german: 'drei',
      english: 'three',
      french: 'trois',
      arabicClue: 'ثلاثة',
      gender: null,
      partOfSpeech: 'number',
      memoryClue: 'Zahl 3: [drai]'
    },
    {
      id: 'd8-v4',
      german: 'zehn',
      english: 'ten',
      french: 'dix',
      arabicClue: 'عشرة',
      gender: null,
      partOfSpeech: 'number',
      memoryClue: 'Zahl 10: [tseen]'
    },
    {
      id: 'd8-v5',
      german: 'zwanzig',
      english: 'twenty',
      french: 'vingt',
      arabicClue: 'عشرون',
      gender: null,
      partOfSpeech: 'number',
      memoryClue: 'Zahl 20: [tsvantsiç]'
    },
    {
      id: 'd8-v6',
      german: 'dreißig',
      english: 'thirty',
      french: 'trente',
      arabicClue: 'ثلاثون',
      gender: null,
      partOfSpeech: 'number',
      memoryClue: 'Einziger Zehner mit ß: dreißig'
    },
    {
      id: 'd8-v7',
      german: 'hundert',
      english: 'hundred',
      french: 'cent',
      arabicClue: 'مائة',
      gender: null,
      partOfSpeech: 'number',
      memoryClue: 'Zahl 100: [hundert]'
    }
  ],
  examples: [
    'Ich bin 16 (sechzehn) Jahre alt.',
    'Heute ist der 21. (einundzwanzigste) Tag.',
    'Wir haben 30 (dreißig) Tage Zeit für Deutsch.',
    'Das Wörterbuch kostet 15 (fünfzehn) Euro.',
    'In der Schule lernen 500 (fünfhundert) Schüler.'
  ],
  speakingModel: {
    german: 'Eins, zwei, drei, vier, fünf, zehn, zwanzig, dreißig, einundzwanzig, hundert.',
    english: 'One, two, three, four, five, ten, twenty, thirty, twenty-one, hundred.',
    french: 'Un, deux, trois, quatre, cinq, dix, vingt, trente, vingt-et-un, cent.',
    note: 'Zähle laut von 1 bis 20 und übe danach zusammengesetzte Zahlen wie 25, 42 und 99.'
  },
  mnemonicTrick: {
    tip: 'Denke an arabische Zahlenlogik: Im Arabischen sagt man auch zuerst die Einer und dann die Zehner (خمسة وعشرون = fünf-und-zwanzig)! Genau so macht es das Deutsche.',
    warning: 'Achtung bei 16 und 17: sechzehn (NICHT sechszahn), siebzehn (NICHT siebenzehn)!'
  },
  practiceTask: 'Schreibe dein Alter, deine Telefonnummer und deine Hausnummer als ausgeschriebene deutsche Wörter auf.',
  dailyChallenge: 'Zähle laut auf Deutsch von 20 bis 40, ohne zu stocken.',
  reviewItems: [
    { id: 'd8-r1', front: 'Wie heißt die Zahl 25 auf Deutsch?', back: 'fünfundzwanzig (Einer vor Zehner!)' },
    { id: 'd8-r2', front: 'Welcher Zehner wird mit ß geschrieben?', back: 'dreißig (30)' },
    { id: 'd8-r3', front: 'Wie heißen 16 und 17 auf Deutsch?', back: 'sechzehn (ohne s) und siebzehn (ohne en)' },
    { id: 'd8-r4', front: 'Wie sagt man 100 auf Deutsch?', back: 'hundert / einhundert' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Zahlen-Quiz und bilde zusammengesetzte Zahlen fehlerfrei.',
  exercises: [
    {
      id: 'ex-8-1',
      type: 'multiple-choice',
      prompt: 'Wie heißt die Zahl 24 auf Deutsch?',
      question: 'Wähle die richtige Schreibweise:',
      options: [
        'vierundzwanzig',
        'zwanzigundvier',
        'vierzigundzwei'
      ],
      correctAnswer: 'vierundzwanzig',
      explanation: 'Im Deutschen kommt zuerst der Einer ("vier"), dann "und", dann der Zehner ("zwanzig").'
    },
    {
      id: 'ex-8-2',
      type: 'multiple-choice',
      prompt: 'Welche Zahl ist hier korrekt geschrieben?',
      question: 'Wähle die richtige Form für 16:',
      options: [
        'sechzehn',
        'sechszehn',
        'sechzig'
      ],
      correctAnswer: 'sechzehn',
      explanation: 'Bei 16 entfällt das "s" von sechs: sechzehn. (sechzig ist 60).'
    },
    {
      id: 'ex-8-3',
      type: 'syntax-order',
      prompt: 'Ordne die Wörter zur Altersangabe:',
      question: 'Bringe den Satz in die richtige Reihenfolge:',
      words: ['Ich', 'bin', 'sechzehn', 'Jahre', 'alt'],
      correctAnswer: 'Ich bin sechzehn Jahre alt',
      explanation: 'Subjekt ("Ich") + Verb ("bin") + Alterszahl ("sechzehn") + "Jahre alt".'
    }
  ]
};
