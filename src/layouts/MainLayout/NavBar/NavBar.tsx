import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { matchPath, useLocation } from 'react-router';

// material core
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

// configs
import { navBarCommon } from 'routes/navBarCommon';
import { PATH_NAME } from 'configs';

// types
import { IChildNavBar } from 'models/INavBar';
import NavBarItem from './NavBarItem';

// styles
import useStyles from './styles';

type IProps = {
  isDrawer: boolean;
};

type IChildRoutes = {
  acc: any;
  curr: any;
  pathname: string;
  depth?: number;
  label?: string;
};

function NavBar({ isDrawer }: IProps) {
  const classes = useStyles();
  const location = useLocation();

  const renderChildRoutes = ({ acc, curr, pathname, depth = 0 }: IChildRoutes) => {
    const key = curr.title + depth;

    if (curr.items) {
      const open = matchPath(pathname, curr.href);

      acc.push(
        <NavBarItem
          key={`multi-${key}`}
          depth={depth}
          icon={curr.icon}
          open={Boolean(open)}
          title={curr.title}
          href={curr.href}
          label={curr.label}
          isExternalLink={curr.isExternalLink}
        >
          {renderNavItems({
            depth: depth + 1,
            pathname,
            items: curr.items,
          })}
        </NavBarItem>,
      );
    } else {
      acc.push(
        <NavBarItem
          key={`alone-${key}`}
          depth={depth}
          href={curr.href}
          icon={curr.icon}
          title={curr.title}
          label={curr.label}
          isExternalLink={curr.isExternalLink}
        />,
      );
    }
    return acc;
  };

  const renderNavItems = ({ items, pathname, depth }: IChildNavBar) => {
    return <List disablePadding>{items?.reduce((acc, curr) => renderChildRoutes({ acc, curr, pathname, depth }), [])}</List>;
  };

  const renderNavbarCommon = (navbars: any) => {
    return (
      <>
        {navbars.map((nav: any) => {
          return (
            <List key={nav.subheader} subheader={<ListSubheader disableSticky>{nav.subheader}</ListSubheader>}>
              {renderNavItems({ items: nav.items, pathname: location.pathname })}
            </List>
          );
        })}
      </>
    );
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Link to={PATH_NAME.ROOT} className={classes.navBar_link}>
          {/* <img src="/assets/images/logo.png" alt="Logo" title="logo" /> */}
          <div>
            Quản lý bài viết <br />
            {/* <span className={classes.version}>v.{VERSION_PROJECT.version}</span> */}
          </div>
        </Link>
      </div>
      <Divider />

      {renderNavbarCommon(navBarCommon)}
    </Drawer>
  );
}

export default memo(NavBar);
