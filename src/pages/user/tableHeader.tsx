import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { ReactNode } from 'react';

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
      title: '用户名',
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
      title: '角色',
      dataIndex: 'roleName',
    },
    {
      title: '性别',
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
      title: '出身年月',
      dataIndex: 'birthday',
      search: false,
    },
    {
      title: '可借书数量',
      dataIndex: 'borrow_book_count',
      sorter: true,
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      search: false,
      sorter: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      search: false,
    },
    {
      title: '简介',
      dataIndex: 'remake',
      search: false,
    },
    {
      title: '操作',
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
          编辑
        </Button>,
        <Popconfirm
          title="确定删除?"
          onConfirm={() => {
            deleteUser(record);
          }}
          disabled={record.id === 1}
        >
          <Button type="text" danger key="link2" disabled={record.id === 1}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];
};
