import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

interface SocketState {
    socket: Socket | null;
}

const initialState: SocketState = {
  socket: null
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<string>) {
        const writableState = state as SocketState;
        
        writableState.socket = io(action.payload);
    }
  },
});

export default socketSlice.reducer;
export const socketActions = socketSlice.actions;
