import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import menuReducer from '../features/menuSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer
  },
});