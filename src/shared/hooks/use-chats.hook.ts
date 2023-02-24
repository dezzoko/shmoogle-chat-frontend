import { useEffect } from 'react';

import { ClientEvents, ServerEvents } from 'core/constants/api';
import { Chat } from 'core/entities/chat.entity';
import { BackendChat } from 'core/types/backend/backend-chat';
import { chatSocketEmitter } from 'shared/emitters/chat-socket-emitter';
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

  useEffect(() => {
    if (!chatSocketEmitter.isConnected()) return;
    chatSocketEmitter.subscribe(ClientEvents.NEW_CHATS, newChatsHandler);

    return () => {
      chatSocketEmitter.unsubscribe(ClientEvents.NEW_CHATS, newChatsHandler);
    };
  }, [chatSocketEmitter]);

  useEffect(() => {
    if (chatSocketEmitter.isConnected() && user) {
      console.log('EMITTING GET AND SUBSCRIBE CHATS');
      chatSocketEmitter.emit(ServerEvents.GET_AND_SUBSCRIBE_CHATS, user.id);
    }
  }, [chatSocketEmitter, user]);
}
