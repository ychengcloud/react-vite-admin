import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { toggleCollapsed, changeLocalRedux } from '../../stores/user';
import { Locale, User } from '@/models/user';
const useUserRedux = (): {
  [key: string]: any;
  changeCollapsed: () => void;
} => {
  const reduxStatus = useSelector(
    (state: RootState) => ({
      locale: state.user.locale,
      settings: state.user.settings,
      username: state.user.username,
      avatar: state.user.avatar,
      device: state.user.device,
      collapsed: state.user.collapsed,
      newUser: state.user.newUser,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const changeCollapsed = () => {
    dispatch(toggleCollapsed());
  };
  const changeLocal = (locale: Locale) => {
    dispatch(changeLocalRedux(locale));
  };
  return {
    ...reduxStatus,
    changeCollapsed,
    changeLocal,
  };
};
export default useUserRedux;
