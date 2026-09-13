import React from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Zap, 
  Gamepad2, 
  RotateCw, 
  TrendingUp, 
  User, 
  Flame, 
  Heart,
  Sparkles
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export type PageId = 'home' | 'today' | 'learn' | 'practice' | 'games' | 'review' | 'progress' | 'profile';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { progress, levelInfo } = useProgress();

  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Übersicht', icon: <Home className="w-5 h-5" /> },
    { id: 'today', label: 'Heute (Fokus)', icon: <Calendar className="w-5 h-5" />, badge: `Tag ${progress?.highestUnlockedDay || 1}` },
    { id: 'learn', label: '30-Tage Quest', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'practice', label: 'Übungen', icon: <Zap className="w-5 h-5" /> },
    { id: 'games', label: 'Mini-Spiele', icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'review', label: 'Wiederholen (SRS)', icon: <RotateCw className="w-5 h-5" /> },
    { id: 'progress', label: 'Fortschritt', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'profile', label: 'Mein Profil', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 bottom-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 p-4 shadow-sm select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-learning to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-learning/20">
          DQ
        </div>
        <div>
          <h1 className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
            <span>DeutschQuest</span>
            <span className="text-[10px] bg-attention/20 text-attention-dark dark:text-attention px-1.5 py-0.2 rounded font-mono">A1</span>
          </h1>
          <span className="text-[11px] text-slate-400 font-medium">30-Tage Abenteuer</span>
        </div>
      </div>

      {/* User Stats Pill */}
      <div className="my-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{levelInfo.badge}</span>
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-800 dark:text-slate-100">Lvl {levelInfo.level}</span>
            <span className="text-[10px] font-mono text-attention font-bold">{progress?.totalXp || 0} XP</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-xs font-black text-streak" title="Streak">
            <Flame className="w-4 h-4 fill-current" />
            <span>{progress?.streakCount || 0}</span>
          </div>
          <div className="flex items-center gap-0.5 text-xs font-black text-rose-500" title="Herzen">
            <Heart className="w-4 h-4 fill-current" />
            <span>{progress?.heartsCount ?? 5}</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto space-y-1 pr-1" aria-label="Hauptnavigation Desktop">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all ${
                isActive
                  ? 'bg-learning text-white shadow-md shadow-learning/20 translate-x-1'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="leading-none">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-learning-light text-learning dark:bg-slate-800 dark:text-learning'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between px-1">
        <span className="flex items-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-correct" />
          <span>German from Zero</span>
        </span>
        <span className="font-mono text-[10px]">v1.0.0</span>
      </div>
    </aside>
  );
};
