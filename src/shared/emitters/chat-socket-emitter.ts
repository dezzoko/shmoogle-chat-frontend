import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { Emitter } from './emitter';
import { SERVER_SOCKET_URL } from 'core/constants/api';

export class ChatSocketEmitter extends Emitter {
  clientSocket: Socket | null = null;

  constructor(connectionUrl: string) {
    super();
    this.clientSocket = io(connectionUrl);
  }

  public subscribe(event: string, callback: (...args: any) => void): this {
    if (this.clientSocket) {
      this.clientSocket.on(event, callback);
    }
    return this;
  }

  public emit(event: string, ...args: any): this {
    if (this.clientSocket) {
      this.clientSocket.emit(event, ...args);
    }
    return this;
  }

  public unsubscribe(event: string, callback: (...args: any) => void): void {
    if (this.clientSocket) {
      this.clientSocket.off(event, callback);
    }
  }

  public closeConnection(): boolean {
    if (this.clientSocket) {
      this.clientSocket.close();
      return true;
    }
    return false;
  }

  public isConnected(): boolean {
    if (!this.clientSocket) return false;

    return !this.clientSocket.disconnected;
  }
}

export const chatSocketEmitter = new ChatSocketEmitter(SERVER_SOCKET_URL);
