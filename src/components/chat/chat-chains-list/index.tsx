import CrossSvg from 'components/svg/cross-svg';
import { RoundButton } from 'components/ui';
import { Chat } from 'core/entities/chat.entity';
import { FC } from 'react';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { useChat } from 'shared/hooks/use-chat.hook';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';
import { ChatChainsListContent, ChatChainsListHeader, ChatChainsListTitle, StyledChatChainsList } from './styled';

interface ChatChainsListProps {
  chatId: string;
}

const ChatChainsList: FC<ChatChainsListProps> = (props: ChatChainsListProps) => {
  const { chatId } = props;
  const { chat, messages } = useChat(chatId);
  const { setChatChainsOpened } = chatRoomActions;
  const dispatch = useAppDispatch();

  const messagesWithResponses = messages.filter((message) => message.responses && message.responses.length);

  return (
    <StyledChatChainsList>
      <ChatChainsListHeader>
        <ChatChainsListTitle>Активные цепочки</ChatChainsListTitle>
        <RoundButton size="24px" padding="4px" onClick={() => dispatch(setChatChainsOpened(false))}>
          <CrossSvg />
        </RoundButton>
      </ChatChainsListHeader>
      <ChatChainsListContent>
        {messages && messagesWithResponses.length ? (
          <>
            {messagesWithResponses.map((message) => (
              <div key={message.id}>{message.text}</div>
            ))}
          </>
        ) : (
          <>В этой группе нет цепочек</>
        )}
      </ChatChainsListContent>
    </StyledChatChainsList>
  );
};

ChatChainsList.displayName = 'ChatChainsList';

export default ChatChainsList;
