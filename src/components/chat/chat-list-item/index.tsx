import { FC, useState, memo, useEffect } from 'react';

import { Chat } from 'core/entities/chat.entity';
import { ChatListActions, ChatListItemInfo, ChatListItemLastMessage, StyledChatListItem } from './styled';
import Avatar, { AvatarVariants } from '../../avatar';
import RoundButton from '../../ui/round-button';
import DiagonalArrowSvg from 'components/svg/diagonal-arrow-svg';
import OptionDotsSvg from 'components/svg/option-dots-svg';
import { Message } from 'core/entities/message.entity';
import { MessageService } from 'shared/services/message.service';
import { getNativeDate, getRelativeDate } from 'shared/utils/transform-date';
import { useAppSelector } from 'shared/hooks/app-selector.hook';

interface ChatListItemProps {
  chat: Chat;
  isSmall?: boolean;
  avatarVariant?: AvatarVariants;
}

function transformLastMessage(date: string | undefined) {
  if (!date) {
    return '';
  }

  return getRelativeDate(date) || getNativeDate(date);
}

async function getLastMessage(chatId: string) {
  return MessageService.Instance.getLastMessage(chatId);
}

// TODO: add chat last message to state, fix long chat name view output
const ChatListItem: FC<ChatListItemProps> = memo((props: ChatListItemProps) => {
  const { chat, isSmall, avatarVariant } = props;

  const [isInfoShowed, setIsInfoShowed] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message>();

  useEffect(() => {
    getLastMessage(chat.id).then((msg) => setLastMessage(msg));
  }, [setLastMessage]);

  const onMouseEnterHandler = () => {
    setIsInfoShowed(true);
  };

  const onMouseLeaveHandler = () => {
    setIsInfoShowed(false);
  };

  return (
    <StyledChatListItem onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <ChatListItemInfo>
        <Avatar src={chat.image} label={chat.name[0]} size="28px" variant={avatarVariant} />
        {isSmall ? <></> : <span>{chat.name}</span>}
      </ChatListItemInfo>

      {isInfoShowed && !isSmall ? (
        <ChatListActions>
          <ChatListItemLastMessage>{transformLastMessage(lastMessage?.creationDate)}</ChatListItemLastMessage>
          <RoundButton size="20px" padding="6px">
            <DiagonalArrowSvg />
          </RoundButton>
          <RoundButton size="20px" padding="6px">
            <OptionDotsSvg />
          </RoundButton>
        </ChatListActions>
      ) : (
        <></>
      )}
    </StyledChatListItem>
  );
});

ChatListItem.displayName = 'ChatListItem';

export default ChatListItem;
