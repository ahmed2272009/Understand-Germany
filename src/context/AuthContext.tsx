import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../core/types/user';
import { useServices } from './ServiceContext';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authService } = useServices();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = authService.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, [authService]);

  const signInAnonymously = async () => {
    const u = await authService.signInAnonymously();
    setUser(u);
  };

  const signInWithEmail = async (email: string) => {
    const u = await authService.signInWithEmail(email, '');
    setUser(u);
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInAnonymously, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
