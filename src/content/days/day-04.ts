import { DayLesson } from '../../core/types/curriculum';

export const day04: DayLesson = {
  dayNumber: 4,
  dayId: 'day-04',
  title: 'Das Verb SEIN',
  goal: 'Du lernst das wichtigste unregelmäßige Hilfsverb: sein (to be).',
  objective: 'Die Konjugation von "sein" (bin, bist, ist, sind, seid, sind) in allen Personen automatisieren und zur Personenbeschreibung anwenden.',
  explanation: 'Das Verb "sein" ist komplett unregelmäßig (Suppletivverb) und unverzichtbar. Es beschreibt Identität (Wer bist du?), Zustand (Wie geht es dir?) und Eigenschaften (Wie ist etwas?).',
  phase: 1,
  phaseTitle: 'Phase 1: Das Fundament',
  concept: {
    summary: 'ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.',
    rules: [
      '• ich bin (I am) - am Ende kurzes, geschlossenes n.',
      '• du bist (you are) - beachte das -st am Ende.',
      '• er/sie/es ist (he/she/it is) - kurzes i.',
      '• wir sind (we are) - Auslautverhärtung: d klingt wie t [zɪnt].',
      '• ihr seid (y\'all are) - klingt wie [zaɪ̯t].',
      '• sie/Sie sind (they/you formal are) - identisch mit der wir-Form.'
    ],
    formula: 'Subjekt + [bin / bist / ist / sind / seid] + Prädikatsnomen / Adjektiv'
  },
  grammar: {
    title: 'Vollständige Konjugationstabelle von SEIN',
    explanation: 'Nach "sein" folgt im Deutschen NIEMALS ein Akkusativ, sondern immer der Nominativ (Prädikatsnomen): "Er ist ein guter Schüler."',
    formula: 'ich bin | du bist | er/sie/es ist | wir sind | ihr seid | sie/Sie sind',
    examples: [
      'Ich bin sechzehn Jahre alt.',
      'Bist du heute zu Hause?',
      'Er ist sehr freundlich und hilfsbereit.',
      'Wir sind Schüler an der Gesamtschule.',
      'Ihr seid herzlich willkommen!'
    ]
  },
  pronunciationNotes: [
    { sound: 's am Wortanfang', rule: 'Vor Vokal immer stimmhaft [z] wie eine Biene (sein, sind, seid)', examples: ['sein', 'sind', 'sie'] },
    { sound: 'd am Wortende', rule: 'Auslautverhärtung: d wird wie t gesprochen [sɪnt]', examples: ['sind', 'seid', 'und'] }
  ],
  vocabulary: [
    {
      id: 'd4-v1',
      german: 'sein',
      english: 'to be',
      french: 'être',
      arabicClue: 'يكون / كان',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Grundverb der Existenz und Identität'
    },
    {
      id: 'd4-v2',
      german: 'der Schüler',
      english: 'student (male)',
      french: 'l’élève (masc.)',
      arabicClue: 'تلميذ / طالب',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Jemand, der zur Schule geht'
    },
    {
      id: 'd4-v3',
      german: 'die Schülerin',
      english: 'student (female)',
      french: 'l’élève (fém.)',
      arabicClue: 'تلميذة / طالبة',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Weibliche Form mit Endung -in'
    },
    {
      id: 'd4-v4',
      german: 'müde',
      english: 'tired',
      french: 'fatigué',
      arabicClue: 'تعبان / متعب',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Braucht Schlaf: [müüüde]'
    },
    {
      id: 'd4-v5',
      german: 'fleißig',
      english: 'hardworking / diligent',
      french: 'travailleur / diligent',
      arabicClue: 'مجتهد',
      gender: null,
      partOfSpeech: 'adjective',
      memoryClue: 'Lernt jeden Tag fleißig'
    },
    {
      id: 'd4-v6',
      german: 'der Freund',
      english: 'friend (male)',
      french: 'l’ami',
      arabicClue: 'صديق',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Ein guter Freund fürs Leben'
    }
  ],
  examples: [
    'Ich bin Schüler und ich lerne fleißig.',
    'Du bist mein bester Freund.',
    'Berlin ist eine fantastische Stadt.',
    'Wir sind heute sehr glücklich.',
    'Sind Sie Herr Müller aus Hamburg?'
  ],
  speakingModel: {
    german: 'Ich bin Ahmed. Ich bin Schüler. Ich bin fleißig. Wir sind Freunde und wir lernen Deutsch.',
    english: 'I am Ahmed. I am a student. I am hardworking. We are friends and we learn German.',
    french: 'Je suis Ahmed. Je suis élève. Je suis travailleur. Nous sommes amis et nous apprenons l\'allemand.',
    note: 'Sprich die Sätze mit klaren Pausen laut aus. Betone: bin - bist - ist - sind.'
  },
  mnemonicTrick: {
    tip: 'Lerne den Reim: "Ich bin, du bist, er ist – wer das nicht weiß, der frisst den Mist!" :) Wir und sie haben dieselbe Form: "sind".',
    warning: 'Achtung: Sag niemals "Ich bin haben" oder "Ich sein". Das Verb muss immer zur Person gebeugt werden.'
  },
  practiceTask: 'Konjugiere das Verb sein schriftlich für alle 6 Personen und schreibe zu jeder Form einen eigenen Satz.',
  dailyChallenge: 'Stelle dich und 2 deiner Familienmitglieder laut auf Deutsch mit "sein" vor (Ich bin..., Mein Vater ist..., Wir sind...).',
  reviewItems: [
    { id: 'd4-r1', front: 'Welche Form von "sein" gehört zu "ihr"?', back: 'ihr seid' },
    { id: 'd4-r2', front: 'Welche Form von "sein" gehört zu "wir"?', back: 'wir sind' },
    { id: 'd4-r3', front: 'Welche Form von "sein" gehört zu "er/sie/es"?', back: 'er/sie/es ist' },
    { id: 'd4-r4', front: 'Wie übersetzt man "Wir sind Schüler"?', back: 'We are students / Nous sommes élèves.' }
  ],
  completionRequirement: 'Bestehe das Sein-Quiz mit 100% Richtigkeit und sage alle 6 Formen innerhalb von 5 Sekunden auf.',
  exercises: [
    {
      id: 'ex-4-1',
      type: 'multiple-choice',
      prompt: '"Du _____ mein bester Freund." Welche Form von sein passt hier?',
      question: 'Wähle die richtige Form:',
      options: [
        'bist',
        'bin',
        'ist',
        'seid'
      ],
      correctAnswer: 'bist',
      explanation: 'Die 2. Person Singular (du) von sein heißt immer "bist".'
    },
    {
      id: 'ex-4-2',
      type: 'multiple-choice',
      prompt: '"Ihr _____ heute aber sehr müde!" Welche Form von sein ist korrekt?',
      question: 'Wähle die passende Form für "ihr":',
      options: [
        'seid',
        'sind',
        'bist',
        'ist'
      ],
      correctAnswer: 'seid',
      explanation: 'Die 2. Person Plural (ihr) von sein lautet "seid".'
    },
    {
      id: 'ex-4-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz in die korrekte Reihenfolge:',
      question: 'Ordne die Satzglieder:',
      words: ['Heute', 'sind', 'wir', 'sehr', 'fleißig'],
      correctAnswer: 'Heute sind wir sehr fleißig',
      explanation: 'Zeitangabe auf Position 1 ("Heute"), finites Verb auf Position 2 ("sind"), Subjekt folgt sofort ("wir").'
    }
  ]
};
