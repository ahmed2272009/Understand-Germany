import { UserProfile } from '../types/user';

export interface IAuthService {
  getCurrentUser(): Promise<UserProfile | null>;
  onAuthStateChanged(callback: (user: UserProfile | null) => void): () => void;
  signInAnonymously(): Promise<UserProfile>;
  signInWithEmail(email: string, pass: string): Promise<UserProfile>;
  signUpWithEmail(email: string, pass: string, name: string): Promise<UserProfile>;
  signOut(): Promise<void>;
}
