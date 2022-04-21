import React, { FC } from 'react';
import enUS from './en-us';
import zhCN from './zh-cn';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';

type Id = keyof typeof zhCN;

interface Props extends MessageDescriptor {
  id: Id;
}
export const LocaleFormatter: FC<Props> = ({ ...props }) => {
  const notChildProps = { ...props, children: undefined };
  return <FormattedMessage {...notChildProps} id={props.id} />;
};

type FormatMessageProps = (descriptor: Props) => string;

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;
  const fm = (id: Id) => {
    return formatMessage({ id });
  };
  return {
    ...rest,
    formatMessage,
    fm,
  };
};

export const fm = (id: Id) => {
  const { fm: f } = useLocale();
  return f(id);
};
