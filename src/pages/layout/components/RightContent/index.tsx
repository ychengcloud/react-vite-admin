import { Tag, Space, Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';

import Avatar from './AvatarDropdown';
import HeaderDropdown from '../HeaderDropdown';
import HeaderSearch from '../HeaderSearch';
import classes from './index.module.less';
import SelectLang from './SelectLang';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import useUserRedux from '../../index.redux';

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC = () => {
  const { settings } = useUserRedux();
  let className = classes.right;

  if (
    (settings.navTheme === 'dark' && settings.layout === 'top') ||
    settings.layout === 'mix'
  ) {
    className = `${classes.right} ${classes.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${classes.action} ${classes.search}`}
        placeholder="站内搜索"
        defaultValue="Ant Design"
        options={[
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        onSearch={(value) => {
          console.log('input', value);
        }}
      />
      <HeaderDropdown
        className={classes.action}
        overlay={
          <Menu>
            <Menu.Item
              onClick={() => {
                window.open('/~docs');
              }}
            >
              文档
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                window.open('https://pro.ant.design/docs/getting-started');
              }}
            >
              Ant Design Pro 文档
            </Menu.Item>
          </Menu>
        }
      >
        <span>
          <QuestionCircleOutlined />
        </span>
      </HeaderDropdown>
      <Avatar />

      <SelectLang className={classes.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
