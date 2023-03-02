import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import { IGenericService } from './generic-service.interface';

export interface IMessageService extends IGenericService<Message> {
  getAll(chatId?: string): Promise<Message[]>;
  getLastMessage(chatId?: string): Promise<Message>;
  create(instance: CreateMessageDto): Promise<Message>;
  update(id: string, data: UpdateMessageDto): Promise<Message | null>;

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
