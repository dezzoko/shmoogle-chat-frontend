import { Chat } from '../entities/chat.entity';
import { User } from '../entities/user.entity';
import { IGenericService } from './generic-service.interface';

export interface IChatService extends IGenericService<Chat> {
  getByUserId(id: string): Promise<Chat[]>;
  create(instance: CreateChatDto): Promise<Chat>;
  update(id: string, data: UpdateChatDto): Promise<Chat | null>;
}

export interface CreateChatDto {
  name: string;
  creatorId: string;
  isGroup?: boolean;
  isHistorySaved?: boolean;
  image?: string;
  users?: User[];
}

export interface UpdateChatDto {
  name?: string;
  creatorId?: string;
  image?: string;
  isHistorySaved?: boolean;
  isGroup?: boolean;
}
