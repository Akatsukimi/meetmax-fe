import { ConversationMessages, MessageEventPayload } from "@/lib/types";
import { getConversationMessages } from "@/services/conversations";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessagesState {
  messages: ConversationMessages[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  (id: string) => {
    return getConversationMessages(id);
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { conversation, message } = action.payload;
      const conversationMessage = state.messages.find(
        (cm) => cm.conversationId === conversation.id
      );
      conversationMessage?.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        const index = state.messages.findIndex(
          (cm) => cm.conversationId === id
        );
        console.log("🚀 ~ .addCase ~ index:", index);
        if (index !== -1) {
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
        state.loading = false;
      })
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
