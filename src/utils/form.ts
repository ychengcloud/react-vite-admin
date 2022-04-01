export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
export const FilterFormColLayout = {
  xs: 24,
  sm: 12,
};
export const FilterFormLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

export function c() {
  return {
    validator: (rules: any, value: string) => {
      const errorMessage = '错了';
      if (value == undefined) {
        return Promise.reject(errorMessage);
      }
      const checkPeriphery = /^[0-9a-zA-Z]$/;
      const checkWhole = /^[0-9a-zA-Z\-\_\#]+$/;
      const success =
        checkPeriphery.test(value[0]) &&
        checkPeriphery.test(value[value.length - 1]) &&
        checkWhole.test(value);
      if (success) {
        return Promise.resolve();
      } else {
        return Promise.reject(errorMessage);
      }
    },
  };
}

export function emailValidate() {
  return {
    validator: (rules: any, value: string) => {
      if (value == undefined) {
        return Promise.resolve();
      }
      const errorMessage = '邮箱格式不正确';
      const reg =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(errorMessage);
    },
  };
}
