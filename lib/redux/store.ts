import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { api } from "./api/apiSlice";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
