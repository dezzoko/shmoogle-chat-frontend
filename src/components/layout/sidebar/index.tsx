import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from 'core/constants/routes';
import { sidebarActions } from 'shared/store/reducers/sidebar.slice';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { ChatListContainer, ChatListItemContainer, StyledSidebar } from './styled';
import chatIco from 'assets/chat.png';
import groupIco from 'assets/group.png';
import meetIco from 'assets/meet.png';
import RoundButton from '../../ui/round-button';
import ChatList from '../../chat/chat-list';
import ChatListItem from '../../chat/chat-list-item';
import { AvatarVariants } from 'components/avatar';
import ChatActionsMenu from 'components/chat/chat-actions-menu';

const Sidebar: FC = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpened, isActive, isChatsOpen, isGroupsOpen, isMeetsOpen } = useAppSelector(
    (state) => state.sidebarReducer,
  );
  const { chats } = useAppSelector((state) => state.userReducer);

  const { setIsOpened, setIsChatsOpen, setIsGroupsOpen, setIsMeetsOpen } = sidebarActions;
  const groupChats = chats.filter((chat) => chat.isGroup);
  const privateChats = chats.filter((chat) => !chat.isGroup);

  const chatClickHandler = useCallback((chatId: string) => {
    navigate(`${routes.chat}${chatId}`);
  }, []);

  const dmClickHandler = useCallback((dmId: string) => {
    navigate(`${routes.dm}${dmId}`);
  }, []);

  const mouseEnterHandler = useCallback(() => {
    if (!isActive) {
      dispatch(setIsOpened(true));
    }
  }, [isActive, setIsOpened]);

  const mouseLeaveHandler = useCallback(() => {
    if (!isActive) {
      dispatch(setIsOpened(false));
    }
  }, [isActive, setIsOpened]);

  const openChatsHandler = useCallback(
    (value: boolean) => {
      dispatch(setIsChatsOpen(value));
    },
    [setIsChatsOpen],
  );

  const openGroupsHandler = useCallback(
    (value: boolean) => {
      dispatch(setIsGroupsOpen(value));
    },
    [setIsGroupsOpen],
  );

  const openMeetsHandler = useCallback(
    (value: boolean) => {
      dispatch(setIsMeetsOpen(value));
    },
    [setIsMeetsOpen],
  );

  return (
    <StyledSidebar
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      width={isOpened ? '300px' : ''}
      position={isActive ? 'relative' : 'fixed'}
    >
      {isOpened ? (
        <>
          <ChatListContainer flex={isChatsOpen ? '1' : ''}>
            <ChatList
              name="Чаты"
              chatItems={privateChats}
              tooltipAddText="Начать чат"
              isOpen={isChatsOpen}
              isOpenHandler={openChatsHandler}
              chatItemClickHandler={dmClickHandler}
              menuElement={<ChatActionsMenu />}
            ></ChatList>
          </ChatListContainer>
          <ChatListContainer flex={isGroupsOpen ? '1' : ''}>
            <ChatList
              name="Группы"
              chatItems={groupChats}
              tooltipAddText="Создать или найти чат-группу"
              isOpen={isGroupsOpen}
              isOpenHandler={openGroupsHandler}
              chatItemClickHandler={chatClickHandler}
              avatarVariant={AvatarVariants.square}
              menuElement={<ChatActionsMenu />}
            ></ChatList>
          </ChatListContainer>
          <ChatListContainer flex={isMeetsOpen ? '1' : ''}>
            <ChatList
              name="Встречи"
              chatItems={[]}
              isOpen={isMeetsOpen}
              isOpenHandler={openMeetsHandler}
              chatItemClickHandler={chatClickHandler}
            ></ChatList>
          </ChatListContainer>
        </>
      ) : (
        <>
          <RoundButton size="24px" padding="8px">
            <img src={chatIco} width="24px" height="24px" />
          </RoundButton>
          <ChatListContainer flex={isChatsOpen ? '1' : ''}>
            {isChatsOpen ? (
              privateChats.map((chat) => (
                <ChatListItemContainer key={chat.id}>
                  <ChatListItem chat={chat} isSmall={true} />
                </ChatListItemContainer>
              ))
            ) : (
              <></>
            )}
          </ChatListContainer>
          <RoundButton size="24px" padding="8px">
            <img src={groupIco} width="24px" height="24px" />
          </RoundButton>
          <ChatListContainer flex={isGroupsOpen ? '1' : ''}>
            {isGroupsOpen ? (
              groupChats.map((chat) => (
                <ChatListItemContainer key={chat.id}>
                  <ChatListItem chat={chat} isSmall={true} avatarVariant={AvatarVariants.square} />
                </ChatListItemContainer>
              ))
            ) : (
              <></>
            )}
          </ChatListContainer>
          <RoundButton size="24px" padding="8px">
            <img src={meetIco} width="24px" height="24px" />
          </RoundButton>
          <ChatListContainer flex={isMeetsOpen ? '1' : ''}></ChatListContainer>
        </>
      )}
    </StyledSidebar>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
