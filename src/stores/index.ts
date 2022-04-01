import { configureStore } from '@reduxjs/toolkit';
import user from './user';

const stores = configureStore({
  reducer: { user },
});
export type RootState = ReturnType<typeof stores.getState>;
export default stores;
