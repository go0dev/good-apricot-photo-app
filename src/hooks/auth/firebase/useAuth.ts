import { firebase } from 'hooks/firebase';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthHooks } from '..';

const useAuth: AuthHooks['useAuth'] = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const auth = useMemo(() => firebase.auth(), []);

  useEffect(() => {
    const unsubscribe = () => {
      auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          await auth.signInAnonymously();
        }
      });
    };

    return () => unsubscribe();
  }, [auth]);

  const updateUserName = useCallback(
    async (displayName: string) => {
      await user?.updateProfile({
        displayName,
      });
    },
    [user],
  );

  return {
    userId: user?.uid || '',
    userName: user?.displayName || '',
    updateUserName,
  };
};

export default useAuth;
