import { message } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useCreate } from '../../../../../api/request';
import { http } from '../../../../../enum/httpStatus';
import { fm } from '../../../../../locales';
import useModalState from '../AddUser/index.hooks';
import BaseForm from '../BaseForm';

export const EDIT_USER = 'edit_user';
const EditUser = () => {
  const { visible, setModalStatus, tableSelectData, refreshTable } =
    useModalState(EDIT_USER);
  const formRef = useRef<any>();
  const mutation = useCreate('/v1/user/update');
  const save = async () => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (values: FormData) => {
        console.log(values);
        const res: any = await mutation.mutateAsync({
          ...values,
          id: tableSelectData.id,
        });
        if (res) {
          message.success(fm('global.tips.updateSuccess'));
          setModalStatus(false);
          formRef.current?.resetFields();
          refreshTable();
          return false;
        }
      });
  };
  const setClose = () => {
    setModalStatus(false);
  };
  useEffect(() => {
    formRef.current?.setFieldsValue({
      ...tableSelectData,
      birthday: tableSelectData.birthday ? tableSelectData.birthday : null,
    });
  }, [visible]);

  return (
    <>
      <BaseForm
        title={fm('global.tips.edit')}
        visible={visible}
        setClose={setClose}
        formRef={formRef}
        onFinish={save}
      />
    </>
  );
};

export default EditUser;
