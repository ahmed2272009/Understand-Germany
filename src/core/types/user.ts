export type UserRole = 'student' | 'admin';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  preferredLanguage: 'en' | 'fr' | 'ar';
  role: UserRole;
  isAnonymous: boolean;
  createdAt: string;
  lastLoginAt: string;
}
