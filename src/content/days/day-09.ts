import { DayLesson } from '../../core/types/curriculum';

export const day09: DayLesson = {
  dayNumber: 9,
  dayId: 'day-09',
  title: 'Tage und Uhrzeit (Wochentage & Zeitangaben)',
  goal: 'Du lernst die 7 Wochentage, Tageszeiten und die Grundlagen der deutschen Uhrzeit.',
  objective: 'Wochentage mit der Präposition "am" benutzen (am Montag), Uhrzeiten mit "um" angeben (um 8 Uhr) und zeitliche Abläufe formulieren.',
  explanation: 'Alle Wochentage im Deutschen sind maskulin (der Montag, der Dienstag...) und verlangen bei Datums-/Tagesangaben die Präposition "am" (an + dem = am). Uhrzeiten verlangen die Präposition "um" (um wie viel Uhr? -> um acht Uhr).',
  phase: 2,
  phaseTitle: 'Phase 2: Bausteine & Nomen',
  concept: {
    summary: 'Montag bis Sonntag. Präposition am für Tage (am Montag). Präposition um für Uhrzeiten (um 8 Uhr).',
    rules: [
      '• Die 7 Wochentage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.',
      '• Feste Präposition für Tage & Tageszeiten: am (am Montag, am Morgen, am Abend). Ausnahme: in der Nacht!',
      '• Feste Präposition für Uhrzeiten: um (um 8 Uhr, um halb neun).',
      '• Gestern (yesterday), heute (today), morgen (tomorrow), jetzt (now), später (later).',
      '• "halb neun" bedeutet 8:30 Uhr (halb VOR 9, also eine halbe Stunde bis 9)!'
    ],
    formula: 'am + Wochentag / Tageszeit | um + Uhrzeit (z.B. am Freitag um 14 Uhr)'
  },
  grammar: {
    title: 'Temporale Präpositionen: AM vs. UM',
    explanation: 'Für Tage, Wochentage und Tageszeiten gilt die Dativverschmelzung "an + dem = am". Für exakte Zeitpunkte (Uhrzeiten) steht immer die feste Präposition "um".',
    formula: 'Wann? -> am + Tag (am Dienstag) | Um wie viel Uhr? -> um + Uhrzeit (um 15 Uhr)',
    examples: [
      'Heute ist Montag und morgen ist Dienstag.',
      'Am Freitag habe ich keinen Unterricht.',
      'Die Schule beginnt um acht Uhr morgens.',
      'Am Wochenende treffe ich meine Freunde.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Uhr', rule: 'Langes U [uːɐ̯], das h ist stumm und dehnt den Vokal', examples: ['Uhr', 'Uhrzeit'] },
    { sound: 'Mittwoch', rule: 'Doppel-T verkürzt das i [mɪtvɔx], ch am Ende als Ach-Laut', examples: ['Mittwoch', 'Woche'] }
  ],
  vocabulary: [
    {
      id: 'd9-v1',
      german: 'der Montag',
      english: 'Monday',
      french: 'lundi',
      arabicClue: 'الإثنين',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Erster Schultag der Woche'
    },
    {
      id: 'd9-v2',
      german: 'der Freitag',
      english: 'Friday',
      french: 'vendredi',
      arabicClue: 'الجمعة',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Freitag vor dem Wochenende'
    },
    {
      id: 'd9-v3',
      german: 'das Wochenende',
      english: 'weekend',
      french: 'le week-end',
      arabicClue: 'عطلة نهاية الأسبوع',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Woche + Ende = das Wochenende'
    },
    {
      id: 'd9-v4',
      german: 'die Uhr / Uhrzeit',
      english: 'clock / time / o\'clock',
      french: 'heure / horloge',
      arabicClue: 'ساعة / وقت',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Um wie viel Uhr?'
    },
    {
      id: 'd9-v5',
      german: 'gestern',
      english: 'yesterday',
      french: 'hier',
      arabicClue: 'أمس / البارحة',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Der Tag vor heute'
    },
    {
      id: 'd9-v6',
      german: 'später',
      english: 'later',
      french: 'plus tard',
      arabicClue: 'لاحقاً',
      gender: null,
      partOfSpeech: 'phrase',
      memoryClue: 'Bis später!'
    }
  ],
  examples: [
    'Heute ist Samstag und ich habe frei.',
    'Am Montag um acht Uhr beginnt die Schule.',
    'Gestern war Sonntag und morgen ist Dienstag.',
    'Wir sehen uns später um halb drei.',
    'Am Wochenende lerne ich zwei Stunden Deutsch.'
  ],
  speakingModel: {
    german: 'Heute ist Montag. Um acht Uhr gehe ich zur Schule. Am Nachmittag treffe ich Freunde. Bis später!',
    english: 'Today is Monday. At eight o\'clock I go to school. In the afternoon I meet friends. See you later!',
    french: 'Aujourd\'hui c\'est lundi. À huit heures je vais à l\'école. L\'après-midi je retrouve des amis. À plus tard !',
    note: 'Verbinde Wochentage und Uhrzeiten fließend: "Am Montag um acht Uhr...".'
  },
  mnemonicTrick: {
    tip: 'Vorsicht bei deutscher Uhrzeit: "halb acht" bedeutet NICHT 8:30, sondern 7:30 (eine halbe Stunde VOR 8)! Denke: Die 8. Stunde ist erst halb voll.',
    warning: 'Verwechsle nicht "am" und "um": "am Montag" (am Tag), aber "um 8 Uhr" (an der Uhr).'
  },
  practiceTask: 'Schreibe deinen Wochenplan auf Deutsch auf: Schreibe für jeden Tag von Montag bis Sonntag einen Satz mit Uhrzeit.',
  dailyChallenge: 'Sage die 7 Wochentage in unter 5 Sekunden fehlerfrei auf Deutsch auf.',
  reviewItems: [
    { id: 'd9-r1', front: 'Welche Präposition nutzt man für Wochentage?', back: 'am (z.B. am Montag, am Wochenende)' },
    { id: 'd9-r2', front: 'Welche Präposition nutzt man für Uhrzeiten?', back: 'um (z.B. um 8 Uhr, um halb neun)' },
    { id: 'd9-r3', front: 'Wie viel Uhr ist "halb zehn"?', back: '9:30 Uhr (eine halbe Stunde vor zehn)' },
    { id: 'd9-r4', front: 'Welchen Artikel haben die Wochentage im Deutschen?', back: 'Immer "der" (der Montag, der Dienstag...)' }
  ],
  completionRequirement: 'Erreiche mindestens 80% im Zeit-Quiz und bilde 3 korrekte Terminsätze mit "am" und "um".',
  exercises: [
    {
      id: 'ex-9-1',
      type: 'multiple-choice',
      prompt: '"Der Unterricht beginnt _____ Montag _____ acht Uhr." Welche Präpositionen fehlen?',
      question: 'Wähle das richtige Präpositionspaar:',
      options: [
        'am / um',
        'um / am',
        'im / um'
      ],
      correctAnswer: 'am / um',
      explanation: 'Für Wochentage gilt "am Montag", für Uhrzeiten gilt "um acht Uhr".'
    },
    {
      id: 'ex-9-2',
      type: 'multiple-choice',
      prompt: 'Dein Freund sagt: "Wir treffen uns um halb vier." Um wie viel Uhr trefft ihr euch digital?',
      question: 'Welche Uhrzeit ist gemeint?',
      options: [
        '15:30 Uhr (3:30)',
        '16:30 Uhr (4:30)',
        '14:30 Uhr (2:30)'
      ],
      correctAnswer: '15:30 Uhr (3:30)',
      explanation: '"halb vier" bedeutet im Deutschen eine halbe Stunde vor vier, also genau 3:30 bzw. 15:30 Uhr.'
    },
    {
      id: 'ex-9-3',
      type: 'syntax-order',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge mit "Am Freitag" als Satzanfang:',
      question: 'Ordne die Wörter:',
      words: ['Am Freitag', 'haben', 'wir', 'um', 'zehn Uhr', 'Pause'],
      correctAnswer: 'Am Freitag haben wir um zehn Uhr Pause',
      explanation: 'Position 1: "Am Freitag", Position 2: Verb "haben", gefolgt vom Subjekt "wir" und der Uhrzeit.'
    }
  ]
};
