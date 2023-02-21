import { FC, memo } from 'react';

import { Message } from 'core/entities/message.entity';
import { MessageContainer, MessageDate } from './styled';
import { getNativeDate, getNativeTime } from 'shared/utils/transform-date';
import MessageListItem from '../message-list-item';
import MessageListItemResponses from '../message-list-item-responses';

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = memo((props: MessageListProps) => {
  const { messages } = props;
  return (
    <MessageContainer>
      {messages
        .filter((message) => !message.responseToId)
        .map((message, index, filteredMessages) => {
          let isStacked = false;
          let showDate = true;
          const time = getNativeTime(message.creationDate);
          const date = getNativeDate(message.creationDate);

          if (index) {
            const previousMessage = filteredMessages[index - 1];
            const previousTime = getNativeTime(previousMessage.creationDate);
            const previousDate = getNativeDate(previousMessage.creationDate);

            if (previousTime === time && previousMessage.user.id === message.user.id && !message.responses.length) {
              isStacked = true;
            }

            if (date === previousDate) {
              showDate = false;
            }
          }

          return (
            <div key={message.id}>
              {showDate ? <MessageDate>{date}</MessageDate> : <></>}
              <MessageListItem message={message} onlyText={isStacked} isManager={false} />
              <MessageListItemResponses message={message} />
            </div>
          );
        })}
    </MessageContainer>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
