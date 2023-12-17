import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useCommonStyles = makeStyles((theme: Theme) => ({
  colorTextCompleted: {
    color: theme.palette.success.main,
  },
  colorTextInprocess: {
    color: theme.palette.warning.main,
  },
  colorTextNew: {
    color: theme.palette.warning.main,
  },
  chipHigh: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
  },
  chipMedium: {
    backgroundColor: theme.palette.info.main,
    color: '#fff',
  },
  chipLow: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
}));

export default useCommonStyles;
