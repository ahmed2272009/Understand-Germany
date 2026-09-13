import React, { useState } from 'react';
import { AnswerOption } from '../components/ui/AnswerOption';
import { AudioButton } from '../components/ui/AudioButton';
import { ExerciseDispatcher } from '../components/exercises/ExerciseDispatcher';
import { Exercise } from '../core/types/curriculum';
import { 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  MoveRight,
  SplitSquareVertical,
  Layers
} from 'lucide-react';

interface SyntaxChallenge {
  id: string;
  topic: string;
  rulePrompt: string;
  scrambledWords: string[];
  correctOrder: string[];
  translation: string;
}

interface ConjugationChallenge {
  id: string;
  verb: string;
  pronoun: string;
  tense: string;
  options: string[];
  correctAnswer: string;
  translation: string;
}

export const PracticePage: React.FC = () => {
  const [practiceMode, setPracticeMode] = useState<'exercise-lab' | 'syntax' | 'conjugation'>('exercise-lab');
  const [labExIdx, setLabExIdx] = useState(0);

  // 10 Exercise Types Laboratory
  const labExercises: Exercise[] = [
    {
      id: 'lab-mc',
      type: 'multiple-choice',
      prompt: 'Wähle die passende Antwort:',
      question: 'Wie begrüßt man jemanden formell am Nachmittag?',
      options: ['Guten Tag!', 'Gute Nacht!', 'Tschüss!', 'Schlaf gut!'],
      correctAnswer: 'Guten Tag!',
      explanation: '"Guten Tag" ist die universelle formelle Begrüßung tagsüber (ca. 11 bis 18 Uhr).'
    },
    {
      id: 'lab-fill',
      type: 'fill-in',
      prompt: 'Ergänze die passende finite Form von haben:',
      question: 'Wir ___ heute keine Zeit für das Spiel.',
      options: ['habe', 'hast', 'hat', 'haben'],
      correctAnswer: 'haben',
      explanation: 'Bei "wir" endet das regelmäßige Verb im Präsens auf -en: wir haben.'
    },
    {
      id: 'lab-order',
      type: 'sentence-ordering',
      prompt: 'Bringe die Wörter in die richtige Reihenfolge mit dem Verb auf Position 2:',
      question: 'Baue den Aussagesatz:',
      words: ['Heute', 'lerne', 'ich', 'fleißig', 'Deutsch'],
      correctAnswer: 'Heute lerne ich fleißig Deutsch',
      explanation: 'V2-Regel: Das Adverb "Heute" belegt Position 1, das finite Verb "lerne" steht strikt auf Position 2.'
    },
    {
      id: 'lab-trans',
      type: 'translation',
      prompt: 'Übersetze den Satz ins Deutsche:',
      question: 'I would like a coffee, please.',
      sourceLang: 'en',
      targetLang: 'de',
      correctAnswer: 'Ich möchte bitte einen Kaffee',
      explanation: '"would like" wird im Deutschen höflich mit "ich möchte" übersetzt. Kaffee ist maskulin Akkusativ: "einen Kaffee".'
    },
    {
      id: 'lab-art',
      type: 'article-select',
      prompt: 'Wähle den passenden bestimmten Artikel (Nominativ):',
      question: 'Zeitung (newspaper)',
      options: ['der', 'die', 'das'],
      correctAnswer: 'die',
      explanation: 'Nomen mit der Endung -ung (die Zeitung, die Wohnung, die Übung) sind im Deutschen immer feminin (die).'
    },
    {
      id: 'lab-match',
      type: 'matching',
      prompt: 'Verbinde jedes deutsche Wort mit seiner englischen Übersetzung:',
      question: 'Wortpaare verknüpfen:',
      pairs: [
        { id: 'p1', left: 'das Wasser', right: 'water' },
        { id: 'p2', left: 'die Schule', right: 'school' },
        { id: 'p3', left: 'das Buch', right: 'book' },
        { id: 'p4', left: 'die Zeit', right: 'time' }
      ],
      correctAnswer: 'das Wasser=water, die Schule=school, das Buch=book, die Zeit=time',
      explanation: 'Grundlegende Substantive aus Phase 1 des Beginner-Kurses.'
    },
    {
      id: 'lab-img',
      type: 'image-vocab',
      prompt: 'Welches deutsche Nomen passt zu diesem Symbol?',
      question: 'Kaffeebecher',
      imageIcon: 'Coffee',
      options: ['der Kaffee', 'der Tee', 'das Wasser', 'die Milch'],
      correctAnswer: 'der Kaffee',
      explanation: 'Kaffee ist maskulin: "der Kaffee".'
    },
    {
      id: 'lab-listen',
      type: 'listening',
      prompt: 'Höre dir die deutsche Audioaufnahme genau an und wähle die richtige Aussage:',
      question: 'Hörverständnis:',
      audioText: 'Entschuldigung, wie viel Uhr ist es?',
      options: [
        'Entschuldigung, wie viel Uhr ist es?',
        'Entschuldigung, wo ist der Bahnhof?',
        'Guten Tag, wie geht es Ihnen?',
        'Wir haben keine Zeit.'
      ],
      correctAnswer: 'Entschuldigung, wie viel Uhr ist es?',
      explanation: 'Die Sprecherin fragt nach der Uhrzeit: "wie viel Uhr ist es?".'
    },
    {
      id: 'lab-write',
      type: 'writing',
      prompt: 'Schreibe einen vollständigen Satz mit einer Begründung:',
      question: 'Verwende die Konjunktion "weil" und das Verb "müde sein":',
      minWords: 4,
      requiredKeywords: ['weil'],
      sampleSolution: 'Ich gehe schlafen, weil ich müde bin.',
      correctAnswer: 'Ich schlafe, weil ich müde bin.',
      explanation: 'Die Kausal-Konjunktion "weil" leitet einen Nebensatz ein und verbannt das konjugierte Verb ("bin") ganz ans Satzende.'
    },
    {
      id: 'lab-pron',
      type: 'pronunciation',
      prompt: 'Höre dir das Sprechmodell an und sprich es laut nach:',
      question: 'Aussprachetraining (Vogel-V-Regel):',
      targetText: 'Mein Vater liest viele Bücher.',
      phoneticGuide: 'Mein FA-ter liest FI-le BÜ-cher',
      correctAnswer: 'Mein Vater liest viele Bücher.',
      explanation: 'Das deutsche "V" in Erbwörtern wie "Vater" und "viele" wird stimmlos wie ein [f] gesprochen.'
    }
  ];

  // Syntax challenges (German V2 position & Subordinate clauses)
  const syntaxChallenges: SyntaxChallenge[] = [
    {
      id: 'sc-1',
      topic: 'V2-Regel (Verb auf Position 2)',
      rulePrompt: 'Bringe die Wörter in die richtige Reihenfolge mit dem Verb auf Position 2:',
      scrambledWords: ['heute', 'Deutsch', 'ich', 'lerne'],
      correctOrder: ['Heute', 'lerne', 'ich', 'Deutsch.'],
      translation: 'Today I learn German.'
    },
    {
      id: 'sc-2',
      topic: 'Modalverb Satzklammer',
      rulePrompt: 'Setze das finite Modalverb auf Position 2 und den Infinitiv ans Satzende:',
      scrambledWords: ['nach', 'wir', 'müssen', 'Hause', 'gehen'],
      correctOrder: ['Wir', 'müssen', 'nach', 'Hause', 'gehen.'],
      translation: 'We must go home.'
    },
    {
      id: 'sc-3',
      topic: 'Weil-Nebensatz (Verb am Ende)',
      rulePrompt: 'Im Weil-Satz wandert das konjugierte Verb ganz ans Satzende:',
      scrambledWords: ['müde', 'ich', 'weil', 'bin', 'schlafe', 'ich'],
      correctOrder: ['Ich', 'schlafe,', 'weil', 'ich', 'müde', 'bin.'],
      translation: 'I sleep because I am tired.'
    },
    {
      id: 'sc-4',
      topic: 'Perfekt mit Hilfsverb (haben / sein)',
      rulePrompt: 'Hilfsverb auf Position 2, Partizip II am Satzende:',
      scrambledWords: ['hat', 'Buch', 'das', 'gelesen', 'er'],
      correctOrder: ['Er', 'hat', 'das', 'Buch', 'gelesen.'],
      translation: 'He has read the book.'
    }
  ];

  // Conjugation challenges
  const conjugationChallenges: ConjugationChallenge[] = [
    {
      id: 'cc-1',
      verb: 'sein (to be)',
      pronoun: 'ihr',
      tense: 'Präsens',
      options: ['seid', 'sind', 'bist', 'seidst'],
      correctAnswer: 'seid',
      translation: 'you all are'
    },
    {
      id: 'cc-2',
      verb: 'fahren (Vokalwechsel a -> ä)',
      pronoun: 'du',
      tense: 'Präsens',
      options: ['fährst', 'fahrst', 'fahrt', 'führest'],
      correctAnswer: 'fährst',
      translation: 'you drive'
    },
    {
      id: 'cc-3',
      verb: 'können (Modalverb)',
      pronoun: 'er / sie / es',
      tense: 'Präsens',
      options: ['kann', 'könnt', 'kannt', 'könne'],
      correctAnswer: 'kann',
      translation: 'he/she/it can'
    },
    {
      id: 'cc-4',
      verb: 'haben (to have)',
      pronoun: 'du',
      tense: 'Präsens',
      options: ['hast', 'habst', 'habt', 'hat'],
      correctAnswer: 'hast',
      translation: 'you have'
    }
  ];

  // State for syntax builder
  const [currentSyntaxIdx, setCurrentSyntaxIdx] = useState(0);
  const currentSyntax = syntaxChallenges[currentSyntaxIdx];
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(currentSyntax.scrambledWords);
  const [syntaxChecked, setSyntaxChecked] = useState(false);
  const [isSyntaxCorrect, setIsSyntaxCorrect] = useState(false);

  // State for conjugation
  const [currentConjIdx, setCurrentConjIdx] = useState(0);
  const currentConj = conjugationChallenges[currentConjIdx];
  const [selectedConjOption, setSelectedConjOption] = useState<string | null>(null);
  const [conjChecked, setConjChecked] = useState(false);

  const handlePickWord = (word: string) => {
    if (syntaxChecked) return;
    setPlacedWords(prev => [...prev, word]);
    setAvailableWords(prev => {
      const idx = prev.indexOf(word);
      if (idx > -1) {
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      }
      return prev;
    });
  };

  const handleReturnWord = (word: string, index: number) => {
    if (syntaxChecked) return;
    setPlacedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  };

  const handleResetSyntax = () => {
    setPlacedWords([]);
    setAvailableWords(currentSyntax.scrambledWords);
    setSyntaxChecked(false);
  };

  const handleCheckSyntax = () => {
    const assembled = placedWords.join(' ').toLowerCase();
    const correctClean = currentSyntax.correctOrder.join(' ').toLowerCase().replace('.', '');
    const pass = assembled === correctClean;
    setIsSyntaxCorrect(pass);
    setSyntaxChecked(true);
  };

  const handleNextSyntax = () => {
    const nextIdx = (currentSyntaxIdx + 1) % syntaxChallenges.length;
    setCurrentSyntaxIdx(nextIdx);
    setPlacedWords([]);
    setAvailableWords(syntaxChallenges[nextIdx].scrambledWords);
    setSyntaxChecked(false);
  };

  const handleCheckConjugation = (option: string) => {
    setSelectedConjOption(option);
    setConjChecked(true);
  };

  const handleNextConjugation = () => {
    const nextIdx = (currentConjIdx + 1) % conjugationChallenges.length;
    setCurrentConjIdx(nextIdx);
    setSelectedConjOption(null);
    setConjChecked(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto p-4 md:p-6 pb-24">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-learning mb-1">
          <Zap className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">
            Interaktives Trainings-Labor
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Übungs-Labor & Grammatik-Werkstatt
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Erlebe alle 10 Übungstypen, trainiere Satzbau nach der V2-Regel und meistere Verben.
        </p>
      </div>

      {/* 3-Way Mode Switcher */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setPracticeMode('exercise-lab')}
          className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            practiceMode === 'exercise-lab'
              ? 'bg-learning text-white shadow-md shadow-learning/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>10 Übungstypen</span>
        </button>

        <button
          type="button"
          onClick={() => setPracticeMode('syntax')}
          className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            practiceMode === 'syntax'
              ? 'bg-learning text-white shadow-md shadow-learning/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <SplitSquareVertical className="w-4 h-4" />
          <span>Satzbau (V2)</span>
        </button>

        <button
          type="button"
          onClick={() => setPracticeMode('conjugation')}
          className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
            practiceMode === 'conjugation'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Konjugator</span>
        </button>
      </div>

      {/* 1. EXERCISE LAB (10 TYPES DISPATCHER) */}
      {practiceMode === 'exercise-lab' && (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500">
              Labor-Übung {labExIdx + 1} von {labExercises.length}
            </span>
            <div className="flex items-center gap-1">
              {labExercises.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLabExIdx(i)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    labExIdx === i
                      ? 'bg-learning text-white ring-2 ring-learning/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <ExerciseDispatcher
            exercise={labExercises[labExIdx]}
            exerciseIndex={labExIdx}
            totalExercises={labExercises.length}
            onExerciseComplete={() => {
              setLabExIdx((prev) => (prev + 1) % labExercises.length);
            }}
          />
        </div>
      )}

      {/* 2. SYNTAX BUILDER MODE */}
      {practiceMode === 'syntax' && (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-antigravity flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-grammar bg-grammar-light dark:bg-purple-950 px-3 py-1 rounded-full">
                {currentSyntax.topic}
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">
                {currentSyntaxIdx + 1} / {syntaxChallenges.length}
              </span>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {currentSyntax.rulePrompt}
              </p>
              <span className="text-xs text-slate-400 italic mt-0.5 block">
                Bedeutung: "{currentSyntax.translation}"
              </span>
            </div>

            {/* Placed words drop area */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 min-h-[72px] flex flex-wrap gap-2 items-center">
              {placedWords.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  Klicke unten auf die Wörter, um deinen Satz zu bauen...
                </span>
              ) : (
                placedWords.map((word, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={syntaxChecked}
                    onClick={() => handleReturnWord(word, idx)}
                    className="px-3.5 py-2 rounded-xl bg-learning text-white font-bold text-xs shadow-sm hover:bg-learning-dark transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="text-[10px] opacity-75 font-mono">Pos.{idx + 1}</span>
                    <span>{word}</span>
                  </button>
                ))
              )}
            </div>

            {/* Available words bank */}
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={syntaxChecked}
                  onClick={() => handlePickWord(word)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:border-learning hover:text-learning transition-all active:scale-95"
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleResetSyntax}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Zurücksetzen</span>
              </button>

              {!syntaxChecked ? (
                <button
                  type="button"
                  disabled={placedWords.length === 0}
                  onClick={handleCheckSyntax}
                  className="px-6 py-2.5 rounded-2xl bg-learning text-white font-black text-xs shadow-md disabled:opacity-40"
                >
                  Satz überprüfen
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextSyntax}
                  className="px-6 py-2.5 rounded-2xl bg-correct text-white font-black text-xs shadow-md flex items-center gap-1.5"
                >
                  <span>Nächster Satz</span>
                  <MoveRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Result feedback */}
            {syntaxChecked && (
              <div className={`p-4 rounded-2xl border flex flex-col gap-1 text-xs ${
                isSyntaxCorrect
                  ? 'bg-correct-light/40 border-correct text-correct-dark font-bold'
                  : 'bg-incorrect-light/40 border-incorrect text-incorrect-dark'
              }`}>
                <div className="flex items-center gap-2 font-black">
                  {isSyntaxCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-correct" />
                  ) : (
                    <span>⚠️</span>
                  )}
                  <span>{isSyntaxCorrect ? 'Exzellent! Die V2-Struktur stimmt.' : 'Nicht ganz richtig.'}</span>
                </div>
                {!isSyntaxCorrect && (
                  <p className="mt-1">
                    Richtige Reihenfolge: <strong className="text-slate-900 dark:text-white">{currentSyntax.correctOrder.join(' ')}</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. CONJUGATION TRAINER */}
      {practiceMode === 'conjugation' && (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-antigravity flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-purple-600 bg-purple-50 dark:bg-purple-950 px-3 py-1 rounded-full">
                {currentConj.verb}
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">
                {currentConjIdx + 1} / {conjugationChallenges.length}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                Konjugiere im {currentConj.tense}:
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {currentConj.pronoun} <span className="text-purple-600">___ ?</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Bedeutung: "{currentConj.translation}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {currentConj.options.map(option => {
                let state: 'default' | 'selected' | 'correct' | 'incorrect' = 'default';
                if (conjChecked) {
                  if (option === currentConj.correctAnswer) state = 'correct';
                  else if (selectedConjOption === option) state = 'incorrect';
                } else if (selectedConjOption === option) {
                  state = 'selected';
                }

                return (
                  <AnswerOption
                    key={option}
                    text={option}
                    selected={selectedConjOption === option}
                    state={state}
                    disabled={conjChecked}
                    onClick={() => handleCheckConjugation(option)}
                  />
                );
              })}
            </div>

            {conjChecked && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <AudioButton text={`${currentConj.pronoun} ${currentConj.correctAnswer}`} size="sm" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Richtig: "{currentConj.pronoun} {currentConj.correctAnswer}"
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextConjugation}
                  className="px-5 py-2.5 rounded-2xl bg-purple-600 text-white font-black text-xs shadow-md flex items-center gap-1.5"
                >
                  <span>Weiter</span>
                  <MoveRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
