import { DayLesson } from '../../core/types/curriculum';

export const day01: DayLesson = {
  dayNumber: 1,
  dayId: 'day-01',
  title: 'Das Alphabet und die Aussprache',
  goal: 'Du lernst die 26 Buchstaben und die wichtigsten Laute im Deutschen.',
  objective: 'Das deutsche Alphabet (A–Z plus Ä, Ö, Ü, ß) und die 7 Schlüssel-Lautregeln sicher aussprechen und erkennen.',
  explanation: 'Das deutsche Alphabet hat 26 Standardbuchstaben und 4 Sonderzeichen: die Umlaute Ä, Ö, Ü sowie das scharfe S (Eszett ß). Die Aussprache ist weitgehend lautgetreu, folgt aber einigen festen Ausspracheregeln.',
  phase: 1,
  phaseTitle: 'Phase 1: Das Fundament',
  concept: {
    summary: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z. Dazu kommen Ä, Ö, Ü und ß.',
    rules: [
      '• W klingt wie das englische V / französisches V (z.B. Wasser, Welt).',
      '• V klingt meistens wie F (z.B. Vater, vier, Vogel). In Fremdwörtern wie W (Vase).',
      '• J klingt wie deutsches/englisches Y (z.B. Jahr, ja, jung).',
      '• Z klingt immer wie TS (z.B. Zeit, zehn, Zimmer).',
      '• SCH klingt wie sh / ch (z.B. Schule, Schnee, schön).',
      '• EI klingt wie eye / ai (z.B. mein, dein, eins).',
      '• IE klingt wie ein langes i / ee (z.B. Liebe, nie, sieben).',
      '• EU und ÄU klingen wie oy (z.B. Deutsch, Häuser).'
    ],
    formula: 'EI = [ai] | IE = [i:] | SCH = [ʃ] | Z = [ts] | W = [v] | V = [f]'
  },
  grammar: {
    title: 'Die 8 goldenen Lautregeln der deutschen Phonetik',
    explanation: 'Im Deutschen werden Buchstabenkombinationen immer einheitlich ausgesprochen. Wenn du diese 8 Lautpaare beherrschst, kannst du jedes deutsche Wort korrekt laut vorlesen.',
    formula: 'Schriftbild -> Lautwert (z.B. Z -> /ts/, V -> /f/, W -> /v/)',
    examples: [
      'Wasser [ˈvasɐ] - W wird wie engl. V gesprochen',
      'Vater [ˈfaːtɐ] - V wird wie deutsches F gesprochen',
      'Zeit [tsaɪ̯t] - Z beginnt mit scharfem T-Laut',
      'Liebe [ˈliːbə] - IE ist ein langes, weiches I'
    ]
  },
  pronunciationNotes: [
    { sound: 'W', rule: 'Stimmhafter labiodentaler Frikativ (wie engl. V)', examples: ['Wasser', 'Welt', 'wo'] },
    { sound: 'V', rule: 'Stimmloser Frikativ (wie F)', examples: ['Vater', 'viel', 'von'] },
    { sound: 'Z', rule: 'Affrikate [ts] - Zunge an die oberen Schneidezähne', examples: ['Zeit', 'Zug', 'Zimmer'] },
    { sound: 'EI vs IE', rule: 'EI = [ai] (breit), IE = [i:] (lang und geschlossen)', examples: ['mein (EI)', 'Liebe (IE)'] }
  ],
  vocabulary: [
    {
      id: 'd1-v1',
      german: 'das Wasser',
      english: 'water',
      french: 'l’eau',
      arabicClue: 'ماء (W = v)',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'W klingt wie englisches V: [Vasser]'
    },
    {
      id: 'd1-v2',
      german: 'der Vater',
      english: 'father',
      french: 'le père',
      arabicClue: 'أب (V = f)',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'V klingt wie deutsches F: [Fater]'
    },
    {
      id: 'd1-v3',
      german: 'die Zeit',
      english: 'time',
      french: 'le temps',
      arabicClue: 'وقت (Z = ts)',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Z klingt wie TS: [Tseit]'
    },
    {
      id: 'd1-v4',
      german: 'die Schule',
      english: 'school',
      french: 'l’école',
      arabicClue: 'مدرسة (SCH = sh)',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'SCH = englisches SH: [Shule]'
    },
    {
      id: 'd1-v5',
      german: 'das Jahr',
      english: 'year',
      french: 'l’année',
      arabicClue: 'سنة (J = y)',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'J klingt wie deutsches Y: [Yahr]'
    },
    {
      id: 'd1-v6',
      german: 'Deutsch',
      english: 'German',
      french: 'l’allemand',
      arabicClue: 'ألماني (EU = oy)',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'EU klingt wie OY: [Doytsh]'
    }
  ],
  examples: [
    'Das Wasser ist kalt.',
    'Mein Vater liest ein Buch.',
    'Wir haben jetzt keine Zeit.',
    'Die Schule beginnt um acht Uhr.',
    'Ich lerne dieses Jahr Deutsch.'
  ],
  speakingModel: {
    german: 'Sprich langsam: Wasser, Vater, Jahr, Zeit, Schule, mein, Liebe, Deutsch.',
    english: 'Speak slowly: Water, Father, Year, Time, School, My, Love, German.',
    french: 'Parlez lentement : eau, père, année, temps, école, mon, amour, allemand.',
    note: 'Sprich jeden Laut übertrieben deutlich aus. Achte besonders auf den Unterschied zwischen W [v] und V [f].'
  },
  mnemonicTrick: {
    tip: 'Merke dir das V-F-Paar: Vaters Vogel fliegt (V klingt wie F). Bei W denk an englisch: Water -> Wasser.',
    warning: 'Verwechsle niemals EI (sprich: Ei/Eye) und IE (sprich: langes Iee)! Der Buchstabe, der hinten steht, bestimmt die Aussprache.'
  },
  practiceTask: 'Lies zehn deutsche Wörter laut vor. Markiere W, V, J, Z, SCH, EI und IE mit verschiedenen Farben.',
  dailyChallenge: 'Buchstabiere deinen Vor- und Nachnamen komplett auf Deutsch laut und nenne zu jedem Buchstaben ein deutsches Wort.',
  reviewItems: [
    { id: 'd1-r1', front: 'Wie wird der Buchstabe W im Deutschen ausgesprochen?', back: 'Wie das englische V (stimmhaft, z.B. Wasser).' },
    { id: 'd1-r2', front: 'Wie wird der Buchstabe V im Deutschen meistens ausgesprochen?', back: 'Wie der Buchstabe F (z.B. Vater, vier).' },
    { id: 'd1-r3', front: 'Wie unterscheiden sich EI und IE in der Aussprache?', back: 'EI = [ai] wie engl. "eye" (mein) | IE = [i:] wie langes deutsches "i" (Liebe).' },
    { id: 'd1-r4', front: 'Wie klingt der Buchstabe Z im Deutschen?', back: 'Immer wie [ts] (z.B. Zeit, zehn).' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Aussprache-Quiz und sprich das Sprechmodell dreimal laut nach.',
  exercises: [
    {
      id: 'ex-1-1',
      type: 'multiple-choice',
      prompt: 'Wie wird der Buchstabe V im Wort "Vater" ausgesprochen?',
      question: 'Wähle den korrekten Lautwert:',
      options: [
        'Wie ein deutsches F [f]',
        'Wie ein englisches W [w]',
        'Wie ein weiches B [b]'
      ],
      correctAnswer: 'Wie ein deutsches F [f]',
      explanation: 'Im Deutschen wird das V in echten deutschen Wörtern wie ein F gesprochen (Vater, Vogel, vier).'
    },
    {
      id: 'ex-1-2',
      type: 'multiple-choice',
      prompt: 'Welche Lautkombination klingt wie das englische Wort "eye"?',
      question: 'Wähle die richtige Buchstabenfolge:',
      options: [
        'EI (z.B. mein, dein)',
        'IE (z.B. Liebe, sieben)',
        'EU (z.B. heute, Leute)'
      ],
      correctAnswer: 'EI (z.B. mein, dein)',
      explanation: 'EI wird im Deutschen immer wie [ai] (wie "eye") gesprochen. IE hingegen ist ein langes [i:].'
    },
    {
      id: 'ex-1-3',
      type: 'syntax-order',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge für die Begrüßung:',
      question: 'Ordne die Wörter:',
      words: ['Ich', 'lerne', 'heute', 'Deutsch'],
      correctAnswer: 'Ich lerne heute Deutsch',
      explanation: 'Im deutschen Aussagesatz steht das konjugierte Verb ("lerne") immer auf Position 2.'
    }
  ]
};
