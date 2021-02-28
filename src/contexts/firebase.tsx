import { FC, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

type IFirebaseContext = {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
};

export const FirebaseContext = createContext<IFirebaseContext>(
  {} as IFirebaseContext,
);

const initializeApp = () => {
  const config = process.env.REACT_APP_FIREBASE_CONFIG;
  if (!config) {
    throw new Error('Not found firebase config...');
  }
  const isInitialized = firebase.apps.length;
  if (isInitialized > 0) {
    console.info('Firebase has already been initialized.');

    return;
  }
  console.info('Initialize firebase app.');
  firebase.initializeApp(JSON.parse(config));
};

export const FirebaseProvider: FC = ({ children }) => {
  initializeApp();

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  return (
    <FirebaseContext.Provider value={{ auth, db, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};
