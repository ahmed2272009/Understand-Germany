import React from 'react';
import { Exercise } from '../../core/types/curriculum';
import { 
  BookOpen, 
  Coffee, 
  Clock, 
  Car, 
  Home, 
  Dog, 
  Cat, 
  Apple, 
  Droplet, 
  Sparkles,
  School,
  Sun
} from 'lucide-react';

interface ImageVocabExerciseProps {
  exercise: Exercise;
  userAnswer: string;
  onSelect: (ans: string) => void;
  isChecked: boolean;
  isCorrect?: boolean;
}

export const ImageVocabExercise: React.FC<ImageVocabExerciseProps> = ({
  exercise,
  userAnswer,
  onSelect,
  isChecked
}) => {
  const options = exercise.options || [];

  // Icon map for visual vocabulary
  const renderVisual = () => {
    const iconName = exercise.imageIcon?.toLowerCase() || '';
    const q = (exercise.question + ' ' + exercise.prompt + ' ' + exercise.correctAnswer).toLowerCase();

    const rawSvg = (exercise as any).imageSvg || (exercise.imageUrl?.startsWith('<svg') ? exercise.imageUrl : null);
    if (rawSvg) {
      return (
        <div
          className="w-28 h-28 drop-shadow-md flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: rawSvg }}
        />
      );
    }

    if (exercise.imageUrl) {
      return (
        <img
          src={exercise.imageUrl}
          alt={exercise.question}
          className="w-28 h-28 object-contain rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
        />
      );
    }

    let Icon = Sparkles;
    let color = 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';

    if (iconName.includes('coffee') || q.includes('kaffee')) {
      Icon = Coffee;
      color = 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
    } else if (iconName.includes('book') || q.includes('buch')) {
      Icon = BookOpen;
      color = 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800';
    } else if (iconName.includes('clock') || q.includes('uhr') || q.includes('zeit')) {
      Icon = Clock;
      color = 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
    } else if (iconName.includes('water') || q.includes('wasser')) {
      Icon = Droplet;
      color = 'text-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800';
    } else if (iconName.includes('apple') || q.includes('apfel') || q.includes('essen')) {
      Icon = Apple;
      color = 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
    } else if (iconName.includes('car') || q.includes('auto')) {
      Icon = Car;
      color = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
    } else if (iconName.includes('home') || q.includes('haus')) {
      Icon = Home;
      color = 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800';
    } else if (iconName.includes('dog') || q.includes('hund')) {
      Icon = Dog;
      color = 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800';
    } else if (iconName.includes('cat') || q.includes('katze')) {
      Icon = Cat;
      color = 'text-pink-600 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800';
    } else if (iconName.includes('school') || q.includes('schule')) {
      Icon = School;
      color = 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800';
    } else if (iconName.includes('sun') || q.includes('sonne') || q.includes('tag')) {
      Icon = Sun;
      color = 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800';
    }

    return (
      <div className={`w-24 h-24 rounded-3xl border-2 flex items-center justify-center shadow-md ${color} transition-transform hover:scale-105`}>
        <Icon className="w-12 h-12 stroke-[1.75]" />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Visual representation */}
      <div className="flex flex-col items-center gap-2">
        {renderVisual()}
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {exercise.question || 'Welches deutsche Wort passt zum Bild?'}
        </span>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
        {options.map((opt, i) => {
          const isSelected = userAnswer === opt;
          const isTargetCorrect = opt === exercise.correctAnswer;

          let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-learning';

          if (isChecked) {
            if (isTargetCorrect) {
              style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 font-bold';
            } else if (isSelected) {
              style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 font-bold';
            } else {
              style = 'border-slate-200 dark:border-slate-800 opacity-40';
            }
          } else if (isSelected) {
            style = 'border-learning bg-learning-light dark:bg-slate-800 text-learning-dark dark:text-learning font-bold ring-2 ring-learning/20';
          }

          return (
            <button
              key={i}
              type="button"
              disabled={isChecked}
              onClick={() => onSelect(opt)}
              className={`p-3.5 rounded-2xl border text-sm font-bold transition-all text-center ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
