import { DayLesson } from '../../core/types/curriculum';

export const day19: DayLesson = {
  dayNumber: 19,
  dayId: 'day-19',
  title: 'Trennbare Verben (Präfixe am Satzende)',
  goal: 'Du verstehst trennbare Verben wie aufstehen, einkaufen und fernsehen.',
  objective: 'Trennbare Präfixe (auf-, ein-, aus-, mit-, an-, ab-) im Hauptsatz abspalten und ans Satzende setzen.',
  explanation: 'Im Deutschen haben viele Verben eine Vorsilbe (Präfix). Bei trennbaren Verben trennt sich das Präfix im Hauptsatz vom Verbstamm: Der Verbstamm wird normal konjugiert und steht auf Position 2, während das Präfix wie eine Raketenstufe abfällt und ganz ans Satzende fliegt!',
  phase: 3,
  phaseTitle: 'Phase 3: Kasus & Modale',
  concept: {
    summary: 'aufstehen -> Ich stehe um 7 Uhr auf. einkaufen -> Ich kaufe heute ein. fernsehen -> Ich sehe abends fern.',
    rules: [
      '• Typische trennbare Präfixe: auf-, ab-, an-, aus-, ein-, mit-, vor-, zu-, zurück-.',
      '• Der Verbstamm steht konjugiert auf Position 2.',
      '• Das Präfix steht ganz am Ende des Hauptsatzes!',
      '• Aber: Steht ein Modalverb im Satz, bleibt das trennbare Verb komplett zusammen im Infinitiv am Ende: "Ich muss um 7 Uhr aufstehen."'
    ],
    formula: 'Subjekt + [Verbstamm konjugiert] + Mittelfeld + [Präfix am Satzende!]'
  },
  grammar: {
    title: 'Die Mechanik der trennbaren Verben',
    explanation: 'Trennbare Präfixe sind im Infinitiv immer betont (AUFstehen, EINkaufen, MITkommen). Wenn die Betonung auf der Vorsilbe liegt, trennt sie sich im Hauptsatz ab.',
    formula: 'Infinitiv: [Präfix-Stamm-en] -> Hauptsatz: [Stamm] ... [Präfix].',
    examples: [
      'Ich stehe jeden Morgen um sieben Uhr auf.',
      'Meine Mutter kauft im Supermarkt ein.',
      'Wir sehen am Wochenende zusammen fern.',
      'Kommst du heute Abend mit?'
    ]
  },
  pronunciationNotes: [
    { sound: 'Betonung auf Präfix', rule: 'Trennbare Verben haben den Hauptakzent IMMER auf der Vorsilbe!', examples: ['AUFstehen', 'EINkaufen', 'MITkommen'] }
  ],
  vocabulary: [
    {
      id: 'd19-v1',
      german: 'aufstehen (ich stehe auf)',
      english: 'to get up / wake up',
      french: 'se lever',
      arabicClue: 'يستيقظ / ينهض',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Aus dem Bett aufstehen'
    },
    {
      id: 'd19-v2',
      german: 'einkaufen (ich kaufe ein)',
      english: 'to shop / buy groceries',
      french: 'faire les courses',
      arabicClue: 'يتسوق',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Im Supermarkt einkaufen'
    },
    {
      id: 'd19-v3',
      german: 'fernsehen (ich sehe fern)',
      english: 'to watch television',
      french: 'regarder la télévision',
      arabicClue: 'يشاهد التلفاز',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'In die Ferne sehen = fernsehen'
    },
    {
      id: 'd19-v4',
      german: 'mitkommen (ich komme mit)',
      english: 'to come along / join',
      french: 'venir avec / accompagner',
      arabicClue: 'يأتي مع / يرافق',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Mit Freunden mitkommen'
    },
    {
      id: 'd19-v5',
      german: 'anfangen (ich fange an)',
      english: 'to start / begin',
      french: 'commencer',
      arabicClue: 'يبدأ',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Die Schule fängt an'
    }
  ],
  examples: [
    'Ich stehe jeden Morgen pünktlich um sieben Uhr auf.',
    'Am Nachmittag kauft mein Vater im Supermarkt ein.',
    'Die Deutschstunde fängt um acht Uhr an.',
    'Kommst du heute mit ins Kino?'
  ],
  speakingModel: {
    german: 'Ich stehe früh auf. Ich kaufe im Supermarkt ein. Am Abend sehe ich fern. Kommst du mit?',
    english: 'I get up early. I shop in the supermarket. In the evening I watch TV. Are you coming along?',
    french: 'Je me lève tôt. Je fais les courses au supermarché. Le soir je regarde la télé. Tu viens avec ?',
    note: 'Betone das abgetrennte Präfix am Satzende ganz bewusst: "... stehe um sieben Uhr AUF."'
  },
  mnemonicTrick: {
    tip: 'Stelle dir das Präfix wie einen Bumerang vor: Du wirfst den Verbstamm auf Position 2, und das Präfix fliegt im hohen Bogen ganz ans Ende des Satzes!',
    warning: 'Vergiss nicht das Präfix am Ende! Ohne "auf" bedeutet "Ich stehe um sieben Uhr" nur "Ich stehe da (aufrecht)" – der Sinn verändert sich komplett!'
  },
  practiceTask: 'Bilde aus diesen Infinitiven 4 Hauptsätze: 1. aufstehen (ich, um 6 Uhr) 2. einkaufen (wir, heute) 3. mitkommen (du?) 4. anfangen (der Film, um 20 Uhr).',
  dailyChallenge: 'Beschreibe deinen typischen Tagesablauf mit 3 trennbaren Verben (aufstehen, anfangen, fernsehen).',
  reviewItems: [
    { id: 'd19-r1', front: 'Wohin wandert das Präfix eines trennbaren Verbs im Hauptsatz?', back: 'Ganz ans Satzende (z.B. "Ich stehe früh auf.")' },
    { id: 'd19-r2', front: 'Welcher Teil von "aufstehen" wird konjugiert?', back: 'Der Stamm "steh-" (ich stehe auf, du stehst auf).' },
    { id: 'd19-r3', front: 'Was passiert mit dem trennbaren Verb, wenn ein Modalverb im Satz ist?', back: 'Es bleibt ungetrennt im Infinitiv am Satzende ("Ich muss früh aufstehen").' },
    { id: 'd19-r4', front: 'Welcher Teil ist im Infinitiv "einkaufen" betont?', back: 'Das Präfix "EIN-" (EIN-kaufen).' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Quiz und platziere Präfixe fehlerfrei am Satzende.',
  exercises: [
    {
      id: 'ex-19-1',
      type: 'multiple-choice',
      prompt: '"Ich stehe jeden Morgen um sechs Uhr _____." Welches Präfix schließt das Verb "aufstehen" ab?',
      question: 'Wähle das richtige Präfix am Satzende:',
      options: [
        'auf',
        'aus',
        'an'
      ],
      correctAnswer: 'auf',
      explanation: 'Das trennbare Verb heißt "aufstehen", daher wandert das Präfix "auf" ans Satzende.'
    },
    {
      id: 'ex-19-2',
      type: 'multiple-choice',
      prompt: 'Konjugiere: "Meine Mutter (einkaufen) heute im Supermarkt _____."',
      question: 'Welche Kombination ist grammatikalisch korrekt?',
      options: [
        'kauft ... ein',
        'einkauft ...',
        'kauft ... aus'
      ],
      correctAnswer: 'kauft ... ein',
      explanation: 'Verbstamm "kauft" auf Position 2, Präfix "ein" am Satzende.'
    },
    {
      id: 'ex-19-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz mit trennbarem Verb in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Wann', 'fängt', 'der Unterricht', 'heute', 'an'],
      correctAnswer: 'Wann fängt der Unterricht heute an',
      explanation: 'W-Wort ("Wann") + Verb ("fängt") + Subjekt ("der Unterricht") + Zeit + Präfix ("an").'
    }
  ]
};
