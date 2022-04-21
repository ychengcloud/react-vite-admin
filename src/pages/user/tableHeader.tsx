import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { ReactNode } from 'react';
import { fm } from '../../locales';
export interface IUser {
  [key: string]: any;
}

export const tableHeaderColumns = (
  edit: (record: IUser) => void,
  deleteUser: (record: IUser) => void
): ProColumns<IUser>[] => {
  return [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: fm('user.userName'),
      dataIndex: 'user_name',
      ellipsis: true,
      tip: '用户名过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: fm('user.role'),
      dataIndex: 'roleName',
    },
    {
      title: fm('user.sex'),
      dataIndex: 'sex',
      search: false,
      renderText: (text: ReactNode) => {
        if (text === '1') {
          return <>男</>;
        }
        return <>女</>;
      },
    },
    {
      title: fm('user.birthday'),
      dataIndex: 'birthday',
      search: false,
    },
    {
      title: fm('user.borrow_book_count'),
      dataIndex: 'borrow_book_count',
      sorter: true,
    },
    {
      title: fm('user.phone'),
      dataIndex: 'phone',
      search: false,
      sorter: true,
    },
    {
      title: fm('user.email'),
      dataIndex: 'email',
      search: false,
    },
    {
      title: fm('user.remake'),
      dataIndex: 'remake',
      search: false,
    },
    {
      title: fm('global.tips.operation'),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_: ReactNode, record: IUser) => [
        <Button
          key="link"
          type="primary"
          onClick={() => edit(record)}
          disabled={record.id === 1}
        >
          {fm('global.tips.edit')}
        </Button>,
        <Popconfirm
          title={fm('global.tips.deleteConfirm')}
          onConfirm={() => {
            deleteUser(record);
          }}
          disabled={record.id === 1}
        >
          <Button type="text" danger key="link2" disabled={record.id === 1}>
            {fm('global.tips.delete')}
          </Button>
        </Popconfirm>,
      ],
    },
  ];
};
