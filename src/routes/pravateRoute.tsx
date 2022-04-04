import React, { FC } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { useLocale } from '@/locales';
import { RouteProps, useLocation } from 'react-router';
import useUserRedux from '../pages/layout/index.redux';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { username } = useUserRedux();

  console.log('user: ', username);
  const logged = username ? true : false;
  console.log('username: ', username, logged);
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const location = useLocation();

  return logged ? (
    <div>{children}</div>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: 'global.tips.unauthorized' })}
      extra={
        <Button
          type="primary"
          onClick={() =>
            navigate('/login', {
              replace: true,
              state: { from: location.pathname },
            })
          }
        >
          {formatMessage({ id: 'global.tips.goToLogin' })}
        </Button>
      }
    />
  );
};

export default PrivateRoute;
