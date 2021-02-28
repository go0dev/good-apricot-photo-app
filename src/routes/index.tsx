import { FC, lazy, Suspense, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from 'contexts/auth';

export { default as AppPath } from './paths';

const NavBar = lazy(() => import('./navBar'));
const AuthenticatedApp = lazy(() => import('./routes'));
const UnauthenticatedApp = lazy(() => import('components/pages/login'));

const AppRouter: FC = () => {
  const { isAutenticated } = useContext(AuthContext);

  return (
    <Suspense fallback={<div>Loading</div>}>
      {isAutenticated ? (
        <BrowserRouter>
          <AuthenticatedApp />
          <NavBar />
        </BrowserRouter>
      ) : (
        <UnauthenticatedApp />
      )}
    </Suspense>
  );
};

export default AppRouter;
