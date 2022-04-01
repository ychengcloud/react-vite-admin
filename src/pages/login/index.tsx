import React, { FC } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginParams } from '@/models/login';
import { Location } from 'history';
import { useLogin } from '@/api';
import { http } from '../../enum/httpStatus';
import styles from './index.module.less';
import { ReactComponent as LogoSvg } from '@/assets/logo/logo.svg';
import axios from 'axios';

const initialValues: LoginParams = {
  user_name: 'guest',
  user_password: 'guest',
  // remember: true
};

const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation() as Location<{ from: string }>;

  const onFinished = async (form: LoginParams) => {
    console.log(form);
    const result = await loginMutation.mutateAsync(form);
    if (result.statue === http.statusOK) {
      localStorage.setItem('token', result.data.token ?? '');
      const from = location.state?.from || { pathname: '/user' };
      navigate(from);
    } else {
      message.error(result.errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <LogoSvg className={styles.logo} />
            <span className={styles.title}>图书管理项目</span>
          </Link>
        </div>
        <div className={styles.desc}>xx大学图书后台管理系统</div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
          <Form.Item
            name="user_name"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="user_password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住用户</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
