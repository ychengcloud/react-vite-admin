import { ModalProps } from 'antd';
import { ReactNode } from 'react';
import MyModal from '.';

export interface MyModalProps extends ModalProps {
  url?: string;
  footer?: any[] | ReactNode;
  smallHeader?: boolean;
  handleEvent?: {
    handleClick?: () => void;
  };
}

export default MyModal;
