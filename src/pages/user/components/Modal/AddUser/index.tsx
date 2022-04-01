import React, { useRef } from 'react';
import axios, { useCreate } from '../../../../../api/request';
import useModalState from './index.hooks';
import { message } from 'antd';
import { http } from '../../../../../enum/httpStatus';
import BaseForm from '../BaseForm';
const AddUser = () => {
  const formRef = useRef<any>();

  const mutation = useCreate('/v1/user/add');
  const { visible, refreshTable, setModalStatus } = useModalState('add_user');

  const save = async () => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (values: FormData) => {
        console.log(values);
        const res: any = await mutation.mutateAsync(values);
        if (res.statue === http.statusOK) {
          message.success('添加成功');
          setModalStatus(false);
          formRef.current?.resetFields();
          refreshTable();
          return false;
        }
      });
  };

  return (
    <>
      <BaseForm
        title="新建用户"
        visible={visible}
        setClose={() => setModalStatus(false)}
        formRef={formRef}
        onFinish={save}
      />
    </>
  );
};
export default AddUser;
