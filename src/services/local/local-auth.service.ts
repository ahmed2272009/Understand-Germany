import { IAuthService } from '../../core/ports/auth-service.interface';
import { UserProfile } from '../../core/types/user';

const STORAGE_KEY = 'deutschquest_auth_user';

export class LocalAuthService implements IAuthService {
  private listeners: ((user: UserProfile | null) => void)[] = [];

  async getCurrentUser(): Promise<UserProfile | null> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Default guest user
      const guest: UserProfile = {
        uid: 'guest-101',
        email: null,
        displayName: 'Deutsch-Lernender',
        photoURL: null,
        preferredLanguage: 'en',
        role: 'student',
        isAnonymous: true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guest));
      return guest;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  onAuthStateChanged(callback: (user: UserProfile | null) => void): () => void {
    this.listeners.push(callback);
    this.getCurrentUser().then(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  async signInAnonymously(): Promise<UserProfile> {
    const guest: UserProfile = {
      uid: 'guest-' + Math.random().toString(36).substring(2, 9),
      email: null,
      displayName: 'Gast-Entdecker',
      photoURL: null,
      preferredLanguage: 'en',
      role: 'student',
      isAnonymous: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guest));
    this.listeners.forEach(l => l(guest));
    return guest;
  }

  async signInWithEmail(email: string): Promise<UserProfile> {
    const isAdmin = email.toLowerCase().includes('admin');
    const user: UserProfile = {
      uid: 'user-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: email.split('@')[0],
      photoURL: null,
      preferredLanguage: 'en',
      role: isAdmin ? 'admin' : 'student',
      isAnonymous: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.listeners.forEach(l => l(user));
    return user;
  }

  async signUpWithEmail(email: string, _pass: string, name: string): Promise<UserProfile> {
    const user: UserProfile = {
      uid: 'user-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name || email.split('@')[0],
      photoURL: null,
      preferredLanguage: 'en',
      role: 'student',
      isAnonymous: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.listeners.forEach(l => l(user));
    return user;
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    this.listeners.forEach(l => l(null));
  }
}
