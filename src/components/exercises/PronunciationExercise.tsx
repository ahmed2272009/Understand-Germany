import React, { useState } from 'react';
import { Exercise } from '../../core/types/curriculum';
import { Mic, MicOff, Volume2, CheckCircle2 } from 'lucide-react';
import { normalizeGermanText } from '../../core/engines/learning-engine';

interface PronunciationExerciseProps {
  exercise: Exercise;
  userAnswer: string;
  onChange: (val: string) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const PronunciationExercise: React.FC<PronunciationExerciseProps> = ({
  exercise,
  userAnswer,
  onChange,
  isChecked
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const targetText = exercise.targetText || exercise.correctAnswer;
  const phonetic = exercise.phoneticGuide;

  const playModelAudio = () => {
    if ('speechSynthesis' in window && targetText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(targetText);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85; // Slightly slower for clear phonetic articulation
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartRecording = () => {
    if (isChecked) return;
    setSpeechError(null);

    // Check if Web Speech API is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback: simulated self-eval practice mode
      onChange(targetText);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'de-DE';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => {
        setIsListening(false);
        setSpeechError('Mikrofon nicht verfügbar oder stummgeschaltet. Du kannst deine Aussprache trotzdem selbst bestätigen.');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onChange(transcript);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      setSpeechError('Spracherkennung konnte nicht gestartet werden.');
    }
  };

  const handleSelfConfirm = () => {
    if (isChecked) return;
    onChange(targetText);
  };

  const normUser = normalizeGermanText(userAnswer);
  const normTarget = normalizeGermanText(targetText);
  const isMatch = normUser === normTarget && normUser.length > 0;

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      {/* Target Phrase & Phonetics Card */}
      <div className="flex flex-col items-center text-center gap-2 p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 w-full max-w-md">
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
          Sprich diesen Satz laut nach
        </span>

        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
          "{targetText}"
        </h3>

        {phonetic && (
          <span className="text-xs font-mono font-bold text-learning px-3 py-1 rounded-full bg-learning-light dark:bg-slate-700">
            Aussprache: [{phonetic}]
          </span>
        )}

        {/* Audio Model Button */}
        <button
          type="button"
          onClick={playModelAudio}
          className="mt-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-750 border border-slate-200 dark:border-slate-600 hover:border-learning text-slate-800 dark:text-slate-100 text-xs font-bold shadow-sm transition-all flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4 text-learning" />
          <span>Vorlesen lassen (Muster)</span>
        </button>
      </div>

      {/* Recording / Pronunciation Evaluation Button */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          disabled={isChecked}
          onClick={handleStartRecording}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${
            isListening
              ? 'bg-rose-600 text-white ring-8 ring-rose-400/40 animate-pulse'
              : userAnswer
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-300/40'
                : 'bg-learning text-white hover:bg-learning-dark shadow-learning/30'
          }`}
          title="Mikrofon starten"
        >
          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

        <span className="text-xs font-bold text-slate-500 text-center">
          {isListening
            ? 'Höre zu... Sprich jetzt!'
            : userAnswer
              ? 'Aussprache erfasst!'
              : 'Klicke auf das Mikrofon und sprich'}
        </span>

        {/* Fallback / Manual confirmation button */}
        {!isChecked && !userAnswer && (
          <button
            type="button"
            onClick={handleSelfConfirm}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline mt-1"
          >
            Ich habe es laut ausgesprochen (ohne Mikrofon)
          </button>
        )}
      </div>

      {/* Result feedback */}
      {userAnswer && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {isMatch ? 'Perfekt erkannt: ' : 'Erkannt: '} "{userAnswer}"
          </span>
        </div>
      )}

      {speechError && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-200 text-center max-w-sm">
          {speechError}
        </div>
      )}
    </div>
  );
};
