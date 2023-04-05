import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Chat } from 'core/entities/chat.entity';
import { User } from 'core/entities/user.entity';

interface UserState {
  user: User | null;
  isUserLoading: boolean;
  isUserError: boolean;
  chats: Chat[];
}

const initialState: UserState = {
  user: null,
  isUserLoading: false,
  isUserError: false,
  chats: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchLoggedUser(state) {
      state.isUserLoading = true;
      state.isUserError = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fetchUserChats(state) {},
    //
    setLoggedUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isUserLoading = false;
      state.isUserError = false;
    },

    setLoggedUserError(state) {
      state.isUserError = true;
      state.isUserLoading = false;
    },

    setUserChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
