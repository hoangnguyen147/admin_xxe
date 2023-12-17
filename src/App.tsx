import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// material core

// context
import { useGlobalContext } from 'context/GlobalContext';

// containers
import Auth from 'containers/Auth';

// atomic
import Dialog from 'components/molecules/Dialog';
import SnackBarBase from 'components/molecules/SnackBar';

// themes
import themes from 'themes';
import { THEMES } from 'configs';

import { ThemeProvider } from '@mui/styles';
import AppRoutes from 'routes/AppRoutes';
import { StyledEngineProvider, Theme } from '@mui/material';

// react-query
import { QueryClientProvider, QueryClient } from 'react-query';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function App() {
  const { modeTheme } = useGlobalContext();
  const type = modeTheme === THEMES.LIGHT ? 0 : 1;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        notifyOnChangeProps: 'tracked',
      },
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(type)}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Auth>
              <SnackbarProvider
                autoHideDuration={process.env.REACT_APP_AUTO_HIDE_SNACKBAR || 3000}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                maxSnack={process.env.REACT_APP_MAX_SNACKBAR || 3}
              >
                <Dialog />
                <AppRoutes />
                <SnackBarBase />
              </SnackbarProvider>
            </Auth>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
