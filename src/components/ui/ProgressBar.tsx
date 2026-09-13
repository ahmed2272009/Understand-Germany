import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'learning' | 'correct' | 'grammar' | 'streak' | 'attention';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'learning',
  size = 'md',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const colorClasses = {
    learning: 'bg-learning',
    correct: 'bg-correct',
    grammar: 'bg-grammar',
    streak: 'bg-streak',
    attention: 'bg-attention'
  }[color];

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size];

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono text-[11px] text-slate-500">{value}/{max} ({percentage}%)</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Fortschritt'}
        className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${sizeClasses} shadow-inner`}
      >
        <div
          className={`${colorClasses} h-full rounded-full transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
