import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./features/users/usersSlice";
import messagesReducer from "./features/messages/messageSlice";
import conversationsReducer from "./features/conversations/conversationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      conversation: conversationsReducer,
      messages: messagesReducer,
      user: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
