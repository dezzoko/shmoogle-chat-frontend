import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';

export interface IMessageService {
  getByChatId(chatId: string): Promise<Message[]>;
}

export interface CreateMessageDto {
  chatId: string;
  user: User;
  text: string;
  file?: any;
  responseToId?: string;
}

export interface UpdateMessageDto {
  text?: string;
  file?: any;
}
