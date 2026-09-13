import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';
import { Flame, Heart, Zap, HelpCircle, LogIn, User } from 'lucide-react';

export const TopBar: React.FC<{
  onOpenAdmin?: () => void;
  onOpenAuth?: () => void;
  onOpenTour?: () => void;
}> = ({ onOpenAdmin, onOpenAuth, onOpenTour }) => {
  const { progress, levelInfo } = useProgress();
  const { user } = useAuth();

  const xp = progress?.totalXp || 0;
  const currentLevelMax = levelInfo.maxXp;
  const currentLevelMin = levelInfo.minXp;
  const xpInLevel = Math.max(0, xp - currentLevelMin);
  const xpNeeded = Math.max(1, currentLevelMax - currentLevelMin);
  const progressPct = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/95 backdrop-blur text-white px-4 py-3 border-b border-slate-800 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Level & XP */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl" title={levelInfo.title}>{levelInfo.badge}</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-200">Lvl {levelInfo.level}</span>
              <span className="text-[10px] text-amber-400 font-mono flex items-center gap-0.5">
                <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                {xp} XP
              </span>
            </div>
            <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
              <div
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Action Counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-full border border-orange-500/30">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="text-xs font-black text-orange-400 font-mono">
              {progress?.streakCount || 0}
            </span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-full border border-rose-500/30">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-xs font-black text-rose-400 font-mono">
              {progress?.heartsCount ?? 5}/5
            </span>
          </div>

          {/* Onboarding Tour trigger */}
          {onOpenTour && (
            <button
              onClick={onOpenTour}
              className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 p-1.5 rounded-full transition-colors"
              title="Einführungstour ansehen"
              aria-label="Einführungstour"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
            </button>
          )}

          {/* Auth trigger (Login/Register or User Badge) */}
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                user && !user.isAnonymous
                  ? 'bg-learning/20 hover:bg-learning/30 text-blue-300 border border-learning/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              title={user && !user.isAnonymous ? `Konto: ${user.email}` : 'Anmelden oder Registrieren'}
            >
              {user && !user.isAnonymous ? (
                <>
                  <User className="w-3.5 h-3.5 text-learning" />
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.displayName || user.email?.split('@')[0]}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Anmelden</span>
                </>
              )}
            </button>
          )}

          {/* Admin trigger (Authorized Administrators only) */}
          {onOpenAdmin && (user?.role === 'admin' || (user?.email && user.email.toLowerCase().includes('admin'))) && (
            <button
              onClick={onOpenAdmin}
              className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-xl font-mono transition-colors flex items-center gap-1"
              title="Admin-Konsole"
            >
              🛡️ <span className="hidden sm:inline">Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
