import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material core
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

// material icon
import AccountCircle from '@mui/icons-material/AccountCircle';

// configs
import { PATH_NAME } from 'configs';

// actions
import { logout } from 'redux/actions/auth.action';

// selectors
import { roleSelector } from 'redux/selectors/auth.selector';

function Account({ ...classes }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector(roleSelector);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const _handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  const _handleLogout = () => {
    dispatch(logout());
    navigate(PATH_NAME.LOGIN);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={_handleMenu}
        color="inherit"
        size="large"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={_handleClose}
      >
        <div className={classes.textRole}>{role}</div>
        <Divider />
        {/* <MenuItem>Tài khoản</MenuItem> */}
        <MenuItem className={classes.menuProfile} onClick={_handleLogout}>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
}

export default memo(Account);
