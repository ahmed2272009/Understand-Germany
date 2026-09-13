import React, { useState } from 'react';
import { ImageVocabItem } from '../../core/types/image-vocab';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';

interface VisualVocabCardProps {
  item: ImageVocabItem;
  className?: string;
  onSelect?: (item: ImageVocabItem) => void;
}

export const VisualVocabCard: React.FC<VisualVocabCardProps> = ({
  item,
  className = '',
  onSelect
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(item.audio || `${item.article} ${item.german}`);
      u.lang = 'de-DE';
      u.rate = 0.9;
      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(u);
    }
  };

  const getArticleStyles = (art: string) => {
    switch (art) {
      case 'der':
        return {
          badge: 'bg-sky-500 text-white border-sky-400',
          cardBorder: 'hover:border-sky-400/50',
          text: 'text-sky-600 dark:text-sky-400'
        };
      case 'die':
        return {
          badge: 'bg-rose-500 text-white border-rose-400',
          cardBorder: 'hover:border-rose-400/50',
          text: 'text-rose-600 dark:text-rose-400'
        };
      case 'das':
      default:
        return {
          badge: 'bg-amber-500 text-white border-amber-400',
          cardBorder: 'hover:border-amber-400/50',
          text: 'text-amber-600 dark:text-amber-400'
        };
    }
  };

  const artStyle = getArticleStyles(item.article);

  return (
    <div
      onClick={() => onSelect?.(item)}
      className={`group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/40 flex flex-col gap-3 ${artStyle.cardBorder} ${className}`}
    >
      {/* Top Bar: Difficulty & Lesson Tag */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          <span>Tag {item.lesson}</span>
        </span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
          {item.category}
        </span>
      </div>

      {/* Vector Illustration Container */}
      <div className="w-full h-32 rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-2 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <div
          className="w-24 h-24 drop-shadow-md"
          dangerouslySetInnerHTML={{ __html: item.imageSvg }}
        />
      </div>

      {/* Main Noun & Article */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-md ${artStyle.badge} shadow-sm`}>
            {item.article}
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {item.german}
          </h3>
        </div>

        <button
          type="button"
          onClick={speak}
          aria-label={`Aussprache für ${item.german}`}
          className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm active:scale-90 ${
            isPlaying ? 'ring-2 ring-indigo-500 animate-pulse text-indigo-600' : ''
          }`}
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Plural Form */}
      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span className="text-slate-400 font-bold mr-1">Plural:</span>
        <span className="font-bold text-slate-800 dark:text-slate-200">{item.plural}</span>
      </div>

      {/* Trilingual Bridges: English, French, Arabic */}
      <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400 font-bold uppercase">EN</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{item.english}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400 font-bold uppercase">FR</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{item.french}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[9px] text-slate-400 font-bold uppercase">AR</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate font-arabic">{item.arabic}</span>
        </div>
      </div>

      {/* Example Sentence Box */}
      <div className="mt-1 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col gap-0.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            <span>Beispielsatz</span>
          </span>
        </div>
        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
          "{item.exampleSentence}"
        </p>
        <p className="text-[10px] text-slate-500 italic">
          {item.exampleTranslation.english}
        </p>
      </div>
    </div>
  );
};
