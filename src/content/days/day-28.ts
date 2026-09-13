import { DayLesson } from '../../core/types/curriculum';

export const day28: DayLesson = {
  dayNumber: 28,
  dayId: 'day-28',
  title: 'Von Sätzen zum Absatz (Textlogik & Übergänge)',
  goal: 'Du verbindest isolierte Einzelsätze zu einem flüssigen, zusammenhängenden Absatz.',
  objective: 'Chronologische und logische Strukturwörter (zuerst, dann, danach, außerdem, zum Schluss) für einen 10-Zeilen-Text anwenden.',
  explanation: 'Ein guter Text besteht nicht aus 10 abgehackten Sätzen, die alle gleich anfangen. Heute lernst du rhetorische Überleitungen (Transition Words), die deine Gedanken ordnen: chronologisch (zuerst, dann, danach) und additiv (außerdem, auch, zum Schluss).',
  phase: 4,
  phaseTitle: 'Phase 4: Satzbau & Capstone',
  concept: {
    summary: 'Chronologie & Textfluss: Zuerst (first) -> Dann (then) -> Danach (after that) -> Außerdem (moreover) -> Zum Schluss (finally).',
    rules: [
      '• Übergangswörter wie zuerst, dann, danach, außerdem stehen meist auf Position 1.',
      '• Weil sie auf Position 1 stehen, folgt sofort das finite Verb auf Position 2: "Zuerst stelle ich mich vor."',
      '• Einleitung (Wer bin ich?) -> Hauptteil (Was mache ich jeden Tag?) -> Abschluss (Was ist mein Ziel?).',
      '• Vermeide Wiederholungen: Tausche Wörter durch Pronomen aus (die Schule -> sie).'
    ],
    formula: '[Übergangswort auf Pos 1] + [Verb auf Pos 2] + [Subjekt auf Pos 3] + [Rest]'
  },
  grammar: {
    title: 'Textkonnektoren und Absatzstruktur',
    explanation: 'Ein deutscher Absatz hat eine klare 3-teilige Architektur: Topic Sentence (Thema setzen), Supporting Sentences (Details & Begründungen mit weil/denn), Concluding Sentence (Zusammenfassung/Fazit).',
    formula: 'Zuerst... -> Dann... -> Danach... -> Außerdem... -> Zum Schluss...',
    examples: [
      'Zuerst stelle ich mich kurz vor.',
      'Dann erzähle ich von meiner Schule und meinen Lieblingsfächern.',
      'Danach spreche ich über meine Hobbys und meine Familie.',
      'Zum Schluss erkläre ich mein Zukunftsziel für Deutschland.'
    ]
  },
  pronunciationNotes: [
    { sound: 'zuerst', rule: 'Z beginnt mit scharfem [ts], Betonung auf der zweiten Silbe: zu-ERST [tsuːˈʔeːɐ̯st]', examples: ['zuerst', 'zuletzt'] },
    { sound: 'außerdem', rule: 'Diphthong AU gefolgt von scharfem ß und kurzem e: [ˈaʊ̯sɐˌdeːm]', examples: ['außerdem'] }
  ],
  vocabulary: [
    {
      id: 'd28-v1',
      german: 'zuerst (Position 1)',
      english: 'first / at first',
      french: 'd’abord / premièrement',
      arabicClue: 'أولاً / في البداية',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Erster Schritt'
    },
    {
      id: 'd28-v2',
      german: 'dann / danach',
      english: 'then / after that',
      french: 'ensuite / après cela',
      arabicClue: 'ثم / بعد ذلك',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Reihenfolge fortsetzen'
    },
    {
      id: 'd28-v3',
      german: 'außerdem',
      english: 'moreover / besides / furthermore',
      french: 'de plus / en outre',
      arabicClue: 'علاوة على ذلك / بالإضافة إلى ذلك',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Zusatzinformation hinzufügen'
    },
    {
      id: 'd28-v4',
      german: 'zum Schluss',
      english: 'finally / in conclusion',
      french: 'enfin / pour finir',
      arabicClue: 'في الختام / وأخيراً',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Textende abrunden'
    },
    {
      id: 'd28-v5',
      german: 'der Absatz',
      english: 'paragraph',
      french: 'le paragraphe',
      arabicClue: 'فقرة',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Zusammenhängender Textteil'
    }
  ],
  examples: [
    'Zuerst lerne ich neue Vokabeln, dann übe ich Grammatik.',
    'Danach schreibe ich einen kurzen Text über meinen Tag.',
    'Außerdem lese ich jeden Abend zehn Minuten Deutsch.',
    'Zum Schluss wiederhole ich alle schwierigen Wörter.'
  ],
  speakingModel: {
    german: 'Zuerst stelle ich mich vor. Dann erzähle ich von meiner Schule. Danach spreche ich über meine Hobbys. Außerdem liebe ich Musik. Zum Schluss nenne ich mein Ziel.',
    english: 'First I introduce myself. Then I talk about my school. After that I talk about my hobbies. Furthermore I love music. Finally I state my goal.',
    french: 'D\'abord je me présente. Ensuite je parle de mon école. Après cela je parle de mes loisirs. De plus j\'adore la musique. Pour finir j\'énonce mon objectif.',
    note: 'Beachte, wie jeder Satz mit einem neuen Strukturwort elegant in den nächsten übergeht.'
  },
  mnemonicTrick: {
    tip: 'Merke dir die Kette: ZU-DA-DA-AU-ZU (Zuerst, Dann, Danach, Außerdem, Zum Schluss). Sie verwandelt jeden Holper-Text in einen flüssigen Meisteraufsatz!',
    warning: 'Vergiss nach "dann" und "danach" nicht die Inversion: "Dann GEHE ich", NICHT "Dann ich gehe"!'
  },
  practiceTask: 'Schreibe einen zusammenhängenden Absatz mit 8 bis 10 Sätzen über deinen gestrigen Tag und nutze alle 5 Strukturwörter.',
  dailyChallenge: 'Verfasse einen 5-Zeilen-Ablauf deines Wochenendes mit "Zuerst...", "Dann...", "Danach...", "Außerdem...", "Zum Schluss...".',
  reviewItems: [
    { id: 'd28-r1', front: 'Welche Position hat das Verb nach "Danach"?', back: 'Position 2 (z.B. "Danach lerne ich Deutsch").' },
    { id: 'd28-r2', front: 'Was bedeutet "außerdem"?', back: 'moreover / besides / en outre / بالإضافة إلى ذلك.' },
    { id: 'd28-r3', front: 'Wie leitet man den letzten Gedanken eines Absatzes ein?', back: 'Zum Schluss... / Schließlich... / Am Ende...' },
    { id: 'd28-r4', front: 'Ist "Danach ich gehe schlafen" korrekt?', back: 'Nein! Richtig ist: "Danach gehe ich schlafen" (Inversion!).' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Textlogik-Quiz und bilde einen zusammenhängenden Absatz mit 4 Konnektoren.',
  exercises: [
    {
      id: 'ex-28-1',
      type: 'multiple-choice',
      prompt: 'Welcher Satz schließt eine chronologische Kette nach "Zuerst lerne ich..." am besten an?',
      question: 'Wähle den grammatikalisch und logisch richtigen Folgesatz:',
      options: [
        'Danach mache ich meine Hausaufgaben.',
        'Danach ich mache meine Hausaufgaben.',
        'Danach meine Hausaufgaben ich mache.'
      ],
      correctAnswer: 'Danach mache ich meine Hausaufgaben.',
      explanation: '"Danach" steht auf Position 1, das Verb "mache" folgt auf Position 2, Subjekt "ich" auf Position 3.'
    },
    {
      id: 'ex-28-2',
      type: 'multiple-choice',
      prompt: 'Du möchtest eine zusätzliche Information ergänzen ("besides/moreover"). Welches Wort passt?',
      question: 'Wähle das passende Textverbindungswort:',
      options: [
        'Außerdem',
        'Gestern',
        'Warum'
      ],
      correctAnswer: 'Außerdem',
      explanation: '"Außerdem" verbindet Argumente additiv und fügt neue Gedanken hinzu.'
    },
    {
      id: 'ex-28-3',
      type: 'syntax-order',
      prompt: 'Bringe den Satz in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Zum Schluss', 'wiederholen', 'wir', 'alle', 'schwierigen Wörter'],
      correctAnswer: 'Zum Schluss wiederholen wir alle schwierigen Wörter',
      explanation: 'Position 1: "Zum Schluss", Position 2: Verb "wiederholen", Position 3: Subjekt "wir".'
    }
  ]
};
