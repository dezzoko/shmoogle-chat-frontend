import { FC, ForwardedRef, forwardRef, memo, useId } from 'react';

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
import ManagerSvg from '../../svg/manager-svg';
import MessageFile from '../message-file';
import { Avatar, Tooltip } from 'components/ui';

interface MessageListItemProps {
  message: Message;
  isManager?: boolean;
  onlyText?: boolean;
  ref?: ForwardedRef<HTMLDivElement>;
}

const MessageListItem: FC<MessageListItemProps> = forwardRef<HTMLDivElement, MessageListItemProps>(
  (props: MessageListItemProps, ref) => {
    const { message, isManager, onlyText } = props;
    const id = useId();
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
          <MessageText ref={ref}>{message.text}</MessageText>
          {message.files && (
            <MessageFileContainer>
              {message.files.map((f) => (
                <MessageFile key={f.id} file={f} />
              ))}
            </MessageFileContainer>
          )}
          {message.likes && (
            <div>
              {message.likes.map((l) => (
                <div key={l.userId + l.value}>{l.value}</div>
              ))}
            </div>
          )}
        </div>
      </MessageWrapper>
    );
  },
);

MessageListItem.displayName = 'MessageListItem';

export default memo(MessageListItem);
