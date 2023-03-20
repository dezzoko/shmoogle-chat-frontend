import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export enum ChatPageOption {
  chat = 1,
  files,
  tasks,
}

interface ChatRoomState {
  currentOption: ChatPageOption;
  messageId: string | null;
  responseToId: string | null;
  isChatChainsOpened: boolean;
}

const initialState: ChatRoomState = {
  currentOption: ChatPageOption.chat,
  messageId: null,
  responseToId: null,
  isChatChainsOpened: false,
};

export const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    setHighlightedMessage(state, action: PayloadAction<string | null>) {
      state.messageId = action.payload;
    },
    setCurrentOption(state, action: PayloadAction<ChatPageOption>) {
      state.currentOption = action.payload;
    },
    setResponseToId(state, action: PayloadAction<string | null>) {
      state.responseToId = action.payload;
    },

    setChatChainsOpened(state, action: PayloadAction<boolean>) {
      state.isChatChainsOpened = action.payload;
    },
  },
});

export default chatRoomSlice.reducer;
export const chatRoomActions = chatRoomSlice.actions;
