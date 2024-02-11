import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import localStorage from "redux-persist/lib/storage";
import authReducer from "./slices/auth.slice";

// Api's
import { authServiceApi } from "../services/authService";
import { symptomServiceApi } from "../services/symptomsService";
import { diseaseServiceApi } from "../services/diseaseService";

const rootConfig = {
  key: "medplus_web_v1",
  storage: localStorage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  rootConfig,
  combineReducers({
    auth: authReducer,
    [authServiceApi.reducerPath]: authServiceApi.reducer,
    [symptomServiceApi.reducerPath]: symptomServiceApi.reducer,
    [diseaseServiceApi.reducerPath]: diseaseServiceApi.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authServiceApi.middleware,
      symptomServiceApi.middleware,
      diseaseServiceApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export const persistedStore = persistStore(store);
