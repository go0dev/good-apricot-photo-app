import { FC } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'theme';
import { FirebaseProvider } from 'contexts/firebase';
import { AuthProvider } from 'contexts/auth';

export const AppProvider: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <FirebaseProvider>
      <AuthProvider>
        <CssBaseline />
        {children}
      </AuthProvider>
    </FirebaseProvider>
  </ThemeProvider>
);
