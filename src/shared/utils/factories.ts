import { Chat } from 'core/entities/chat.entity';
import { Message } from 'core/entities/message.entity';
import { User } from 'core/entities/user.entity';
import { BackendChat } from 'core/types/backend/backend-chat';
import { BackendMessage } from 'core/types/backend/backend-message';
import { BackendUser } from 'core/types/backend/backend-user';

export function backendMessageToEntityFactory(backendMessage: BackendMessage) {
  let responses: Message[] = [];
  if (!backendMessage.isResponseToId && backendMessage.responses && backendMessage.responses.length) {
    responses = backendMessage.responses.map((message) => backendMessageToEntityFactory(message));
  }

  const message: Message = {
    ...backendMessage,
    user: backendUserToEntityFactory(backendMessage.creatorId),
    responseToId: backendMessage.isResponseToId,
    creationDate: backendMessage.createdAt.toString(),
    responses,
  };

  return message;
}

export function backendChatToEntityFactory(backendChat: BackendChat) {
  const chat: Chat = { ...backendChat, creationDate: backendChat.createdAt.toString() };

  return chat;
}

export function backendUserToEntityFactory(backendUser: BackendUser) {
  let avatarUrl;
  if (backendUser.avatarUrl) {
    avatarUrl = `http://localhost:3000/v1/user/${backendUser.id}/avatar/`;
  }
  const user: User = { ...backendUser, avatarUrl };
  return user;
}
