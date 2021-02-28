import { FC, useContext, lazy, Suspense } from 'react';
import { AppProvider } from 'contexts';
import AuthContext from 'contexts/auth';

const AuthenticatedApp = lazy(() => import('routes'));
const UnauthenticatedApp = lazy(() => import('components/pages/login'));

const App: FC = () => {
  const { isAutenticated, signUp } = useContext(AuthContext);
  console.log('signin', signUp);

  return (
    <AppProvider>
      <Suspense fallback={<div>Loading</div>}>
        {isAutenticated ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp handleLogin={signUp} />
        )}
      </Suspense>
    </AppProvider>
  );
};

export default App;
