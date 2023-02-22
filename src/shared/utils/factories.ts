import { Chat } from 'core/entities/chat.entity';
import { Message } from 'core/entities/message.entity';
import { User } from 'core/entities/user.entity';
import { BackendChat } from 'core/types/backend/backend-chat';
import { BackendMessage } from 'core/types/backend/backend-message';
import { BackendUser } from 'core/types/backend/backend-user';

export function backendMessageToEntityFactory(backendMessage: BackendMessage) {
  const message: Message = {
    ...backendMessage,
    user: backendMessage.creatorId,
    responses: [],
    creationDate: backendMessage.createdAt.toString(),
  };

  return message;
}

export function backendChatToEntityFactory(backendChat: BackendChat) {
  const chat: Chat = { ...backendChat, creationDate: backendChat.createdAt.toString() };

  return chat;
}

export function backendUserToEntityFactory(backendUser: BackendUser) {
  const user: User = { ...backendUser };
  return user;
}
