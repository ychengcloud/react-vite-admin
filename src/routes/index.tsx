import React, { lazy, FC } from 'react';

import Dashboard from '@/pages/dashboard';
import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';
import User from '../pages/user';
import WrapperRouteComponent from './config';
import { useRoutes, RouteObject } from 'react-router-dom';
import Role from '@/pages/role';
const NotFound = lazy(() => import('@/pages/404'));
const Project = lazy(() => import('@/pages/project'));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: (
      <WrapperRouteComponent auth={true}>
        <LayoutPage />
      </WrapperRouteComponent>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <WrapperRouteComponent>
            <Dashboard />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/project/list',
        element: (
          <WrapperRouteComponent>
            <Project />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/user',
        element: (
          <WrapperRouteComponent>
            <User />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/role',
        element: (
          <WrapperRouteComponent>
            <Role />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '*',
        element: (
          <WrapperRouteComponent>
            <NotFound />
          </WrapperRouteComponent>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
