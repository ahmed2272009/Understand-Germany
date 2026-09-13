import {
  signInAnonymously as fbSignInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { IAuthService } from '../../core/ports/auth-service.interface';
import { UserProfile } from '../../core/types/user';
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from './firebase-config';
import { LocalAuthService } from '../local/local-auth.service';

export class FirebaseAuthService implements IAuthService {
  private localFallback = new LocalAuthService();

  private mapFirebaseUser(user: User, role: 'student' | 'admin' = 'student'): UserProfile {
    const isAdminEmail = user.email?.toLowerCase().includes('admin') || user.email === 'admin@deutschquest.app';
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || (user.isAnonymous ? 'Gast-Entdecker' : (user.email ? user.email.split('@')[0] : 'Deutsch-Schüler')),
      photoURL: user.photoURL,
      preferredLanguage: 'en',
      role: isAdminEmail ? 'admin' : role,
      isAnonymous: user.isAnonymous,
      createdAt: user.metadata.creationTime || new Date().toISOString(),
      lastLoginAt: user.metadata.lastSignInTime || new Date().toISOString()
    };
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.getCurrentUser();
    }
    const auth = getFirebaseAuth();
    const current = auth.currentUser;
    if (!current) return null;

    try {
      const db = getFirebaseDb();
      const userDoc = await getDoc(doc(db, 'users', current.uid));
      const role = userDoc.exists() && userDoc.data()?.role === 'admin' ? 'admin' : 'student';
      return this.mapFirebaseUser(current, role);
    } catch {
      return this.mapFirebaseUser(current);
    }
  }

  onAuthStateChanged(callback: (user: UserProfile | null) => void): () => void {
    if (!isFirebaseConfigured()) {
      return this.localFallback.onAuthStateChanged(callback);
    }
    const auth = getFirebaseAuth();
    return fbOnAuthStateChanged(auth, async (user) => {
      if (!user) {
        callback(null);
        return;
      }
      try {
        const db = getFirebaseDb();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() && userDoc.data()?.role === 'admin' ? 'admin' : 'student';
        callback(this.mapFirebaseUser(user, role));
      } catch {
        callback(this.mapFirebaseUser(user));
      }
    });
  }

  async signInAnonymously(): Promise<UserProfile> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.signInAnonymously();
    }
    const auth = getFirebaseAuth();
    const cred = await fbSignInAnonymously(auth);
    const profile = this.mapFirebaseUser(cred.user, 'student');

    try {
      const db = getFirebaseDb();
      await setDoc(doc(db, 'users', profile.uid), {
        uid: profile.uid,
        email: null,
        displayName: profile.displayName,
        photoURL: null,
        preferredLanguage: 'en',
        role: 'student',
        isAnonymous: true,
        createdAt: profile.createdAt,
        lastLoginAt: profile.lastLoginAt
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore profile sync error (anonymous):', e);
    }

    return profile;
  }

  async signInWithEmail(email: string, pass: string): Promise<UserProfile> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.signInWithEmail(email);
    }
    const auth = getFirebaseAuth();
    const cred = await signInWithEmailAndPassword(auth, email, pass || 'DeutschQuest2026!');
    const isAdminEmail = email.toLowerCase().includes('admin') || email === 'admin@deutschquest.app';
    const profile = this.mapFirebaseUser(cred.user, isAdminEmail ? 'admin' : 'student');

    try {
      const db = getFirebaseDb();
      await setDoc(doc(db, 'users', profile.uid), {
        lastLoginAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore update lastLoginAt error:', e);
    }

    return profile;
  }

  async signUpWithEmail(email: string, pass: string, name: string): Promise<UserProfile> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.signUpWithEmail(email, pass, name);
    }
    const auth = getFirebaseAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, pass || 'DeutschQuest2026!');
    if (name && cred.user) {
      await updateProfile(cred.user, { displayName: name });
    }
    const profile = this.mapFirebaseUser(cred.user, 'student');

    try {
      const db = getFirebaseDb();
      await setDoc(doc(db, 'users', profile.uid), {
        uid: profile.uid,
        email: profile.email,
        displayName: name || profile.displayName,
        photoURL: null,
        preferredLanguage: 'en',
        role: 'student',
        isAnonymous: false,
        createdAt: profile.createdAt,
        lastLoginAt: profile.lastLoginAt
      });
    } catch (e) {
      console.warn('Firestore user profile creation error:', e);
    }

    return profile;
  }

  async signOut(): Promise<void> {
    if (!isFirebaseConfigured()) {
      return this.localFallback.signOut();
    }
    const auth = getFirebaseAuth();
    await fbSignOut(auth);
  }
}
