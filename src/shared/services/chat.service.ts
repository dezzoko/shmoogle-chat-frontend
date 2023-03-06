import { IChatService } from 'core/interfaces/chat-service.interface';

export class ChatService implements IChatService {
  private static instance: ChatService;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }
}
