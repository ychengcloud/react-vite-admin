import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginParams, Role } from '@/models/login';
import { Locale, User } from '@/models/user';
import { getGlobalState } from '@/models';
import { ModalState } from '../types';

const initialState: User = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: (localStorage.getItem('locale')! ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    'en-us') as Locale,
  newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true,
  logged: false,
  menuList: [],
  username: localStorage.getItem('username') || '',
  role: (localStorage.getItem('username') || '') as Role,
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  modalStatus: {},
  refresh: false,
  tableSelectData: {},
};

const user = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    initModalState: (state, action: PayloadAction<ModalState>) => {
      state.modalStatus = action.payload;
    },
    updateModalState: (
      state,
      action: PayloadAction<{ btnId: string; status: boolean }>
    ) => {
      state.modalStatus[action.payload.btnId] = action.payload.status;
    },
    refreshTable: (state) => {
      state.refresh = !state.refresh;
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const {
  initModalState,
  updateModalState,
  refreshTable,
  toggleCollapsed,
} = user.actions;
export default user.reducer;
