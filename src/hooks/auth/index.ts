import { createContext } from 'react';
import { useClient } from 'hooks/di';

export type AuthHooks = {
  useAuth: () => {
    userId: string;
    userName: string;
    updateUserName: (newName: string) => Promise<void>;
  };
};

export const AuthHooksContext = createContext<AuthHooks>({} as AuthHooks);

export const useAuth: AuthHooks['useAuth'] = () => {
  const client = useClient(AuthHooksContext);

  return client.useAuth();
};
