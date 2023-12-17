import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Container, Typography, Grid, useTheme, useMediaQuery, Theme } from '@mui/material';

// configs
import { PATH_NAME } from 'configs';

// actions
import { logout } from 'redux/actions/auth.action';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    fontSize: 150,
    lineHeight: '150px',
    fontWeight: 700,
    color: '#252932',
    textShadow: 'rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;fontSize: 150',
  },
  desc: {
    fontWeight: 'normal',
    marginTop: 30,
  },
}));

function DenyView() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _handleLogout = () => {
    dispatch(logout());
    navigate(PATH_NAME.LOGIN);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid container item xs={12} justifyContent="center" direction="column">
            <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'} color="textPrimary" className={classes.heading}>
              403
            </Typography>
            <Typography align="center" variant="h3" className={classes.desc}>
              Sorry, access denied. Please contact admin to verify and update your role.
            </Typography>
            <Box mt={2} display="flex" justifyContent="center">
              <Button color="primary" variant="contained" onClick={_handleLogout}>
                LOGOUT
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DenyView;
