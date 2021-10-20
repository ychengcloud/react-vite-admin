import React, { lazy, FC } from "react";

import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import LayoutPage from "@/pages/layout";
import WrapperRouteComponent from "./config";
import { useRoutes, RouteObject } from "react-router-dom";

//TODO: lazy加载组件，prolayout的菜单无法自动选中菜单项，原因不明
// const NotFound = lazy(() => import('@/pages/404'));
// const AccountPage = lazy(() => import('@/pages/account'));
// const Project = lazy(() => import('@/pages/project'));

import NotFound from "@/pages/404";
import Project from "@/pages/project";

const routeList: RouteObject[] = [

  {
    path: "/",
    element: <WrapperRouteComponent element={<LayoutPage />} />,
    children: [
      {
        path: "/dashboard",
        element: <WrapperRouteComponent element={<Dashboard />} />,
      },
      {
        path: "/project/list",
        element: <WrapperRouteComponent element={<Project />} />,
      },
      {
        path: "*",
        element: <WrapperRouteComponent element={<NotFound />} />,
      },
    ],
  },
  {
    path: "login",
    element: <WrapperRouteComponent element={<LoginPage />} />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
