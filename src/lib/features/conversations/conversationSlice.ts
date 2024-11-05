import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { RootState } from "../../store";
import {
  Conversation,
  CreateConversationParams,
  MessageEventPayload,
} from "@/lib/types";
import { getConversations, createConversation } from "@/services/conversations";

export interface ConversationsState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return getConversations();
  }
);

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  async (data: CreateConversationParams) => {
    return await createConversation(data);
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<MessageEventPayload>) => {
      const conversation = action.payload.conversation;
      const index = state.conversations.findIndex(
        (c) => c.id === conversation.id
      );
      if (index === -1) return;
      state.conversations.splice(index, 1);
      state.conversations.unshift(conversation);
      state.conversations[0]["lastMessageSent"] = {
        ...action.payload.message,
        createdAt: new Date(action.payload.message.createdAt),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversationsThunk.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createConversationThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createConversationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createConversationThunk.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

const selectConversations = (state: RootState) =>
  state.conversation.conversations;
const selectConversationId = (state: RootState, id: string) => id;

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) =>
    conversations.find((c) => c.id === conversationId)
);

export const { addConversation, updateConversation } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
