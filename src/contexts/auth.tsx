import {
  FC,
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import firebase from 'firebase/app';
import FirebaseContext from './firebase';

type IAuthContext = {
  isAutenticated: boolean;
  userId: string;
  userName: string;
  signUp: (displayName: string) => Promise<void>;
  updateUserName: (displayName: string) => Promise<void>;
};

const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export default AuthContext;

export const AuthProvider: FC = ({ children }) => {
  const { auth } = useContext(FirebaseContext);
  const [user, setUser] = useState<firebase.User | null>(null);
  const isAutenticated = useMemo(() => !!user, [user]);
  const userId = useMemo(() => user?.uid || '', [user]);
  const userName = useMemo(() => user?.displayName || '', [user]);
  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log('state change', authUser);
      if (authUser) {
        setUser(authUser);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const signUp = useCallback(
    async (displayName: string) => {
      const credential = await auth.signInAnonymously();
      await credential.user?.updateProfile({ displayName });
      console.log('complete sign up');
    },
    [auth],
  );

  const updateUserName = useCallback(
    async (displayName: string) => {
      await user?.updateProfile({ displayName });
    },
    [user],
  );

  return (
    <AuthContext.Provider
      value={{ isAutenticated, userId, userName, signUp, updateUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
