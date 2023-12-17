import React, { FC } from 'react';

// configs
import { PATH_NAME } from 'configs';

// services
import authService from 'services/authService';
import { Navigate, Outlet } from 'react-router';
import MainLayout from 'layouts/MainLayout';

const AuthGuard: FC = () => {
  const isAuth = authService.getAccessToken();

  if (!isAuth) return <Navigate to={PATH_NAME.LOGIN} />;

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AuthGuard;
