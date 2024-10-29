import { configureStore } from "@reduxjs/toolkit";

import conversationReducer from "./features/conversations/conversationSlice";
import messageReducer from "./features/messages/messageSlice";

export const store = configureStore({
  reducer: {
    conversations: conversationReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
