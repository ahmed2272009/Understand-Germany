import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Support Vite env variables and process.env fallbacks safely
const getEnvVar = (key: string, fallback: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      const val = (import.meta as any).env[key];
      if (val) return val;
    }
  } catch {}
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return fallback;
};

export const firebaseConfig: FirebaseClientConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'AIzaSyDummyKeyForProductionArch'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'deutschquest-app.firebaseapp.com'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'deutschquest-app'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'deutschquest-app.appspot.com'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '1234567890'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:1234567890:web:abcdef123456')
};

export const isFirebaseConfigured = (): boolean => {
  return !firebaseConfig.apiKey.includes('DummyKey') && firebaseConfig.apiKey.length > 10;
};

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

export const getFirebaseApp = (): FirebaseApp => {
  if (!appInstance) {
    appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  }
  return appInstance;
};

export const getFirebaseAuth = (): Auth => {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
  }
  return authInstance;
};

export const getFirebaseDb = (): Firestore => {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp());
  }
  return dbInstance;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storageInstance) {
    storageInstance = getStorage(getFirebaseApp());
  }
  return storageInstance;
};
