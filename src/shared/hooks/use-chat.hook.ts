import { useEffect, useState } from 'react';

import { ClientEvents, ServerEvents } from 'core/constants/api';
import { Message } from 'core/entities/message.entity';
import { BackendMessage } from 'core/types/backend/backend-message';
import { MessageService } from 'shared/services/message.service';
import { backendMessageToEntityFactory } from 'shared/utils/factories';
import { useAppSelector } from './app-selector.hook';
import { chatSocketEmitter } from 'shared/emitters/socket-emitter';
import { BackendLike } from 'core/types/backend/backend-like';

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

    const newMessage: Message = backendMessageToEntityFactory(backendMessage);
    // if (newMessage.responseToId) {
    //   setMessages((prevMessages) => {
    //     const responseTo = prevMessages.find((message) => message.id === newMessage.responseToId);
    //     if (responseTo) {
    //       const index = prevMessages.indexOf(responseTo);
    //       const newResponseTo = JSON.parse(JSON.stringify(responseTo));
    //       newResponseTo.responses = [...responseTo.responses, newMessage];

    //       return [...prevMessages.slice(0, index), newResponseTo, ...prevMessages.slice(index + 1)];
    //     }
    //     return prevMessages;
    //   });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const newLikeHandler = (chatId: string, backendLike: BackendLike) => {
    if (!chat || chat.id !== chatId) return;

    setMessages((prevMessages) => {
      const likedMessage = prevMessages.find((message) => message.id === backendLike.messageId);
      console.log(likedMessage);

      if (!likedMessage) return [...prevMessages];
      const index = prevMessages.indexOf(likedMessage);
      const newLikedMessage = JSON.parse(JSON.stringify(likedMessage));
      const like = { userId: backendLike.userId, value: backendLike.value };

      if (!newLikedMessage.likes) newLikedMessage.likes = [];
      newLikedMessage.likes.push(like);
      console.log(newLikedMessage);

      return [...prevMessages.slice(0, index), newLikedMessage, ...prevMessages.slice(index + 1)];
    });
  };

  const sendLike = async (sendLikeDto: SendLikeDto) => {
    if (!chatSocketEmitter.isConnected() || !user) return;
    const likedMessage = messages.find((message) => message.id === sendLikeDto.messageId);
    if (!likedMessage) return;
    const like = { ...sendLikeDto, chatId, userId: user.id };
    chatSocketEmitter.emit(ServerEvents.SEND_LIKE, like);
    return;
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
    chatSocketEmitter.subscribe(ClientEvents.NEW_LIKE, newLikeHandler);

    return () => {
      chatSocketEmitter.unsubscribe(ClientEvents.NEW_MESSAGE, newMessageHandler);
      chatSocketEmitter.unsubscribe(ClientEvents.NEW_LIKE, newLikeHandler);
    };
  }, [chatId, chatSocketEmitter.clientSocket]);

  useEffect(() => {
    setMessagesLoading(true);
    setMessagesError(null);

    MessageService.Instance.getByChatId(chatId)
      .then((fetchedMessages) => {
        console.log('FETCHED MESSAGES ', fetchedMessages);

        setMessages(fetchedMessages);
        setMessagesLoading(false);
      })
      .catch((error) => {
        setMessagesError(error);
      });
  }, [chatId]);

  return { chat, messages, sendMessage, sendLike, isMessagesLoading, isMessagesError };
}

export interface SendMessageDto {
  text: string;
  files?: File[];
  isResponseToId?: string;
}

export interface SendLikeDto {
  messageId: string;
  value: string;
}
