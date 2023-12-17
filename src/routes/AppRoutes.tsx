import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes, RouteObject } from 'react-router-dom';

// configs
import { PATH_NAME, USER_ROLE } from 'configs';

// containers
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

// route
import RoleRoute from './RoleRoute';

// modules
const Error404View = lazy(() => import('features/Error404View'));
const DenyView = lazy(() => import('features/DenyView'));
const Dashboard = lazy(() => import('features/Dashboard'));
const Login = lazy(() => import('features/Login'));
const Demo = lazy(() => import('features/Demo'));
const PostAdd = lazy(() => import('features/Post/PostAdd'));
const PostList = lazy(() => import('features/Post/PostList'));
const SharingAdd = lazy(() => import('features/Sharing/SharingAdd'));
const SharingList = lazy(() => import('features/Sharing/SharingList'));
const UserList = lazy(() => import('features/Users/UserList'));
const UserAdd = lazy(() => import('features/Users/UserAdd'));

const routesConfig: RouteObject[] = [
  {
    path: PATH_NAME.ERROR_404,
    element: <Error404View />,
  },
  {
    element: <GuestGuard />,
    children: [
      {
        path: PATH_NAME.LOGIN,
        element: <Login />,
        index: true,
      },
    ],
  },
  {
    path: PATH_NAME.ERROR_403,
    element: <DenyView />,
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        element: <Navigate to={PATH_NAME.DASHBOARD} />,
        index: true,
      },
      {
        path: PATH_NAME.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PATH_NAME.POST,
        children: [
          {
            path: PATH_NAME.POST_ADD,
            element: (
              <RoleRoute requireRoles={[USER_ROLE.ADMIN, USER_ROLE.MASTER, USER_ROLE.EDITOR]}>
                <PostAdd />
              </RoleRoute>
            ),
          },
          {
            path: PATH_NAME.POST_LIST,
            element: <PostList />,
          },
        ],
      },
      // {
      //   path: PATH_NAME.SHARING,
      //   children: [
      //     {
      //       path: PATH_NAME.SHARING_ADD,
      //       element: (
      //         <RoleRoute requireRoles={[USER_ROLE.ADMIN, USER_ROLE.MASTER]}>
      //           <SharingAdd />
      //         </RoleRoute>
      //       ),
      //     },
      //     {
      //       path: PATH_NAME.SHARING_LIST,
      //       element: <SharingList />,
      //     },
      //   ],
      // },
      {
        path: PATH_NAME.USER,
        children: [
          {
            path: PATH_NAME.USER_ADD,
            element: (
              <RoleRoute requireRoles={[USER_ROLE.ADMIN, USER_ROLE.MASTER]}>
                <UserAdd />
              </RoleRoute>
            ),
          },
          {
            path: PATH_NAME.USER_LIST,
            element: <UserList />,
          },
        ],
      },
      // {
      //   path: PATH_NAME.DEMO,
      //   element: <Demo />,
      // },
    ],
  },
  {
    path: '*',
    element: <Navigate to={PATH_NAME.ERROR_404} />,
  },
];

function AppRoutes() {
  const appRoutes = useRoutes(routesConfig);
  return <Suspense fallback={<div>Loading...</div>}>{appRoutes}</Suspense>;
}

export default AppRoutes;
