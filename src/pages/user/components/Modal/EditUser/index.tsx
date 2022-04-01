import React from 'react';
import useModalState from '../AddUser/index.hooks';
import BaseForm from '../BaseForm';

const EditUser = () => {
  const { visible, setClose, tableSelectData } = useModalState({
    modalKey: 'edit_user',
  });
  const save = () => {};
  return (
    <>
      <BaseForm
        title="编辑用户"
        visible={visible}
        setClose={setClose}
        initialValues={tableSelectData}
      />
    </>
  );
};

export default EditUser;
