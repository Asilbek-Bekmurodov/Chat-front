import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import uiReducer from "./features/uiSlice";
import { authApi } from "./services/authApi";
import { chatApi } from "./services/chatApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(chatApi.middleware),
});
