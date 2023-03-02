import { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Chat } from 'core/entities/chat.entity';
import { UserStatus } from 'core/entities/status.entity';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { searchInputActions } from 'shared/store/reducers/search-input.slice';
import { ChatHeaderActions, ChatHeaderChatInfo, ChatHeaderFlexContainer, StyledChatHeader } from './styled';
import ChatFilledSvg from 'components/svg/chat-filled-svg';
import CrossArrowsSvg from 'components/svg/cross-arrows-svg';
import LeftArrowSvg from 'components/svg/left-arrow-svg';
import SearchSvg from 'components/svg/search-svg';
import Tooltip from 'components/tooltip';
import ListCheckbox from 'components/ui/list-checkbox';
import RoundButton from 'components/ui/round-button';
import ChatInfoButton from '../chat-info-button';
import FloatingMenu from 'components/ui/floating-menu';
import ChatOptionsMenu from '../chat-options-menu';

interface ChatHeaderProps {
  chat: Chat;
}

// TODO: create user statuses array;
const ChatHeader: FC<ChatHeaderProps> = memo((props: ChatHeaderProps) => {
  const { chat } = props;
  const { setSearchScope } = searchInputActions;

  const [isMenuHidden, setMenuHidden] = useState(true);
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  if (!user) {
    return <div>No user!</div>;
  }

  const otherUser = chat.users.find((u) => u.id !== user.id);
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  const searchButtonHandler = (chat: Chat) => {
    dispatch(setSearchScope(chat));
  };

  useEffect(() => {
    return () => {
      dispatch(setSearchScope(null));
    };
  }, []);

  return (
    <StyledChatHeader>
      <Tooltip text="Назад">
        <RoundButton size="24px" padding="8px" onClick={backButtonHandler}>
          <LeftArrowSvg />
        </RoundButton>
      </Tooltip>

      <ChatHeaderFlexContainer>
        <FloatingMenu element={<ChatOptionsMenu />} isHidden={isMenuHidden} setHidden={setMenuHidden}>
          <ChatInfoButton chat={chat} onClick={(e: any) => setMenuHidden(!isMenuHidden)} />
        </FloatingMenu>
        <ChatHeaderActions>
          <Tooltip text="Поиск в этом чате">
            <RoundButton size="24px" padding="8px" onClick={() => searchButtonHandler(chat)}>
              <SearchSvg />
            </RoundButton>
          </Tooltip>
          <Tooltip text="Вернуться в обычный режим">
            <RoundButton size="24px" padding="8px">
              <CrossArrowsSvg />
            </RoundButton>
          </Tooltip>
          {chat.isGroup ? (
            <Tooltip text="Активные цепочки">
              <RoundButton size="24px" padding="8px">
                <ChatFilledSvg size={24} />
              </RoundButton>
            </Tooltip>
          ) : (
            <></>
          )}
        </ChatHeaderActions>
      </ChatHeaderFlexContainer>
    </StyledChatHeader>
  );
});

ChatHeader.displayName = 'ChatHeader';

export default ChatHeader;
