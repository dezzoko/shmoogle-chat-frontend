import { useEffect } from 'react';

import { ClientEvents, ServerEvents } from 'core/constants/api';
import { Chat } from 'core/entities/chat.entity';
import { BackendChat } from 'core/types/backend/backend-chat';
import { chatSocketEmitter } from 'shared/emitters/socket-emitter';
import { userActions } from 'shared/store/reducers/user.slice';
import { backendChatToEntityFactory } from 'shared/utils/factories';
import { useAppDispatch } from './app-dispatch.hook';
import { useAppSelector } from './app-selector.hook';

// TODO: move dispatching from this hook to a component (maybe)

export function useChats() {
  const dispatch = useAppDispatch();
  const { user, chats } = useAppSelector((state) => state.userReducer);
  const { setUserChats } = userActions;

  const newChatsHandler = (backendChats: BackendChat[]) => {
    console.log('BACKEND CHATS ::: ', backendChats);
    const newChats = backendChats.map((backendChat) => {
      const chat: Chat = backendChatToEntityFactory(backendChat);
      return chat;
    });
    console.log('FETCHED CHATS :::  ', newChats);
    dispatch(setUserChats([...newChats]));
  };

  const newChatHandler = (backendChat: BackendChat) => {
    const newChat: Chat = backendChatToEntityFactory(backendChat);
    console.log('NEW_CHAT', newChat);
    dispatch(setUserChats([...chats, newChat]));
  };

  useEffect(() => {
    if (!chatSocketEmitter.isConnected()) {
      console.log('not connected!');
      return;
    }

    chatSocketEmitter
      .subscribe(ClientEvents.NEW_CHATS, newChatsHandler)
      .subscribe(ClientEvents.NEW_CHAT, newChatHandler);

    return () => {
      chatSocketEmitter
        .unsubscribe(ClientEvents.NEW_CHATS, newChatsHandler)
        .unsubscribe(ClientEvents.NEW_CHAT, newChatHandler);
    };
  }, [chatSocketEmitter.clientSocket]);

  useEffect(() => {
    if (chatSocketEmitter.isConnected() && user) {
      console.log('EMITTING GET AND SUBSCRIBE CHATS');
      chatSocketEmitter.emit(ServerEvents.GET_AND_SUBSCRIBE_CHATS, user.id);
    }
  }, [chatSocketEmitter.clientSocket, user]);
}
