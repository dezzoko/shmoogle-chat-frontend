import { FC, memo, useLayoutEffect, useRef } from 'react';

import { Message } from 'core/entities/message.entity';
import { MessageContainer, MessageDate } from './styled';
import { getNativeDate, getNativeTime } from 'shared/utils/transform-date';
import MessageListItem from '../message-list-item';
import MessageListItemResponses from '../message-list-item-responses';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { useAppTheme } from 'shared/hooks/use-app-theme.hook';

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = memo((props: MessageListProps) => {
  const { messages } = props;

  const dispatch = useAppDispatch();
  const [theme] = useAppTheme();
  const { messageId } = useAppSelector((state) => state.chatRoomReducer);
  const { setHighlightedMessage } = chatRoomActions;

  const highlightedMessageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!highlightedMessageRef.current || !messageId) return;

    highlightedMessageRef.current.scrollIntoView();
    highlightedMessageRef.current.style.background = theme.button.hoverColor;
    highlightedMessageRef.current.style.transition = 'background 1s ease';
    window.setTimeout(() => {
      if (!highlightedMessageRef.current) return;
      highlightedMessageRef.current.style.background = '';
      dispatch(setHighlightedMessage(null));
    }, 2000);
  }, [highlightedMessageRef.current, messageId, messages]);

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
              <MessageListItem
                message={message}
                onlyText={isStacked}
                isManager={false}
                ref={messageId === message.id ? highlightedMessageRef : null}
              />
              <MessageListItemResponses message={message} />
            </div>
          );
        })}
    </MessageContainer>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
