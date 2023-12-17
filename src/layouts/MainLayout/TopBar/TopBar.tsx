import React, { memo } from 'react';

// libs
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { setSearchContent } from 'redux/actions/app.action';

// material core
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';

// material icon
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// components
import Account from './components/Account';
import DarkMode from './components/DarkMode';

// styles
import useStyles from './styles';

type IProps = {
  handleToogleDrawer: () => void;
  isDrawer: boolean;
};

function TopBar({ isDrawer, handleToogleDrawer }: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchContent(e.target.value));
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawer,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className={clsx(classes.menuButton)}
          classes={{ root: classes.emptyRoot }}
          size="large"
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleToogleDrawer}
          edge="start"
          className={clsx(classes.menuButton)}
          classes={{ root: classes.emptyRoot }}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.input,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearch}
            disableInjectingGlobalStyles={true}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.topBar_setting}>
          <DarkMode />
          <Account {...classes} />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(TopBar);
