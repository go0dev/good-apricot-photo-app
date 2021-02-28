import { FC, createContext } from 'react';
import { firebase } from 'lib/firebase';

type IFirebaseContext = {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
};

const FirebaseContext = createContext<IFirebaseContext>({} as IFirebaseContext);

export default FirebaseContext;

export const FirebaseProvider: FC = ({ children }) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  return (
    <FirebaseContext.Provider value={{ auth, db, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};
