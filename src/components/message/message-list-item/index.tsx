import { FC, memo } from 'react';

import { Message } from 'core/entities/message.entity';
import { transformDate } from 'shared/utils/transform-date';
import {
  MessageDate,
  MessageFileContainer,
  MessageInfo,
  MessageText,
  MessageUserAvatar,
  MessageWrapper,
} from './styled';
import Avatar from '../../avatar';
import ManagerSvg from '../../svg/manager-svg';
import Tooltip from '../../tooltip';
import MessageFile from '../message-file';

interface MessageListItemProps {
  message: Message;
  isManager?: boolean;
  onlyText?: boolean;
}

const MessageListItem: FC<MessageListItemProps> = memo((props: MessageListItemProps) => {
  const { message, isManager, onlyText } = props;
  const [relative, time, , monthDay, monthString] = transformDate(message.creationDate);
  const readableDate = `${monthDay} ${monthString.slice(0, 3)}., ${time}`;

  return (
    <MessageWrapper marginTop={onlyText ? '' : '20px'}>
      <MessageUserAvatar hidden={onlyText}>
        <Avatar src={message.user.avatarUrl} label={message.user.username[0]} size="28px" />
      </MessageUserAvatar>

      <div>
        <MessageInfo hidden={onlyText}>
          <label>{message.user.username}</label>
          {isManager ? (
            <Tooltip text="Менеджер группы">
              <ManagerSvg />
            </Tooltip>
          ) : (
            <></>
          )}
          <MessageDate>{relative || readableDate}</MessageDate>
        </MessageInfo>
        <MessageText>{message.text}</MessageText>
        {message.files && (
          <MessageFileContainer>
            {message.files.map((f) => (
              <MessageFile key={f.id} file={f} />
            ))}
          </MessageFileContainer>
        )}
      </div>
    </MessageWrapper>
  );
});

MessageListItem.displayName = 'MessageListItem';

export default MessageListItem;
