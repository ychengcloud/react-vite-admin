import { ProColumns } from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { ReactNode } from 'react';
import { useLocale } from '../../locales';
import { Typography } from 'antd';
import { CheckOutlined, HighlightOutlined } from '@ant-design/icons';
export interface IRole {
  role_weight: string;
  role_name: string;
  id: number;
}

export const tableHeaderColumns = (
  deleteUser: (record: IRole) => void,
  changeRoleName: (record: IRole, newRoleName: string) => void
): ProColumns<IRole>[] => {
  const { fm } = useLocale();
  return [
    {
      dataIndex: 'role_name',
      title: fm('role.RoleNameTitle'),
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
        ],
      },
      render: (_: React.ReactNode, record: IRole) => {
        return (
          <Typography.Paragraph
            editable={{
              icon: <HighlightOutlined />,
              tooltip: 'click to edit text',
              onChange: (newRoleName: string) =>
                changeRoleName(record, newRoleName),
              enterIcon: <CheckOutlined />,
            }}
          >
            {record.role_name}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: fm('global.tips.operation'),
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_: ReactNode, record: IRole) => [
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
