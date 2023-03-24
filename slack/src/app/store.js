import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import menuReducer from '../features/menuSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage,
}

// const menuPersistConfig = {
//   key: 'menu',
//   storage: storageSession,
// }

const rootReducer = combineReducers({
  user: userReducer,
  // menu: persistReducer(menuPersistConfig, menuReducer)
  menu: menuReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store)