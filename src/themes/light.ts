import { colors, createTheme } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    common: {
      white: '#fff',
    },
    action: {
      active: colors.blueGrey[600],
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    primary: {
      light: '#1976d2 ',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#1976d2',
      dark: '#c51162',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

export default lightTheme;
