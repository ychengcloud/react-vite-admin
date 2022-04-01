import { ProFormInstance } from '@ant-design/pro-form';
import { MutableRefObject, ReactNode } from 'react';

export interface IBaseForm {
  title: ReactNode;
  visible: boolean;
  setClose: () => void;
  onFinish?: () => Promise<boolean | void>;
  formRef?:
    | MutableRefObject<ProFormInstance<Record<string, any>> | undefined>
    | undefined;
  initialValues?: Record<string, any>;
}
