import { io } from 'socket.io-client';
import { SERVER_SIGNALING_URL } from './api';

export const signalingServerSocket = io(SERVER_SIGNALING_URL);
