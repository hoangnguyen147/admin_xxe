import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
    padding: '7px 16px',
  },
  cardHeaderInprocess: {
    backgroundColor: theme.palette.primary.main,
  },
  cardHeaderCompleted: {
    backgroundColor: theme.palette.success.main,
  },
  paper: {
    '& + &': {
      marginTop: 20,
    },
  },
}));

export default useStyles;
