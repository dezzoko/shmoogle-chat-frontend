import { FC, useState, memo } from 'react';

import {
  ChatListActions,
  ChatListItemInfo,
  ChatListItemLastMessage,
  ChatListItemName,
  StyledChatListItem,
} from './styled';
import Avatar, { AvatarVariants } from '../../avatar';
import RoundButton from '../../ui/round-button';
import DiagonalArrowSvg from 'components/svg/diagonal-arrow-svg';
import OptionDotsSvg from 'components/svg/option-dots-svg';
import { getNativeDate, getRelativeDate } from 'shared/utils/transform-date';
import { useChat } from 'shared/hooks/use-chat.hook';

interface ChatListItemProps {
  chatId: string;
  isSmall?: boolean;
  avatarVariant?: AvatarVariants;
}

function transformLastMessage(date: string | undefined) {
  if (!date) {
    return '';
  }

  return getRelativeDate(date) || getNativeDate(date);
}

// TODO: add chat last message to state, fix long chat name view output
const ChatListItem: FC<ChatListItemProps> = memo((props: ChatListItemProps) => {
  const { chatId, isSmall, avatarVariant } = props;

  const [isInfoShowed, setIsInfoShowed] = useState(false);
  const { chat, messages } = useChat(chatId);

  if (!chat) return null;

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
        {isSmall ? <></> : <ChatListItemName>{chat.name}</ChatListItemName>}
      </ChatListItemInfo>

      {isInfoShowed && !isSmall ? (
        <ChatListActions>
          {messages && messages.length !== 0 && (
            <ChatListItemLastMessage>
              {transformLastMessage(messages[messages.length - 1].creationDate)}
            </ChatListItemLastMessage>
          )}

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
