import { FC, memo } from "react";

import { Avatar } from "../../avatar";
import { ManagerSvg } from "./manager-svg";
import { Tooltip } from "../../tooltip";
import { Message } from "core/entities/message.entity";
import {
  MessageDate,
  MessageInfo,
  MessageText,
  MessageUserAvatar,
  MessageWrapper,
} from "./styled";
import { transformDate } from "shared/utils/transform-date";

interface MessageListItemProps {
  message: Message;
  isManager?: boolean;
  onlyText?: boolean;
}

export const MessageListItem: FC<MessageListItemProps> = memo(
  (props: MessageListItemProps) => {
    const { message, isManager, onlyText } = props;
    const [relative, time, , monthDay, monthString] = transformDate(
      message.creationDate
    );

    return (
      <MessageWrapper marginTop={onlyText ? "" : "20px"}>
        <MessageUserAvatar hidden={onlyText}>
          <Avatar
            src={message.user.avatarUrl}
            label={message.user.username[0]}
            size="28px"
          />
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
            <MessageDate>
              {relative
                ? relative
                : `${monthDay} ${monthString.slice(0, 3)}., ${time}`}
            </MessageDate>
          </MessageInfo>
          <MessageText>{message.text}</MessageText>
        </div>
      </MessageWrapper>
    );
  }
);