import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  rate?: number;
  className?: string;
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  rate = 0.9,
  className = '',
  label
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = rate;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2.5 text-sm',
    lg: 'p-3.5 text-base'
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size];

  return (
    <button
      type="button"
      onClick={handleSpeak}
      aria-label={label || `Deutsches Audio anhören für: ${text}`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-bold transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-learning focus-visible:outline-none ${
        isPlaying
          ? 'bg-learning text-white shadow-md animate-pulse'
          : 'bg-learning-light text-learning hover:bg-learning hover:text-white dark:bg-slate-800 dark:text-learning dark:hover:bg-learning dark:hover:text-white'
      } ${sizeClasses} ${className}`}
    >
      <Volume2 className={iconSizes} />
      {label && <span>{label}</span>}
    </button>
  );
};
