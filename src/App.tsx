import React, { Suspense, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";

import { localeConfig } from "@/config/locale";
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import RenderRouter from "./routes";

import "./App.less";

import { useGetCurrentUser } from "./api";
import { createBrowserHistory } from "history";
import { useRecoilState } from "recoil";
import { userState } from "./stores/user";
import { Locale } from "./models/user";
import LayoutPage from "@/pages/layout";
import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/404";
import Project from "@/pages/project";

const history = createBrowserHistory();

const App: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const { locale } = user;

  const { data: currentUser, error } = useGetCurrentUser();

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    setUser({ ...user, username: currentUser?.username || "", logged: true });
  }, [currentUser]);

  useEffect(() => {
    if (locale.toLowerCase() === "en-us") {
      moment.locale("en");
    } else if (locale.toLowerCase() === "zh-cn") {
      moment.locale("zh");
    }
  }, [locale]);

  const getAntdLocale = () => {
    if (locale.toLowerCase() === "en-us") {
      return enUS;
    } else if (locale.toLowerCase() === "zh-cn") {
      return zhCN;
    }
  };

  const getLocale = () => {
    const lang = localeConfig.find((item) => {
      return item.key === locale.toLowerCase();
    });

    return lang?.messages;
  };

  if (error) {
    setUser({ ...user, logged: false });
    history.push("/login");
  }
  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider locale={locale.split("-")[0]} messages={getLocale()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutPage />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project/list" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
