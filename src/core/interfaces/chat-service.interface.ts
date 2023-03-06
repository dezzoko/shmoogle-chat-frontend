import { User } from '../entities/user.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IChatService {}

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
