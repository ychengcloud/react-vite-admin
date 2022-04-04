import React, { Suspense, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { localeConfig } from '@/config/locale';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import RenderRouter from './routes';
import './App.less';
// import { useGetCurrentUser } from "./api";
import useUserRedux from './pages/layout/index.redux';
const App: React.FC = () => {
  const { locale } = useUserRedux();
  // const { data: currentUser, error } = useGetCurrentUser();
  // useEffect(() => {
  //   console.log('currentUser: ', currentUser);
  //   setUser({ ...user, username: currentUser?.username || '', logged: true });
  // }, [currentUser]);

  useEffect(() => {
    if (locale.toLowerCase() === 'en-us') {
      moment.locale('en');
    } else if (locale.toLowerCase() === 'zh-cn') {
      moment.locale('zh');
    }
  }, [locale]);

  const getAntdLocale = () => {
    if (locale.toLowerCase() === 'en-us') {
      return enUS;
    } else if (locale.toLowerCase() === 'zh-cn') {
      return zhCN;
    }
  };

  const getLocale = () => {
    const lang = localeConfig.find((item) => {
      return item.key === locale.toLowerCase();
    });

    return lang?.messages;
  };

  // if (error) {
  //   setUser({ ...user, logged: false });
  //   history.push('/login');
  // }

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider locale={locale.split('-')[0]} messages={getLocale()}>
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
