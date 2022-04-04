import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef } from 'react';
import axios, { useGetList } from '../../api/request';
import { http } from '../../enum/httpStatus';
import { IUser, tableHeaderColumns } from './tableHeader';
import useModalState from './components/Modal/AddUser/index.hooks';
import { useDelete } from '../../api/request';
import UserModal from './components/Modal';
import { EDIT_USER } from './components/Modal/EditUser';
const User = () => {
  const { refresh, setModalStatus, setSelectTableData } =
    useModalState('add_user');
  const { setModalStatus: setEditUserModalStatus } = useModalState(EDIT_USER);
  const actionRef = useRef<ActionType>();
  const mutation = useDelete('v1/user/delete');
  const getTableData = async (params: any, sort: any, filter: any) => {
    console.log(sort, filter, params, '9999');
    const keys = Object.keys(sort);
    console.log(keys);
    if (keys.length) {
      params = {
        ...params,
        order_by: keys[0],
        order_type: sort[keys[0]] === 'ascend' ? 'ASC' : 'DESC',
      };
    }
    const result: any = await axios.post('/v1/user/list', params);
    console.log(result);
    return {
      data: result.data,
      success: result.statue === http.statusOK,
      total: result.total,
    };
  };

  const refreshTableFun = () => {
    actionRef.current?.reload();
  };

  const openModal = () => {
    setModalStatus(true);
  };
  useEffect(() => {
    refreshTableFun();
  }, [refresh]);

  const deleteUser = async (record: any) => {
    const res: any = await mutation.mutateAsync(record.id);
    if (res.statue === http.statusOK) {
      message.success('删除成功');
    }
    refreshTableFun();
  };
  const editUser = (record: IUser) => {
    console.log(record);
    setEditUserModalStatus(true);
    setSelectTableData(record);
  };

  return (
    <>
      <ProTable
        columns={tableHeaderColumns(editUser, deleteUser)}
        request={getTableData}
        actionRef={actionRef}
        headerTitle={'用户列表'}
        toolBarRender={() => [
          <Button
            key="addUserButton"
            icon={<PlusOutlined />}
            type="primary"
            onClick={openModal}
          >
            新建
          </Button>,
        ]}
      />
      <UserModal />
    </>
  );
};
export default User;
