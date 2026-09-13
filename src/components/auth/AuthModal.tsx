import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, LogIn, UserPlus, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const { user, signInWithEmail, signInAnonymously, signOut } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !email.includes('@')) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email);
      setSuccess(mode === 'login' ? 'Erfolgreich angemeldet!' : 'Konto erfolgreich erstellt!');
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      setError(err?.message || 'Authentifizierungsfehler aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInAnonymously();
      setSuccess('Als Gast-Lernender angemeldet!');
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      setError('Gast-Anmeldung fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 text-white shadow-2xl relative flex flex-col gap-5 animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Schließen"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-learning to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-md shadow-learning/30">
            DQ
          </div>
          <div>
            <h2 id="auth-modal-title" className="text-lg font-black tracking-tight text-white">
              {mode === 'login' ? 'Willkommen zurück' : 'Konto erstellen'}
            </h2>
            <p className="text-xs text-slate-400">
              Synchronisiere deinen Fortschritt & XP über alle Geräte.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{success}</span>
          </div>
        )}

        {user && !user.isAnonymous && (
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">Aktuell angemeldet als:</span>
              <span className="text-xs font-bold text-white">{user.email}</span>
              <span className="text-[10px] text-emerald-400 font-mono uppercase">{user.role}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-rose-600/30 hover:text-rose-300 text-xs font-bold transition-colors"
            >
              Abmelden
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Name / Spitzname
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="z.B. Alex"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-learning"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              E-Mail Adresse
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="deine.email@beispiel.de"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-learning"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Passwort
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Mindestens 6 Zeichen"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-learning"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-learning to-indigo-600 hover:from-learning hover:to-indigo-500 text-white font-black text-xs md:text-sm shadow-lg shadow-learning/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Jetzt Anmelden</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Konto Registrieren</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              setEmail('admin@deutschquest.app');
              setPassword('adminPassword123');
            }}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-mono py-1 text-center"
          >
            ⚡ Als Admin ausfüllen (admin@deutschquest.app)
          </button>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>
              {mode === 'login' ? 'Noch kein Konto?' : 'Bereits registriert?'}
            </span>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError(null);
              }}
              className="text-learning hover:underline font-bold"
            >
              {mode === 'login' ? 'Jetzt registrieren' : 'Hier anmelden'}
            </button>
          </div>

          <button
            type="button"
            onClick={handleGuestSignIn}
            disabled={loading}
            className="text-xs text-slate-500 hover:text-slate-300 py-1 text-center font-medium"
          >
            Oder als Gast ohne Registrierung fortfahren →
          </button>
        </div>
      </div>
    </div>
  );
};