import io, { ManagerOptions, SocketOptions } from 'socket.io-client';
import { Socket } from 'socket.io-client';

import { Emitter } from './emitter';
import { SERVER_SIGNALING_URL, SERVER_SOCKET_URL } from 'core/constants/api';

export class SocketEmitter extends Emitter {
  clientSocket: Socket | null = null;

  constructor(connectionUrl: string, options?: Partial<ManagerOptions & SocketOptions>) {
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

  public unsubscribe(event: string, callback: (...args: any) => void): this {
    if (this.clientSocket) {
      this.clientSocket.off(event, callback);
    }
    return this;
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

    return true;
  }
}

export const chatSocketEmitter = new SocketEmitter(SERVER_SOCKET_URL);
export const signalSocketEmitter = new SocketEmitter(SERVER_SIGNALING_URL);
