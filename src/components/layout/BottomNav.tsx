import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Zap, 
  Gamepad2, 
  RotateCw, 
  TrendingUp, 
  User, 
  MoreHorizontal,
  X
} from 'lucide-react';
import { PageId } from './Sidebar';

interface BottomNavProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'today', label: 'Heute', icon: <Calendar className="w-5 h-5" /> },
    { id: 'learn', label: 'Quest', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'practice', label: 'Üben', icon: <Zap className="w-5 h-5" /> },
  ];

  const moreTabs: { id: PageId; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'games', label: 'Mini-Spiele', icon: <Gamepad2 className="w-5 h-5 text-amber-500" />, desc: 'Artikel-Jäger, Satz-Bauer' },
    { id: 'review', label: 'SRS Wiederholung', icon: <RotateCw className="w-5 h-5 text-learning" />, desc: 'Leitner Langzeitgedächtnis' },
    { id: 'progress', label: 'Mein Fortschritt', icon: <TrendingUp className="w-5 h-5 text-correct" />, desc: 'XP, Level, Statistiken' },
    { id: 'profile', label: 'Profil & 20-Zeilen', icon: <User className="w-5 h-5 text-grammar" />, desc: 'Einstellungen & Text-Labor' },
  ];

  const isMoreActive = moreTabs.some(t => t.id === activePage);

  return (
    <>
      {/* Mobile Drawer for More Tabs */}
      {showMoreMenu && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-end md:hidden animate-in fade-in"
          onClick={() => setShowMoreMenu(false)}
        >
          <div 
            className="w-full bg-white dark:bg-slate-900 rounded-t-3xl p-5 border-t border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col gap-3 pb-20 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Weitere Bereiche
              </span>
              <button 
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                aria-label="Menü schließen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {moreTabs.map((item) => {
                const isItemActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      setShowMoreMenu(false);
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      isItemActive
                        ? 'bg-learning text-white border-learning shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:border-learning/40'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={`text-xs font-black ${isItemActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {item.label}
                      </h4>
                      <p className={`text-[10px] mt-0.5 line-clamp-1 ${isItemActive ? 'text-blue-100' : 'text-slate-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Dock */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 shadow-lg select-none"
        aria-label="Hauptnavigation Mobil"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {mainTabs.map((tab) => {
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setShowMoreMenu(false);
                  onNavigate(tab.id);
                }}
                className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-learning font-black scale-105'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium'
                }`}
              >
                {tab.icon}
                <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-learning rounded-full mt-0.5 shadow-sm" />
                )}
              </button>
            );
          })}

          {/* More Trigger */}
          <button
            type="button"
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
              isMoreActive || showMoreMenu
                ? 'text-learning font-black scale-105'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium'
            }`}
            aria-expanded={showMoreMenu}
            aria-label="Weitere Menüpunkte"
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Mehr</span>
            {isMoreActive && (
              <span className="w-1.5 h-1.5 bg-learning rounded-full mt-0.5 shadow-sm" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
