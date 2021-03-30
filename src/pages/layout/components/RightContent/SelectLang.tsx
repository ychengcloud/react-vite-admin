import React from "react";
import { Menu } from "antd";
import { ReactComponent as ZhCnSvg } from "@/assets/header/zh_CN.svg";
import { ReactComponent as EnUsSvg } from "@/assets/header/en_US.svg";
import { ReactComponent as LanguageSvg } from "@/assets/header/language.svg";
import classes from "./index.module.less";
import { useLocale } from "@/locales";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";
import HeaderDropdown from "../HeaderDropdown";

interface SelectLangProps {
  className?: string;
}

const SelectLang: React.FC<SelectLangProps> = (props) => {
  const {
    ...restProps
  } = props;

  const { formatMessage } = useLocale();
  const [user, setUser] = useRecoilState(userState);

  const { logged, locale, device, settings } = user;
  let className = "";

  const selectLocale = ({ key }: { key: any }) => {
    setUser({ ...user, locale: key });
    localStorage.setItem("locale", key);
  };

  if (
    (settings.navTheme === "dark" && settings.layout === "top") ||
    settings.layout === "mix"
  ) {
    className = `dark`;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      className={classes.action}
      overlay={
        <Menu onClick={selectLocale}>
          <Menu.Item
            style={{ textAlign: "left" }}
            disabled={locale.toLowerCase() === "zh-cn"}
            key="zh-cn"
          >
            <ZhCnSvg /> 简体中文
          </Menu.Item>
          <Menu.Item
            style={{ textAlign: "left" }}
            disabled={locale.toLowerCase() === "en-us"}
            key="en-us"
          >
            <EnUsSvg /> English
          </Menu.Item>
        </Menu>
      }
    >
      <span id='language-change' className={classes.lang}>
        <LanguageSvg className={`anticon `}  />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
