import React, { useRef, useState } from 'react';
import ProTable, { ActionType, EditableProTable } from '@ant-design/pro-table';
import { useLocale } from '@/locales';
import { IRole, tableHeaderColumns } from './tableHeader';
import {
  useCreate,
  useDelete,
  useTableRequest,
  useUpdate,
} from '../../api/request';
import { message } from 'antd';
const Role = () => {
  const mutation = useCreate('/v1/role/add');
  const deleteMutation = useDelete('/v1/role/delete');
  const updateMutation = useUpdate('/v1/role/update');
  const { fm } = useLocale();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<IRole[]>([]);
  const actionRef = useRef<ActionType>();
  const deleteRole = async (record: IRole) => {
    await deleteMutation.mutateAsync({ id: record.id }).then((res: any) => {
      message.success(fm('global.tips.deleteSuccess'));
      actionRef.current?.reload();
    });
  };

  const onChange = (values: IRole[]) => {
    setDataSource(values);
  };
  const saveRole = async (data: IRole) => {
    await mutation
      .mutateAsync({
        ...data,
        role_weight: 1,
      })
      .then(() => {
        message.success(fm('global.tips.addSuccess'));
      });
  };
  const changeRoleName = async (record: IRole, newRoleName: string) => {
    console.log(record, newRoleName);
    await updateMutation
      .mutateAsync({
        id: record.id,
        role_name: newRoleName,
      })
      .then(() => {
        message.success(fm('global.tips.updateSuccess'));
        actionRef.current?.reload();
      });
  };
  return (
    <>
      <EditableProTable<IRole>
        headerTitle={fm('role.headerTitle')}
        columns={tableHeaderColumns(deleteRole, changeRoleName)}
        search={false}
        request={useTableRequest('/v1/role/list')}
        options={{
          density: false,
        }}
        actionRef={actionRef}
        recordCreatorProps={{
          position: 'bottom',
          record: (index, dataSource) => ({
            id: 0,
            role_name: '',
            role_weight: '',
          }),
        }}
        value={dataSource}
        rowKey="id"
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            saveRole(data);
          },
          onChange: setEditableRowKeys,
        }}
        onChange={onChange}
      />
    </>
  );
};
export default Role;
