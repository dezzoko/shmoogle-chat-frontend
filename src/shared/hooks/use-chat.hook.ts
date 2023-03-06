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
      console.log('no files');
      message = { ...sendMessageDto, chatId, creatorId: user.id };
      chatSocketEmitter.emit(ServerEvents.SEND_MESSAGE, message);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(files[i].name, files[i], files[i].name);
    }

    console.log(files);
    console.log('formdata', Object.fromEntries(formData));
    try {
      const uploadedFiles = await uploadFiles(formData);
      console.log(uploadedFiles);
      message = { ...sendMessageDto, chatId, creatorId: user.id, files: uploadedFiles.map((file) => file.name) };

      chatSocketEmitter.emit(ServerEvents.SEND_MESSAGE, message);
    } catch (error) {
      console.log('error with files', error);
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
    setMessages([]);
    MessageService.Instance.getByChatId(chatId).then((fetchedMessages) => setMessages(fetchedMessages));
  }, [chatId]);

  return { chat, messages, sendMessage };
}

export interface SendMessageDto {
  text: string;
  files?: File[];
  isResponseToId?: string;
}
