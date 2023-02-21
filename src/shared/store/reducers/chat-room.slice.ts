import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export enum ChatPageOption {
  chat = 1,
  files,
  tasks,
}

interface ChatRoomState {
  currentOption: ChatPageOption;
  messageId: number | null;
}

const initialState: ChatRoomState = {
  currentOption: ChatPageOption.chat,
  messageId: null,
};

export const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    setHighlightedMessage(state, action: PayloadAction<number | null>) {
      state.messageId = action.payload;
    },
    setCurrentOption(state, action: PayloadAction<ChatPageOption>) {
      state.currentOption = action.payload;
    },
  },
});

export default chatRoomSlice.reducer;
export const chatRoomActions = chatRoomSlice.actions;
