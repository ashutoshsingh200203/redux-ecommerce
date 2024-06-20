import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    cart: persistedReducer},
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const persistor = persistStore(store)