import { storiesApi } from "@/services/storiesApi";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: { [storiesApi.reducerPath]: storiesApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storiesApi.middleware),
});

export default store;
