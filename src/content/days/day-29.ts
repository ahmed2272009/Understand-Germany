import { DayLesson } from '../../core/types/curriculum';

export const day29: DayLesson = {
  dayNumber: 29,
  dayId: 'day-29',
  title: 'Der 20-Zeilen-Text (Generalprobe & Feinschliff)',
  goal: 'Du planst, schreibst und prüfst deinen persönlichen 20-Zeilen-Text.',
  objective: 'Einen kohärenten 20-Zeilen-Aufsatz über 6 thematische Blöcke strukturiert verfassen und mit dem V2-Validator selbstständig korrigieren.',
  explanation: 'Der 20-Zeilen-Text ist das Meisterwerk von Deutsch von Null. Er vereint das Alphabet (Tag 1), Pronomen (Tag 3), sein/haben (Tag 4-5), Satzbau (Tag 6), Nomen & Artikel (Tag 10-12), Verben (Tag 13-14), Negation & Kasus (Tag 15-16), Modale (Tag 18), Perfekt (Tag 20) und Konnektoren (Tag 24-28).',
  phase: 4,
  phaseTitle: 'Phase 4: Satzbau & Capstone',
  concept: {
    summary: '6 thematische Blöcke: 1. Vorstellung (Z. 1-3) 2. Schule & Alltag (Z. 4-7) 3. Sprachen & Motivation (Z. 8-10) 4. Freizeit & Hobbys (Z. 11-14) 5. Familie & Freunde (Z. 15-17) 6. Zukunft & Ziel (Z. 18-20).',
    rules: [
      '• Zeilen 1–3: Name, Alter, Herkunft, Wohnort ("Ich heiße...", "Ich komme aus...").',
      '• Zeilen 4–7: Schule, Lieblingsfächer, Tagesbeginn ("Meine Schule beginnt um...").',
      '• Zeilen 8–10: Sprachen und der Grund für Deutsch ("Ich lerne Deutsch, weil...").',
      '• Zeilen 11–14: Freizeit, Sport, Aktivitäten ("In meiner Freizeit spiele ich gerne...").',
      '• Zeilen 15–17: Familie und Freunde mit Adjektiven ("Mein bester Freund hilft mir...").',
      '• Zeilen 18–20: Zukunftsplan und Abschlussziel ("Mein Ziel ist, Deutsch sicher zu beherrschen.").',
      '• Prüfkriterien: 1. Stimmt die Verbposition? 2. Haben alle Nomen den richtigen Artikel? 3. Gibt es abwechslungsreiche Konnektoren (weil, aber, und)?'
    ],
    formula: '20 Zeilen = 6 Blöcke + V2-Konformität + Konnektoren-Dichte (>3)'
  },
  grammar: {
    title: 'Der 20-Zeilen-Architekturplan',
    explanation: 'Ein 20-Zeilen-Text ist genau dann exzellent, wenn jede Zeile einen vollständigen, grammatikalisch autonomen Haupt- oder Satzgefüge-Gedanken trägt. Die Verben stehen in Hauptsätzen auf Position 2, in Nebensätzen am Ende.',
    formula: 'Zeilen 1-3 (Identität) -> 4-7 (Alltag) -> 8-10 (Sprachen) -> 11-14 (Freizeit) -> 15-17 (Soziales) -> 18-20 (Zukunft)',
    examples: [
      '01. Hallo! Mein Name ist Alex und ich bin sechzehn Jahre alt.',
      '02. Ich komme aus Berlin und ich wohne jetzt hier.',
      '09. Jetzt lerne ich Deutsch, weil ich in Deutschland studieren möchte.',
      '20. Mein Ziel für die 30 Tage habe ich mit diesem Text erreicht.'
    ]
  },
  pronunciationNotes: [
    { sound: 'Flüssiges lautes Lesen', rule: 'Lies den fertigen Text laut vor einem Spiegel vor. Achte auf Satzmelodie und Pausen vor Kommas.', examples: ['Zeile für Zeile laut lesen'] }
  ],
  vocabulary: [
    {
      id: 'd29-v1',
      german: 'die Einleitung',
      english: 'introduction',
      french: 'l’introduction',
      arabicClue: 'مقدمة',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'Zeilen 1 bis 3'
    },
    {
      id: 'd29-v2',
      german: 'das Ziel, die Ziele',
      english: 'goal / target',
      french: 'l’objectif / le but',
      arabicClue: 'هدف / أهداف',
      gender: 'das',
      partOfSpeech: 'noun',
      memoryClue: 'Mein Ziel ist fließendes Deutsch'
    },
    {
      id: 'd29-v3',
      german: 'erreichen',
      english: 'to achieve / reach',
      french: 'atteindre / réaliser',
      arabicClue: 'يحقق / يصل إلى',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Ein Ziel erreichen'
    },
    {
      id: 'd29-v4',
      german: 'überprüfen',
      english: 'to check / review',
      french: 'vérifier / réviser',
      arabicClue: 'يدقق / يراجع',
      gender: null,
      partOfSpeech: 'verb',
      memoryClue: 'Fehler selbst finden und korrigieren'
    },
    {
      id: 'd29-v5',
      german: 'die Zukunft',
      english: 'future',
      french: 'l’avenir / le futur',
      arabicClue: 'المستقبل',
      gender: 'die',
      partOfSpeech: 'noun',
      memoryClue: 'In der Zukunft will ich...'
    }
  ],
  examples: [
    'Ich habe meinen 20-Zeilen-Text erfolgreich vorbereitet.',
    'Jede Zeile hat eine klare grammatische Struktur.',
    'Ich korrigiere meine Fehler mit dem Text-Validator.',
    'Morgen bin ich bereit für den großen Abschlusstest.'
  ],
  speakingModel: {
    german: 'Ich heiße Ahmed und bin Schüler. Ich lerne seit einem Monat Deutsch von Null. In Zukunft möchte ich fließend Deutsch sprechen.',
    english: 'My name is Ahmed and I am a student. I have been learning German from scratch for a month. In the future I want to speak German fluently.',
    french: 'Je m\'appelle Ahmed et je suis élève. J\'apprends l\'allemand depuis zéro depuis un mois. À l\'avenir je veux parler allemand couramment.',
    note: 'Lies die ersten drei und die letzten drei Zeilen deines 20-Zeilen-Textes mit festem Blick und deutlicher Stimme laut vor.'
  },
  mnemonicTrick: {
    tip: 'Lade deinen Text im "20-Zeilen-Labor" auf der Profil-Seite hoch! Der integrierte TextValidatorEngine zählt deine Zeilen, prüft deine V2-Regeln und markiert deine Konnektoren automatisch!',
    warning: 'Schreibe keine Monster-Sätze mit 50 Wörtern. Klare, fehlerfreie 8- bis 12-Wort-Sätze sind viel besser als fehlerhafte Riesensätze!'
  },
  practiceTask: 'Öffne das 20-Zeilen-Labor auf der Profilseite und schreibe oder personalisiere deinen 20-Zeilen-Text bis alle 20 Zeilen grün leuchten.',
  dailyChallenge: 'Führe eine Fehlerjagd durch: Finde in deinem geschriebenen Text mindestens 2 kleine Fehler (Artikel, Endung, Verbposition) und verbessere sie.',
  reviewItems: [
    { id: 'd29-r1', front: 'Aus wie vielen thematischen Blöcken besteht der 20-Zeilen-Text?', back: 'Aus 6 Blöcken (Vorstellung, Schule, Sprachen, Freizeit, Familie, Zukunft).' },
    { id: 'd29-r2', front: 'Welche 3 grammatikalischen Punkte prüft der TextValidator?', back: '1. Zeilenanzahl (20), 2. Verb-auf-Position-2-Trefferquote, 3. Vorhandene Konnektoren (weil, aber, und).' },
    { id: 'd29-r3', front: 'Welcher Block umfasst die Zeilen 11 bis 14?', back: 'Freizeit & Hobbys (Sport, Musik, Freunde treffen).' },
    { id: 'd29-r4', front: 'Wie schließt Zeile 20 den Text ab?', back: 'Mit dem persönlichen Abschlussziel (z.B. "Mein Ziel für die 30 Tage habe ich erreicht.").' }
  ],
  completionRequirement: 'Erreiche 20 gültige Zeilen im Text-Validator und bestehe das Struktur-Quiz mit mindestens 80%.',
  exercises: [
    {
      id: 'ex-29-1',
      type: 'multiple-choice',
      prompt: 'In welchen Block des 20-Zeilen-Textes gehört der Satz: "Mein Lieblingsfach ist Informatik, weil es logisch ist"?',
      question: 'Wähle den richtigen Themenblock:',
      options: [
        'Block 2: Schule & Alltag (Zeilen 4–7)',
        'Block 1: Vorstellung (Zeilen 1–3)',
        'Block 5: Familie & Freunde (Zeilen 15–17)'
      ],
      correctAnswer: 'Block 2: Schule & Alltag (Zeilen 4–7)',
      explanation: 'Schule, Fächer und Tagesablauf bilden den 2. Block (Zeilen 4–7) des 20-Zeilen-Curriculums.'
    },
    {
      id: 'ex-29-2',
      type: 'multiple-choice',
      prompt: 'Welcher Satz drückt ein Zukunftsziel für Block 6 (Zeilen 18–20) grammatikalisch korrekt aus?',
      question: 'Wähle den passenden Abschlusssatz:',
      options: [
        'In Zukunft möchte ich die deutsche Sprache fließend sprechen.',
        'In Zukunft ich möchte die deutsche Sprache fließend sprechen.',
        'In Zukunft sprechen ich möchte die deutsche Sprache fließend.'
      ],
      correctAnswer: 'In Zukunft möchte ich die deutsche Sprache fließend sprechen.',
      explanation: 'Zeitangabe "In Zukunft" auf Pos 1, Modalverb "möchte" auf Pos 2, Infinitiv "sprechen" am Satzende.'
    },
    {
      id: 'ex-29-3',
      type: 'syntax-order',
      prompt: 'Bringe den krönenden Schlusssatz in die richtige Reihenfolge:',
      question: 'Ordne die Wörter:',
      words: ['Mein Ziel', 'für die 30 Tage', 'habe', 'ich', 'erfolgreich erreicht'],
      correctAnswer: 'Mein Ziel für die 30 Tage habe ich erfolgreich erreicht',
      explanation: 'Objektgruppe auf Pos 1, Hilfsverb "habe" auf Pos 2, Subjekt "ich" auf Pos 3, Partizip II am Ende.'
    }
  ]
};
