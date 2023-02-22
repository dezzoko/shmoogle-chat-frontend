import { useEffect, useState } from 'react';
import { ClientEvents, ServerEvents } from 'core/constants/api';
import { Message } from 'core/entities/message.entity';
import { BackendMessage } from 'core/types/backend/backend-message';
import { MessageService } from 'shared/services/message.service';
import { backendMessageToEntityFactory } from 'shared/utils/factories';
import { useAppSelector } from './app-selector.hook';

export function useChat(chatId: string) {
  const { socket } = useAppSelector((state) => state.socketReducer);
  const { user, chats } = useAppSelector((state) => state.userReducer);
  const [messages, setMessages] = useState<Message[]>([]);

  const chat = chats.find((chat) => chat.id === chatId);

  const newMessageHandler = (chatId: string, backendMessage: BackendMessage) => {
    if (!chat || chat.id !== chatId) return;
    //TODO: add responses
    const newMessage: Message = backendMessageToEntityFactory(backendMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sendMessage = (sendMessageDto: SendMessageDto) => {
    if (!socket || !user) return;

    const message = { ...sendMessageDto, chatId, creatorId: user.id };

    socket.emit(ServerEvents.SEND_MESSAGE, message);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(ClientEvents.NEW_MESSAGE, newMessageHandler);

    return () => {
      socket.removeListener(ClientEvents.NEW_MESSAGE, newMessageHandler);
    };
  }, [socket]);

  useEffect(() => {
    setMessages([]);
    MessageService.Instance.getByChatId(chatId).then((fetchedMessages) => setMessages(fetchedMessages));
  }, [chatId]);

  return { chat, messages, sendMessage };
}

export interface SendMessageDto {
  text: string;
  isResponseToId?: string;
}