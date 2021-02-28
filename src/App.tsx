import { FC, lazy, Suspense } from 'react';
import { AppProvider } from 'contexts';

const AppRouter = lazy(() => import('routes'));

const App: FC = () => (
  <AppProvider>
    <Suspense fallback={<div>Loading</div>}>
      <AppRouter />
    </Suspense>
  </AppProvider>
);

export default App;
