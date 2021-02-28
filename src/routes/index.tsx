import { FC, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';

export { default as AppRoutes } from './routes';
export { default as AppPath } from './paths';

const NavBar = lazy(() => import('./routes'));

const AppRouter: FC = ({ children }) => (
  <BrowserRouter>
    {children}
    <NavBar />
  </BrowserRouter>
);

export default AppRouter;
