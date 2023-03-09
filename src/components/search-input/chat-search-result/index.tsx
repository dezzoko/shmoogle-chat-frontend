import { FC } from 'react';

import { Chat } from 'core/entities/chat.entity';
import { StyledChatSearchResult, ChatSearchResultAvatarContainer, ChatSearchResultInfo } from './styled';
import Avatar, { AvatarVariants } from 'components/ui/avatar';

interface ChatSearchResultProps {
  chat: Chat;
}

const ChatSearchResult: FC<ChatSearchResultProps> = (props: ChatSearchResultProps) => {
  const { chat } = props;

  return (
    <StyledChatSearchResult>
      <ChatSearchResultAvatarContainer>
        <Avatar size="32px" src={chat.image} label={chat.name[0]} variant={AvatarVariants.square} />
      </ChatSearchResultAvatarContainer>
      <ChatSearchResultInfo>
        <span>{chat.name}</span>
      </ChatSearchResultInfo>
    </StyledChatSearchResult>
  );
};

ChatSearchResult.displayName = 'ChatSearchResult';

export default ChatSearchResult;
