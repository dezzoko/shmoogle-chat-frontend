import { ClientEvents, ServerEvents } from 'core/constants/api';
import { Chat } from 'core/entities/chat.entity';
import { BackendChat } from 'core/types/backend/backend-chat';
import { useEffect } from 'react';
import { userActions } from 'shared/store/reducers/user.slice';
import { backendChatToEntityFactory } from 'shared/utils/factories';
import { useAppDispatch } from './app-dispatch.hook';
import { useAppSelector } from './app-selector.hook';

// TODO: move dispatching from this hook to a component (maybe)

export function useChats() {
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((state) => state.socketReducer);
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
    if (!socket) return;
    socket.on(ClientEvents.NEW_CHATS, newChatsHandler);

    return () => {
      socket.removeListener(ClientEvents.NEW_CHATS, newChatsHandler);
    };
  }, [socket]);

  useEffect(() => {
    if (socket && user) {
      console.log('EMITTING GET AND SUBSCRIBE CHATS');
      socket.emit(ServerEvents.GET_AND_SUBSCRIBE_CHATS, user.id);
    }
  }, [socket, user]);
}
