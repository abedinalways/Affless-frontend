import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { api } from "./api/apiSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});
