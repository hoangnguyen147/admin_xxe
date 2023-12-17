// material core

import light from './light';
import dark from './dark';
import typography from './typography';
import { createTheme } from '@mui/material';

const typeTheme = [light, dark];

const themes = (type: number) => {
  return createTheme({ ...typeTheme[type], typography: { ...typography } });
};

export default themes;
