import { DayLesson } from '../../core/types/curriculum';

export const day03: DayLesson = {
  dayNumber: 3,
  dayId: 'day-03',
  title: 'Personalpronomen',
  goal: 'Du lernst die Personen kennen, die du für fast jeden deutschen Satz brauchst.',
  objective: 'Alle 9 Personalpronomen im Nominativ (ich, du, er, sie, es, wir, ihr, sie, Sie) fehlerfrei zuordnen und anwenden.',
  explanation: 'Personalpronomen ersetzen Nomen und bestimmen die Endung des Verbs. Achte besonders auf die dreifache Bedeutung von "sie/Sie" (sie = she, sie = they, Sie = you formal).',
  phase: 1,
  phaseTitle: 'Phase 1: Das Fundament',
  concept: {
    summary: 'ich = I, du = you informal, er = he, sie = she, es = it, wir = we, ihr = you plural, sie = they, Sie = you formal.',
    rules: [
      '• ich (1. Person Singular): immer kleingeschrieben im Satz (außer am Satzanfang).',
      '• du (2. Person Singular): für Freunde, Familie, Mitschüler und Kinder.',
      '• er / sie / es (3. Person Singular): maskulin (der Tisch -> er), feminin (die Schule -> sie), neutrum (das Buch -> es).',
      '• wir (1. Person Plural): ich + andere Personen.',
      '• ihr (2. Person Plural): mehrere Freunde/Mitschüler (ihr alle).',
      '• sie (3. Person Plural): andere Personen in der Mehrzahl (they).',
      '• Sie (Höflichkeitsform Singular & Plural): immer GROSS geschrieben!'
    ],
    formula: 'Singular: ich, du, er/sie/es | Plural: wir, ihr, sie | Höflich: Sie'
  },
  grammar: {
    title: 'Das System der 9 Personalpronomen im Nominativ',
    explanation: 'Im Deutschen richtet sich das Pronomen bei Dingen nach dem grammatischen Geschlecht (Genus) des Nomens: "Der Tisch ist neu. Er ist schön." "Die Schule ist groß. Sie ist alt." "Das Buch ist gut. Es ist spannend."',
    formula: 'der-Nomen -> er | die-Nomen -> sie | das-Nomen -> es',
    examples: [
      'Ich bin Schüler und du bist mein Freund.',
      'Wo ist der Schlüssel? - Er liegt auf dem Tisch.',
      'Wo ist die Tasche? - Sie ist hier.',
      'Wo ist das Handy? - Es liegt im Auto.'
    ]
  },
  pronunciationNotes: [
    { sound: 'ch in ich', rule: 'Ich-Laut [ç]: Weicher Reibelaut am vorderen Gaumen, kein "sch" und kein "k"!', examples: ['ich', 'nicht', 'mich'] },
    { sound: 'ihr', rule: 'Langes [i:] mit dezent vokalisiertem r [iːɐ̯]', examples: ['ihr', 'wir', 'mir'] },
    { sound: 'er/es', rule: 'Kurze, deutliche Vokale [eːɐ̯] und [ɛs]', examples: ['er', 'es'] }
  ],
  vocabulary: [
    {
      id: 'd3-v1',
      german: 'ich',
      english: 'I',
      french: 'je',
      arabicClue: 'أنا',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Erste Person Singular: ich selbst'
    },
    {
      id: 'd3-v2',
      german: 'du',
      english: 'you (informal singular)',
      french: 'tu',
      arabicClue: 'أنتَ / أنتِ',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Dein Freund, eine einzelne Person'
    },
    {
      id: 'd3-v3',
      german: 'er',
      english: 'he / it (masculine)',
      french: 'il',
      arabicClue: 'هو',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Ersetzt der-Nomen (der Mann, der Tisch)'
    },
    {
      id: 'd3-v4',
      german: 'sie (Sg.)',
      english: 'she / it (feminine)',
      french: 'elle',
      arabicClue: 'هي',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Ersetzt die-Nomen (die Frau, die Schule)'
    },
    {
      id: 'd3-v5',
      german: 'es',
      english: 'it (neuter)',
      french: 'il/elle (neutre)',
      arabicClue: 'هو/هي للمحايد',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Ersetzt das-Nomen (das Kind, das Buch)'
    },
    {
      id: 'd3-v6',
      german: 'wir',
      english: 'we',
      french: 'nous',
      arabicClue: 'نحن',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Wir zusammen als Team'
    },
    {
      id: 'd3-v7',
      german: 'ihr',
      english: 'you (informal plural / y\'all)',
      french: 'vous (pluriel informel)',
      arabicClue: 'أنتم',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Mehrere Freunde (Gruppe)'
    },
    {
      id: 'd3-v8',
      german: 'Sie (formell)',
      english: 'you (formal singular & plural)',
      french: 'vous (formel)',
      arabicClue: 'حضرتك / أنتم (للاحترام)',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Immer großgeschrieben für Respekt'
    }
  ],
  examples: [
    'Ich lerne Deutsch und wir üben zusammen.',
    'Du bist sehr freundlich.',
    'Er kommt aus Deutschland und sie kommt aus Frankreich.',
    'Das Buch ist fantastisch, es hilft mir sehr.',
    'Frau Schmidt, lernen Sie auch Englisch?'
  ],
  speakingModel: {
    german: 'Ich bin Schüler. Du bist mein Freund. Er lernt viel. Wir lernen gemeinsam Deutsch.',
    english: 'I am a student. You are my friend. He learns a lot. We learn German together.',
    french: 'Je suis élève. Tu es mon ami. Il apprend beaucoup. Nous apprenons l\'allemand ensemble.',
    note: 'Betone die Pronomen rhythmisch, um ein klares Gefühl für die Subjekte zu entwickeln.'
  },
  mnemonicTrick: {
    tip: 'Denke an die 3 sie-Formen: 1) sie (klein) + Verb mit -t -> sie (she). 2) sie (klein) + Verb mit -en -> sie (they). 3) Sie (GROSS) -> Höfliches Sie (you).',
    warning: 'Verwechsle "ihr" (ihr lernt = you guys) nicht mit "wir" (wir lernen = we)!'
  },
  practiceTask: 'Bilde je einen vollständigen Satz mit ich, du, er, sie, es, wir, ihr, sie und Sie.',
  dailyChallenge: 'Ersetze 5 Gegenstände in deinem Zimmer durch ihr deutsches Pronomen (der Tisch -> er, die Lampe -> sie, das Bett -> es).',
  reviewItems: [
    { id: 'd3-r1', front: 'Welches Pronomen ersetzt "der Computer"?', back: 'er (weil der Computer maskulin ist).' },
    { id: 'd3-r2', front: 'Welches Pronomen ersetzt "die Schule"?', back: 'sie (weil die Schule feminin ist).' },
    { id: 'd3-r3', front: 'Welches Pronomen ersetzt "das Auto"?', back: 'es (weil das Auto neutrum ist).' },
    { id: 'd3-r4', front: 'Wie unterscheidet man "sie" (they) von "Sie" (you formal) im Schreiben?', back: 'Das formelle "Sie" wird immer großgeschrieben.' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Pronomen-Quiz und sprich die 9 Pronomen flüssig auf.',
  exercises: [
    {
      id: 'ex-3-1',
      type: 'multiple-choice',
      prompt: 'Welches Pronomen benutzt du, wenn du mit drei Mitschülern gleichzeitig sprichst?',
      question: 'Wähle das richtige Pronomen:',
      options: [
        'ihr (informelle Mehrzahl)',
        'du (Einzahl)',
        'er (Einzahl)'
      ],
      correctAnswer: 'ihr (informelle Mehrzahl)',
      explanation: 'Wenn du mehrere befreundete Personen direkt ansprichst, nutzt man immer "ihr".'
    },
    {
      id: 'ex-3-2',
      type: 'multiple-choice',
      prompt: '"Das Buch ist alt, aber _____ ist sehr spannend." Welches Pronomen gehört in die Lücke?',
      question: 'Wähle das passende Pronomen für "das Buch":',
      options: [
        'es',
        'er',
        'sie'
      ],
      correctAnswer: 'es',
      explanation: 'Weil "das Buch" sächlich (neutrum) ist, ersetzt man es durch das Pronomen "es".'
    },
    {
      id: 'ex-3-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz in die richtige Wortstellung:',
      question: 'Ordne die Wörter:',
      words: ['Wir', 'lernen', 'jeden', 'Tag', 'zusammen'],
      correctAnswer: 'Wir lernen jeden Tag zusammen',
      explanation: 'Subjekt ("Wir") auf Position 1, finites Verb ("lernen") auf Position 2.'
    }
  ]
};
