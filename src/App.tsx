import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import PhotoApp from 'components/pages';
import { ThemeProvider } from '@material-ui/core';
import theme from 'theme';
import HooksProvider from 'hooks/hooksProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <HooksProvider>
      <QueryClientProvider client={queryClient}>
        <PhotoApp />
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </HooksProvider>
  </ThemeProvider>
);

export default App;
