import { useEffect, useState } from 'react';

import { ClientEvents, ServerEvents } from 'core/constants/api';
import { Message } from 'core/entities/message.entity';
import { BackendMessage } from 'core/types/backend/backend-message';
import { MessageService } from 'shared/services/message.service';
import { backendMessageToEntityFactory } from 'shared/utils/factories';
import { useAppSelector } from './app-selector.hook';
import { chatSocketEmitter } from 'shared/emitters/socket-emitter';

async function uploadFiles(data: FormData) {
  return MessageService.Instance.uploadFiles(data);
}

export function useChat(chatId: string) {
  const { user, chats } = useAppSelector((state) => state.userReducer);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessagesLoading, setMessagesLoading] = useState(true);
  const [isMessagesError, setMessagesError] = useState<Error | null>(null);

  const chat = chats.find((chat) => chat.id === chatId);

  const newMessageHandler = (chatId: string, backendMessage: BackendMessage) => {
    if (!chat || chat.id !== chatId) return;
    //TODO: add responses
    const newMessage: Message = backendMessageToEntityFactory(backendMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sendMessage = async (sendMessageDto: SendMessageDto) => {
    if (!chatSocketEmitter.isConnected() || !user) return;

    const files = sendMessageDto.files;
    let message;
    if (!files || !files.length) {
      message = { ...sendMessageDto, chatId, creatorId: user.id };
      chatSocketEmitter.emit(ServerEvents.SEND_MESSAGE, message);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(files[i].name, files[i], files[i].name);
    }

    try {
      const uploadedFiles = await uploadFiles(formData);
      message = { ...sendMessageDto, chatId, creatorId: user.id, files: uploadedFiles.map((file) => file.name) };
      chatSocketEmitter.emit(ServerEvents.SEND_MESSAGE, message);
    } catch (error) {
      alert(error);
      return;
    }
  };

  useEffect(() => {
    chatSocketEmitter.subscribe(ClientEvents.NEW_MESSAGE, newMessageHandler);

    return () => {
      chatSocketEmitter.unsubscribe(ClientEvents.NEW_MESSAGE, newMessageHandler);
    };
  }, [chatId, chatSocketEmitter.clientSocket]);

  useEffect(() => {
    setMessagesLoading(true);
    setMessagesError(null);

    MessageService.Instance.getByChatId(chatId)
      .then((fetchedMessages) => {
        setMessages(fetchedMessages);
        setMessagesLoading(false);
      })
      .catch((error) => {
        setMessagesError(error);
      });
  }, [chatId]);

  return { chat, messages, sendMessage, isMessagesLoading, isMessagesError };
}

export interface SendMessageDto {
  text: string;
  files?: File[];
  isResponseToId?: string;
}
