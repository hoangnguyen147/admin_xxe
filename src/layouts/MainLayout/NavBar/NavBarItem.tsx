import React, { FC } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

// material core
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';

// types
import { canAction } from 'helpers';

// components
import { INavBarItem } from 'models/INavBar';
import NavBarExpandItem from './NavBarExpandItem';

// styles
import useStyles from './styles';

const NavBarItem: FC<INavBarItem> = ({
  depth,
  icon: Icon,
  title,
  open: openProp,
  href,
  label,
  isExternalLink = false,
  children,
}) => {
  const classes = useStyles();

  let paddingLeft = 24;
  if (depth > 0) {
    paddingLeft = 40 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <NavBarExpandItem title={title} icon={Icon} open={openProp} style={style}>
        {children}
      </NavBarExpandItem>
    );
  }

  const CustomLink = (props: any) => {
    return (
      <RouterLink
        {...props}
        className={({ isActive }) => (isActive ? `${props.className} ${clsx(classes.active)}` : props.className)}
      />
    );
  };

  return (
    <ListItem className={clsx(classes.itemLeaf)} disableGutters key={title}>
      {canAction('view', label || '') ? (
        <>
          {isExternalLink ? (
            <Link href={href} target="_blank" style={style} className={clsx(classes.buttonLeaf, `depth-${depth}`)}>
              {Icon && <Icon className={classes.icon} size="20" />}
              <span className={classes.title}>{title}</span>
            </Link>
          ) : (
            <Button className={clsx(classes.buttonLeaf, `depth-${depth}`)} component={CustomLink} style={style} to={href}>
              {Icon && <Icon className={classes.icon} size="20" />}
              <span className={classes.title}>{title}</span>
            </Button>
          )}
        </>
      ) : null}
    </ListItem>
  );
};

export default NavBarItem;
