import { alpha, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  emptyRoot: {},
  appBar: {
    backgroundColor: theme.palette.primary.light,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${process.env.REACT_APP_DRAWER_WIDTH}px)`,
    marginLeft: `${process.env.REACT_APP_DRAWER_WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: `${theme.spacing(2)}`,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'white !important',
    width: '100%',
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#fff',
  },
  grow: {
    flexGrow: 1,
  },
  menuLanguage: {
    color: '#fff',
  },
  menuProfile: {
    minWidth: 115,
  },
  topBar_setting: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  textRole: {
    padding: '6px 16px',
    marginBottom: 6,
    fontSize: '1rem',
  },
}));

export default useStyles;
