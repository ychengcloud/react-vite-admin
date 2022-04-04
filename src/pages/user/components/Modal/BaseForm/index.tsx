import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import React from 'react';
import { emailValidate } from '../../../../../utils/form';
import { IBaseForm } from './index.d';
import { useGetOne } from '../../../../../api/request';
import { RequestOptionsType } from '@ant-design/pro-utils';
import { useAxios } from '../../../../../api/request';

const BaseForm: React.FC<IBaseForm> = (props) => {
  const axios = useAxios();
  const getRoleOptions = async () => {
    return axios.get('/v1/role/option').then((res) => res as any);
  };
  return (
    <ModalForm
      title={props.title}
      visible={props.visible}
      modalProps={{
        onCancel: () => props.setClose(),
      }}
      onFinish={props.onFinish}
      formRef={props.formRef}
      initialValues={props.initialValues}
    >
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="user_name"
          label="用户名"
          placeholder="请输入名称"
          rules={[{ required: true, message: '请填写名称' }]}
        />
        <ProFormSelect
          name="sex"
          width="sm"
          label="性别"
          options={[
            {
              label: '女',
              value: 0,
            },
            {
              label: '男',
              value: 1,
            },
          ]}
        />
        <ProFormSelect
          name="role"
          width="sm"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
          request={getRoleOptions}
        />
        <ProFormDatePicker
          width="sm"
          name="birthday"
          label="出生年月"
          placeholder="请选择"
        />
        <ProFormText
          width="sm"
          name="phone"
          label="联系方式"
          placeholder="请输入联系方式"
        />
        <ProFormText
          width="sm"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[emailValidate]}
          validateTrigger="onChange"
        />
        <ProFormDigit
          label="可借书数量"
          name="borrow_book_count"
          min={0}
          max={5}
          fieldProps={{ precision: 0 }}
        />
        <ProFormTextArea
          width="lg"
          name="remake"
          label="备注"
          placeholder="请输入备注"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
export default BaseForm;
