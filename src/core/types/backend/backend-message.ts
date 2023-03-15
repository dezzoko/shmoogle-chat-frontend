import { BackendUser } from './backend-user';

export interface BackendMessage {
  id: string;
  text: string;
  chatId: string;
  creatorId: BackendUser;
  createdAt: Date;
  hasModified: boolean;
  isResponseToId?: string;
  responses?: BackendMessage[];
}
