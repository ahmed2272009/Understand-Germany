import { DayLesson } from '../../core/types/curriculum';

export const day10: DayLesson = {
  dayNumber: 10,
  dayId: 'day-10',
  title: 'Artikel: der, die, das (Bestimmte Artikel & Genus)',
  goal: 'Du verstehst das deutsche Genussystem und lernst Nomen immer mit ihrem Artikel.',
  objective: 'Die 3 grammatischen Geschlechter (maskulin: der, feminin: die, neutrum: das) verstehen und 6 Kern-Schulwörter mit Artikel beherrschen.',
  explanation: 'Im Deutschen hat jedes Nomen ein grammatisches Geschlecht (Genus), das oft nichts mit dem biologischen Geschlecht zu tun hat. Lerne JEDES deutsche Nomen von Tag 1 an zusammen mit seinem Artikel (der/die/das) und seiner Pluralform.',
  phase: 2,
  phaseTitle: 'Phase 2: Bausteine & Nomen',
  concept: {
    summary: 'der = maskulin (blau), die = feminin (rot), das = neutrum (grün). Plural ist immer die.',
    rules: [
      '• der Tisch (maskulin) -> oft Werkzeuge, Tage, Monate, männliche Personen.',
      '• die Schule (feminin) -> Endungen auf -ung, -heit, -keit, -schaft, -tion, -e sind meistens feminin.',
      '• das Buch (neutrum) -> Endungen auf -chen, -lein, -um, -ment sowie viele Gegenstände.',
      '• Wichtig: Verlasse dich NIEMALS auf deine Muttersprache (z.B. im Französischen "la table" = feminin, aber im Deutschen "der Tisch" = maskulin!).'
    ],
    formula: 'der (maskulin) | die (feminin) | das (neutrum) | die (Plural)'
  },
  grammar: {
    title: 'Das grammatische Geschlecht (Genus) der Nomen',
    explanation: 'Das Genus entscheidet später über die Deklination von Adjektiven, Pronomen und Artikeln in allen vier Fällen (Nominativ, Akkusativ, Dativ, Genitiv). Wer den Artikel nicht kennt, macht in jedem Satz Fehler.',
    formula: 'Nomen immer als Einheit lernen: Artikel + Wort + Plural (z.B. das Buch, die Bücher)',
    examples: [
      'Der Tisch steht im Klassenzimmer.',
      'Die Schule hat viele helle Räume.',
      'Das Buch liegt auf dem Tisch.',
      'Die Schüler (Plural) lernen fleißig.'
    ]
  },
  pronunciationNotes: [
    { sound: 'der, die, das', rule: 'der [deːɐ̯], die [diː] mit langem i, das [das] mit kurzem a', examples: ['der Tisch', 'die Lampe', 'das Buch'] },
    { sound: 'Großschreibung', rule: 'Jedes deutsche Nomen wird IMMER großgeschrieben!', examples: ['der Tisch', 'die Schule', 'das Handy'] }
  ],
  vocabulary: [
    {
      id: 'd10-v1',
      german: 'der Tisch',
      english: 'table',
      french: 'la table',
      arabicClue: 'طاولة (مذكر بالألماني)',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Maskulin: der Tisch'
    },
    {
      id: 'd10-v2',
      german: 'die Schule',
      english: 'school',
      french: 'l’école',
      arabicClue: 'مدرسة (مؤنث)',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Endet auf -e: die Schule'
    },
    {
      id: 'd10-v3',
      german: 'das Buch',
      english: 'book',
      french: 'le livre',
      arabicClue: 'كتاب (محايد بالألماني)',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Neutrum: das Buch'
    },
    {
      id: 'd10-v4',
      german: 'der Stuhl',
      english: 'chair',
      french: 'la chaise',
      arabicClue: 'كرسي',
      gender: 'der',
      partOfSpeech: 'noun',
      memoryClue: 'Auf dem Stuhl sitzen: der Stuhl'
    },
    {
      id: 'd10-v5',
      german: 'die Tasche',
      english: 'bag',
      french: 'le sac',
      arabicClue: 'حقيبة',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Feminin auf -e: die Tasche'
    },
    {
      id: 'd10-v6',
      german: 'das Bild',
      english: 'picture / image',
      french: 'l’image / le tableau',
      arabicClue: 'صورة',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Neutrum: das Bild an der Wand'
    }
  ],
  examples: [
    'Der Tisch ist braun und der Stuhl ist bequem.',
    'Die Schule ist groß und modern.',
    'Das Buch ist sehr lehrreich.',
    'In der Tasche liegt mein Handy.',
    'An der Wand hängt ein schönes Bild.'
  ],
  speakingModel: {
    german: 'Der Tisch, die Schule, das Buch. Der Stuhl, die Tasche, das Bild. Ich lerne jedes Wort mit Artikel.',
    english: 'The table, the school, the book. The chair, the bag, the picture. I learn every word with an article.',
    french: 'La table, l\'école, le livre. La chaise, le sac, l\'image. J\'apprends chaque mot avec son article.',
    note: 'Verwende Farbcodes beim Lernen: Blau für der, Rot für die, Grün für das.'
  },
  mnemonicTrick: {
    tip: 'Lerne mit Farb-Assoziation: Blau = Männlich (der), Rot = Weiblich (die), Grün = Neutral (das). Markiere alle Vokabeln mit Textmarkern!',
    warning: 'Vergleiche das Geschlecht niemals mit Französisch oder Arabisch! "Die Sonne" ist auf Deutsch feminin, aber im Französischen "le soleil" maskulin!'
  },
  practiceTask: 'Zeichne drei Spalten (der, die, das) und sortiere 15 Gegenstände aus deiner Umgebung dort ein.',
  dailyChallenge: 'Spiele eine Runde im "Artikel-Jäger" Mini-Spiel und errate mindestens 10 Artikel fehlerfrei.',
  reviewItems: [
    { id: 'd10-r1', front: 'Welchen Artikel hat das Wort "Tisch"?', back: 'der Tisch (maskulin)' },
    { id: 'd10-r2', front: 'Welchen Artikel hat das Wort "Schule"?', back: 'die Schule (feminin)' },
    { id: 'd10-r3', front: 'Welchen Artikel hat das Wort "Buch"?', back: 'das Buch (neutrum)' },
    { id: 'd10-r4', front: 'Wie lautet der bestimmte Artikel für ALLE Pluralformen im Nominativ?', back: 'immer "die" (die Tische, die Schulen, die Bücher)' }
  ],
  completionRequirement: 'Schließe das Artikel-Quiz mit mindestens 80% ab und ordne allen Nomen den richtigen Artikel zu.',
  exercises: [
    {
      id: 'ex-10-1',
      type: 'multiple-choice',
      prompt: 'Welcher Artikel gehört zum Wort "Tisch"?',
      question: 'Wähle den korrekten Artikel:',
      options: [
        'der Tisch',
        'die Tisch',
        'das Tisch'
      ],
      correctAnswer: 'der Tisch',
      explanation: '"Tisch" ist im Deutschen grammatikalisch maskulin: der Tisch.'
    },
    {
      id: 'ex-10-2',
      type: 'multiple-choice',
      prompt: 'Welcher Artikel gehört zum Wort "Buch"?',
      question: 'Wähle den passenden Artikel:',
      options: [
        'das Buch',
        'der Buch',
        'die Buch'
      ],
      correctAnswer: 'das Buch',
      explanation: '"Buch" ist im Deutschen grammatikalisch sächlich: das Buch.'
    },
    {
      id: 'ex-10-3',
      type: 'syntax-order',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge:',
      question: 'Ordne die Wörter zum vollständigen Satz:',
      words: ['Das Buch', 'liegt', 'auf', 'dem Tisch'],
      correctAnswer: 'Das Buch liegt auf dem Tisch',
      explanation: 'Subjekt ("Das Buch") auf Position 1, finites Verb ("liegt") auf Position 2.'
    }
  ]
};
