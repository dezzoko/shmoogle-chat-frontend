import { FC, memo } from 'react';

import { Message } from 'core/entities/message.entity';
import { transformDate } from 'shared/utils/transform-date';
import { MessageResponsesContainer, MessageResponsesCount, MessageResponsesLastDate } from './styled';
import CurvedLineSvg from 'components/svg/curved-line-svg';
import ChatFilledSvg from 'components/svg/chat-filled-svg';

interface MessageListItemResponsesProps {
  message: Message;
}

const MessageListItemResponses: FC<MessageListItemResponsesProps> = memo((props: MessageListItemResponsesProps) => {
  const { message } = props;

  const [relative, time, , monthDay, month] = transformDate(message.creationDate);
  const readableDate = monthDay + ` ${month.slice(0, 3)}, ` + time;

  if (!message.responses.length) {
    return <></>;
  }

  return (
    <MessageResponsesContainer>
      <CurvedLineSvg />

      <MessageResponsesCount>
        <div>
          <ChatFilledSvg style={{ marginBottom: '-6px' }} />
        </div>
        <label>
          {message.responses.length} ответ{message.responses.length == 0 || message.responses.length >= 5 ? 'ов' : 'а'}
        </label>
      </MessageResponsesCount>
      <MessageResponsesLastDate>{relative || readableDate}</MessageResponsesLastDate>
    </MessageResponsesContainer>
  );
});

MessageListItemResponses.displayName = 'MessageListItemResponses';

export default MessageListItemResponses;
