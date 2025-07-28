import { configureStore } from "@reduxjs/toolkit";
import { storiesApi } from "../services/stories";
import { authApi } from "../services/authServices";
import authReducer from "../slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [storiesApi.reducerPath]: storiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(storiesApi.middleware)
      .concat(authApi.middleware),
});

export default store;
