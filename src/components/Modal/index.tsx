import { Button, Modal } from 'antd';
import { MyModalProps } from './index.d';
import React from 'react';

const MyModal: React.FC<MyModalProps> = (props) => {
  const {
    visible,
    title,
    handleEvent,
    children,
    smallHeader,
    width,
    className,
    style,
    ...otherSetting
  } = props;

  const basicSet = {
    title: 'DMP',
    width: width || 800,
    closable: true,
    keyboard: false,
    maskClosable: false,
    footer: [
      <Button
        key="back"
        onClick={(e: any) => {
          handleEvent?.handleClick?.();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        关闭
      </Button>,
    ],
  };
  if (window.innerWidth <= 1366 && !width) {
    basicSet.width = 720;
  }
  const titleName = title || basicSet.title;

  return (
    <Modal
      transitionName=""
      maskTransitionName=""
      {...basicSet}
      title={titleName}
      visible={visible}
      onCancel={handleEvent?.handleClick}
      {...otherSetting}
    >
      {children}
    </Modal>
  );
};

export default MyModal;
