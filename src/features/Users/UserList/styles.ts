import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  roleContainer: {
    padding: '0.5rem',
    borderRadius: '5px',
    filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
    color: '#fff',
  },
  roleMaster: {
    backgroundColor: '#7F58AF',
  },
  roleAdmin: {
    backgroundColor: '#64C5EB',
  },
  roleEditor: {
    backgroundColor: '#E84D8A',
  },
  roleUser: {
    backgroundColor: '#FEB326',
  },
}));

export default useStyles;
