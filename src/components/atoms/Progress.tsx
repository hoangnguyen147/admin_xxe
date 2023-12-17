import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  containerProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
export default function CircularIndeterminate() {
  const classes = useStyles();
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classes.containerProgress} style={{ height: windowDimensions.height - 128 }}>
      <div className={classes.container}>
        <CircularProgress />
        <p style={{ fontSize: '1.5rem', fontWeight: '400' }}>Loading...</p>
      </div>
    </div>
  );
}
