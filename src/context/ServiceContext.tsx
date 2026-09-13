import React, { createContext, useContext } from 'react';
import { IAuthService } from '../core/ports/auth-service.interface';
import { IProgressRepository } from '../core/ports/progress-repo.interface';
import { ISRSStore } from '../core/ports/srs-store.interface';
import { LocalAuthService } from '../services/local/local-auth.service';
import { LocalProgressService } from '../services/local/local-progress.service';
import { LocalSRSService } from '../services/local/local-srs.service';
import { FirebaseAuthService } from '../services/firebase/firebase-auth.service';
import { FirestoreProgressService } from '../services/firebase/firestore-progress.service';
import { FirestoreSRSService } from '../services/firebase/firestore-srs.service';
import { isFirebaseConfigured } from '../services/firebase/firebase-config';

interface ServiceContainer {
  authService: IAuthService;
  progressRepo: IProgressRepository;
  srsStore: ISRSStore;
  isCloudMode: boolean;
}

const useFirebase = isFirebaseConfigured();

const defaultContainer: ServiceContainer = {
  authService: useFirebase ? new FirebaseAuthService() : new LocalAuthService(),
  progressRepo: useFirebase ? new FirestoreProgressService() : new LocalProgressService(),
  srsStore: useFirebase ? new FirestoreSRSService() : new LocalSRSService(),
  isCloudMode: useFirebase,
};

const ServiceContext = createContext<ServiceContainer>(defaultContainer);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ServiceContext.Provider value={defaultContainer}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => useContext(ServiceContext);
