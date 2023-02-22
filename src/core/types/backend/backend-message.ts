import { BackendUser } from './backend-user';

export interface BackendMessage {
  id: string;
  text: string;
  chatId: string;
  creatorId: BackendUser;
  isResponseToId: string;
  createdAt: Date;
  hasModified: boolean;
  responses?: BackendMessage[];
}
