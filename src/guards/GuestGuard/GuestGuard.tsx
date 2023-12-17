import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

// configs
import { PATH_NAME } from 'configs';

// services
import authService from 'services/authService';

const GuestGuard: FC = () => {
  const isAuth = authService.getAccessToken();

  if (isAuth) return <Navigate to={PATH_NAME.ROOT} />;

  return <Outlet />;
};

export default GuestGuard;
