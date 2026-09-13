import React, { useState } from 'react';
import { Sparkles, Compass, Flame, Shield, ArrowRight, X } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onStartLearning: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onStartLearning
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Willkommen bei DeutschQuest!',
      badge: '30-Tage Meisterweg',
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      desc: 'Verwandle das 30-Tage Workbook "Deutsch von Null" in dein tägliches interaktives Abenteuer. Lerne systematisch Wortschatz, Grammatik und Satzbau.',
      highlight: 'Von 0 Vorkenntnissen bis zu einem zusammenhängenden 20-Zeilen Text.'
    },
    {
      title: 'Das 4-Farben-Lernsystem',
      badge: 'Visuelles Gedächtnis',
      icon: <Compass className="w-8 h-8 text-learning" />,
      desc: 'Jede Lektion nutzt einen klaren didaktischen Farbcode:',
      bullets: [
        { color: 'bg-blue-500', label: 'Blau = Neuer Wortschatz & Vokabeln' },
        { color: 'bg-purple-500', label: 'Lila = Grammatik & Satzmuster' },
        { color: 'bg-amber-500', label: 'Gelb = Lerntricks & typische Stolperfallen' },
        { color: 'bg-emerald-500', label: 'Grün = Sprechmodelle & Lautes Üben' }
      ]
    },
    {
      title: 'Lernstreak & Streak-Schilde',
      badge: 'Dranbleiben lohnt sich',
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      desc: 'Erreiche dein tägliches Mindest-Lernziel (z.B. eine Lektion oder 5 Vokabeln). Deine Streak-Schilde schützen deinen Streak, falls du mal einen Tag verpasst.',
      highlight: 'Kein Glücksspiel, keine Ablenkung — nur echte, nachhaltige Lernmotivation.'
    },
    {
      title: '10 Übungstypen & Mini-Spiele',
      badge: 'Spielerisch festigen',
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      desc: 'Festige dein Wissen durch Multiple-Choice, Satzbau, Artikel-Jäger, Spaced Repetition (SRS) und das 20-Zeilen Schreib-Labor.',
      highlight: 'Erhalte bei Fehlern sofort eine didaktische Erklärung zur Lösung.'
    }
  ];

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onClose();
      onStartLearning();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 md:p-8 text-white shadow-2xl relative flex flex-col gap-6 animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Tour überspringen"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Step Indicator */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
            Schritt {currentStep + 1} von {steps.length}
          </span>
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'w-6 bg-learning' : i < currentStep ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Icon & Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-lg">
            {step.icon}
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {step.badge}
            </span>
            <h2 id="onboarding-title" className="text-xl md:text-2xl font-black tracking-tight text-white mt-0.5">
              {step.title}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-300 max-w-md leading-relaxed">
            {step.desc}
          </p>

          {step.bullets && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full text-left mt-2">
              {step.bullets.map((b, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${b.color} shrink-0`} />
                  <span className="text-[11px] font-medium text-slate-300">{b.label}</span>
                </div>
              ))}
            </div>
          )}

          {step.highlight && (
            <div className="p-3 rounded-2xl bg-learning/10 border border-learning/30 text-blue-200 text-xs font-medium w-full">
              💡 {step.highlight}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-400 hover:text-white px-3 py-2 rounded-xl transition-colors"
          >
            Überspringen
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-learning to-indigo-600 hover:from-learning hover:to-indigo-500 text-white font-black text-xs md:text-sm shadow-lg shadow-learning/25 transition-all flex items-center gap-2"
          >
            <span>{isLast ? 'Jetzt starten!' : 'Weiter'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};