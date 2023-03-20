import ChatFilledSvg from 'components/svg/chat-filled-svg';
import OptionDotsSvg from 'components/svg/option-dots-svg';
import SmileSvg from 'components/svg/smile-svg';
import { RoundButton, Tooltip } from 'components/ui';
import { Message } from 'core/entities/message.entity';
import { FC, ReactNode, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';
import { MessageActionsBox, StyledMessageActions } from './styled';

interface MessageActionsProps {
  message: Message;
  children: ReactNode;
}

const MessageActions: FC<MessageActionsProps> = (props: MessageActionsProps) => {
  const { message, children } = props;

  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { setResponseToId, setChatChainsOpened } = chatRoomActions;

  const setIsVisibleTrue = () => {
    setIsVisible(true);
  };

  const setIsVisibleFalse = () => {
    setIsVisible(false);
  };

  const responseHandler = () => {
    dispatch(setResponseToId(message.id));
    dispatch(setChatChainsOpened(true));
  };

  return (
    <StyledMessageActions onMouseEnter={setIsVisibleTrue} onMouseLeave={setIsVisibleFalse}>
      <MessageActionsBox isVisible={isVisible}>
        <Tooltip text="Отреагировать">
          <RoundButton size="24px" padding="4px">
            <SmileSvg />
          </RoundButton>
        </Tooltip>
        <Tooltip text="Ответить">
          <RoundButton size="24px" padding="4px" onClick={responseHandler}>
            <ChatFilledSvg />
          </RoundButton>
        </Tooltip>
        <Tooltip text="Больше действий">
          <RoundButton size="24px" padding="4px">
            <OptionDotsSvg />
          </RoundButton>
        </Tooltip>
      </MessageActionsBox>
      {children}
    </StyledMessageActions>
  );
};

MessageActions.displayName = 'MessageActions';
export default MessageActions;
