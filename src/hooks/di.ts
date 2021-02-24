import { useContext } from 'react';

export const useClient = <T>(context: React.Context<T>): T => {
  const client = useContext(context);
  if (!client) {
    throw new Error('Failed inject dependency...');
  }

  return client;
};
