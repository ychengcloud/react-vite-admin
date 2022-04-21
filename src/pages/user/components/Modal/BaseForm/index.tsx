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
import { useAxios } from '../../../../../api/request';
import { fm } from '../../../../../locales';

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
          label={fm('user.userName')}
          placeholder={fm('global.placeholderInp') + fm('user.userName')}
          rules={[
            {
              required: true,
              message: fm('global.placeholderWri') + fm('user.userName'),
            },
          ]}
        />
        <ProFormSelect
          name="sex"
          width="sm"
          label={fm('user.sex')}
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
          label={fm('user.role')}
          rules={[
            {
              required: true,
              message: fm('global.placeholderSel') + fm('user.role'),
            },
          ]}
          request={getRoleOptions}
        />
        <ProFormDatePicker
          width="sm"
          name="birthday"
          label={fm('user.birthday')}
          placeholder={fm('global.placeholderSel')}
        />
        <ProFormText
          width="sm"
          name="phone"
          label={fm('user.phone')}
          placeholder={fm('global.placeholderWri') + fm('user.phone')}
        />
        <ProFormText
          width="sm"
          name="email"
          label={fm('user.email')}
          placeholder={fm('global.placeholderWri') + fm('user.phone')}
          rules={[emailValidate]}
          validateTrigger="onChange"
        />
        <ProFormDigit
          label={fm('user.borrow_book_count')}
          name="borrow_book_count"
          min={0}
          max={5}
          fieldProps={{ precision: 0 }}
        />
        <ProFormTextArea
          width="lg"
          name="remake"
          label={fm('user.remake')}
          placeholder={fm('global.placeholderWri') + fm('user.remake')}
        />
      </ProForm.Group>
    </ModalForm>
  );
};
export default BaseForm;
