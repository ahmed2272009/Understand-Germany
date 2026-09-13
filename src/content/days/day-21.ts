import { DayLesson } from '../../core/types/curriculum';

export const day21: DayLesson = {
  dayNumber: 21,
  dayId: 'day-21',
  title: 'Alltags-Präpositionen (mit, für, in, auf, zu, nach)',
  goal: 'Du lernst die häufigsten Präpositionen im Alltag und ihre typischen Begleiter.',
  objective: 'Häufige Präpositionen für Ort, Zeit und Zweck (mit, für, in, auf, zu, nach, bei) sicher im Kontext anwenden.',
  explanation: 'Präpositionen stellen Beziehungen zwischen Wörtern her: Begleitung (mit), Zweck (für), Ort (in, auf), Ziel (nach, zu). Einige Präpositionen verlangen feste Fälle: "für" verlangt immer den Akkusativ, "mit" verlangt immer den Dativ.',
  phase: 3,
  phaseTitle: 'Phase 3: Kasus & Modale',
  concept: {
    summary: 'mit (with), für (for), in (in), auf (on), zu (to), nach (to/after). Stehen immer vor dem Nomen oder Pronomen.',
    rules: [
      '• für + Akkusativ: für dich, für mich, für den Freund.',
      '• mit + Dativ: mit dem Freund, mit dem Bus, mit meiner Familie.',
      '• nach + Städte/Länder ohne Artikel: nach Deutschland, nach Berlin, nach Hause.',
      '• zu + Dativ: zur Schule (zu der), zum Bahnhof (zu dem).',
      '• Verschmelzungen: in + dem = im | an + dem = am | zu + der = zur | zu + dem = zum.'
    ],
    formula: 'Präposition + Nomen / Pronomen (z.B. mit dem Bus, für meine Schule)'
  },
  grammar: {
    title: 'Feste Präpositionen und typische Verschmelzungen',
    explanation: 'Im Deutschen verschmelzen Präpositionen sehr oft mit dem bestimmten Artikel zu einem einzigen Wort: in dem -> im, an dem -> am, zu der -> zur, zu dem -> zum. Das macht die Sprache flüssiger.',
    formula: 'in + dem = im | an + dem = am | zu + der = zur | zu + dem = zum',
    examples: [
      'Ich gehe jeden Morgen zur Schule.',
      'Das Geschenk ist für meinen besten Freund.',
      'Wir fahren mit dem Zug nach Hamburg.',
      'Das Buch liegt auf dem Tisch im Wohnzimmer.'
    ]
  },
  pronunciationNotes: [
    { sound: 'für', rule: 'Langes, geschlossenes Ü [fyːɐ̯] mit gespitzten Lippen', examples: ['für', 'Tür'] },
    { sound: 'nach', rule: 'Ach-Laut [naːx] tief in der Kehle nach Vokal a', examples: ['nach', 'Buch'] }
  ],
  vocabulary: [
    {
      id: 'd21-v1',
      german: 'mit (+ Dativ)',
      english: 'with',
      french: 'avec',
      arabicClue: 'مع / بواسطة',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'mit Freunden, mit dem Bus'
    },
    {
      id: 'd21-v2',
      german: 'für (+ Akkusativ)',
      english: 'for',
      french: 'pour',
      arabicClue: 'لأجل / لـ',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'für dich, für die Schule'
    },
    {
      id: 'd21-v3',
      german: 'nach',
      english: 'to (cities/countries) / after',
      french: 'vers / après',
      arabicClue: 'إلى (للمدن والبلدان) / بعد',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'nach Berlin, nach Hause'
    },
    {
      id: 'd21-v4',
      german: 'in / im',
      english: 'in / into / in the',
      french: 'dans / en',
      arabicClue: 'في',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'in der Schule, im Zimmer'
    },
    {
      id: 'd21-v5',
      german: 'auf',
      english: 'on / upon',
      french: 'sur',
      arabicClue: 'على',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'auf dem Tisch'
    }
  ],
  examples: [
    'Ich lerne jeden Tag in der Schule.',
    'Ich spiele oft mit meinem Freund Fußball.',
    'Dieses Buch ist ein Geschenk für dich.',
    'Wir fahren morgen nach Berlin.'
  ],
  speakingModel: {
    german: 'Ich lerne in der Schule. Ich spiele mit meinem Freund. Ich fahre nach Hause. Das ist für dich.',
    english: 'I study in school. I play with my friend. I travel home. That is for you.',
    french: 'J\'étudie à l\'école. Je joue avec mon ami. Je rentre à la maison. C\'est pour toi.',
    note: 'Achte auf die kurzen festen Signalwörter: in der, mit dem, nach Hause, für dich.'
  },
  mnemonicTrick: {
    tip: 'Merke dir: "nach Hause" = Zielrichtung (Ich gehe nach Hause). "zu Hause" = Ort/Zuhause sein (Ich bin zu Hause).',
    warning: 'Nach Städten und Ländern sagt man "nach" (nach Deutschland, nach Paris), niemals "zu"!'
  },
  practiceTask: 'Bilde je einen vollständigen Satz mit: mit, für, in, auf, zu und nach.',
  dailyChallenge: 'Erkläre auf Deutsch deinen Schulweg in 3 Sätzen ("Ich fahre mit...", "Ich gehe zu...", "Ich komme in...").',
  reviewItems: [
    { id: 'd21-r1', front: 'Welchen Kasus verlangt die Präposition "für"?', back: 'Immer den Akkusativ (für den Mann, für dich).' },
    { id: 'd21-r2', front: 'Welchen Kasus verlangt die Präposition "mit"?', back: 'Immer den Dativ (mit dem Freund, mit dem Bus).' },
    { id: 'd21-r3', front: 'Wie sagt man "I am at home" auf Deutsch?', back: 'Ich bin zu Hause. ("nach Hause" bedeutet going home).' },
    { id: 'd21-r4', front: 'Aus welchen zwei Wörtern besteht "im"?', back: 'in + dem = im.' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Präpositionen-Quiz und wende die Präpositionen fehlerfrei an.',
  exercises: [
    {
      id: 'ex-21-1',
      type: 'multiple-choice',
      prompt: '"Ich fahre jeden Morgen _____ dem Bus zur Schule." Welche Präposition passt für das Verkehrsmittel?',
      question: 'Wähle die passende Präposition:',
      options: [
        'mit',
        'für',
        'nach'
      ],
      correctAnswer: 'mit',
      explanation: 'Verkehrsmittel und Begleitung werden immer mit "mit" (+ Dativ) ausgedrückt: "mit dem Bus".'
    },
    {
      id: 'ex-21-2',
      type: 'multiple-choice',
      prompt: '"Dieses Wörterbuch ist _____ dich!" Welche Präposition drückt den Empfänger aus?',
      question: 'Wähle die richtige Präposition:',
      options: [
        'für',
        'mit',
        'in'
      ],
      correctAnswer: 'für',
      explanation: 'Der Zweck oder Empfänger wird mit "für" (+ Akkusativ: "für dich") formuliert.'
    },
    {
      id: 'ex-21-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz mit Präpositionen in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Nach der Schule', 'gehe', 'ich', 'mit Freunden', 'nach Hause'],
      correctAnswer: 'Nach der Schule gehe ich mit Freunden nach Hause',
      explanation: 'Position 1: "Nach der Schule", Position 2: Verb "gehe", gefolgt vom Subjekt "ich" und den Angaben.'
    }
  ]
};
