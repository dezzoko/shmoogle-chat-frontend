import ChatFilledSvg from 'components/svg/chat-filled-svg';
import OptionDotsSvg from 'components/svg/option-dots-svg';
import SmileSvg from 'components/svg/smile-svg';
import { RoundButton, Tooltip } from 'components/ui';
import { Message } from 'core/entities/message.entity';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';
import { MessageActionsBox, StyledMessageActions } from './styled';
import { useChat } from 'shared/hooks/use-chat.hook';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { FloatingMenu } from 'components/ui';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface MessageActionsProps {
  message: Message;
  children: ReactNode;
}

const MessageActions: FC<MessageActionsProps> = (props: MessageActionsProps) => {
  const { message, children } = props;
  const { sendLike, deleteLike } = useChat(message.chatId);
  const { user } = useAppSelector((state) => state.userReducer);
  const [isVisible, setIsVisible] = useState(false);
  const { isChatChainsOpened } = useAppSelector((state) => state.chatRoomReducer);
  const [isEmojiPickerHidden, setEmojiPickerHidden] = useState(true);
  const dispatch = useAppDispatch();
  const { setResponseToId, setChatChainsOpened } = chatRoomActions;

  const setIsVisibleTrue = () => {
    setIsVisible(true);
  };
  const sendLikeHandler = (emoji: EmojiClickData) => {
    if (!message.likes?.find((like) => like.userId === user!.id)) {
      sendLike({ messageId: message.id, value: emoji.emoji });
      emojiPickerHandler(true);

      return;
    } else {
      deleteLike(message.id);
      emojiPickerHandler(true);
    }
    emojiPickerHandler(true);
  };
  const setIsVisibleFalse = () => {
    if (isEmojiPickerHidden) setIsVisible(false);
  };
  const responseHandler = () => {
    dispatch(setResponseToId(message.id));
    dispatch(setChatChainsOpened(!isChatChainsOpened));
  };
  const emojiPickerHandler = (b: boolean) => {
    setEmojiPickerHidden(b);
    setIsVisible(!b);
  };

  return (
    <StyledMessageActions onMouseEnter={setIsVisibleTrue} onMouseLeave={setIsVisibleFalse}>
      <MessageActionsBox isVisible={isVisible}>
        <Tooltip text="Отреагировать">
          <FloatingMenu
            element={
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  sendLikeHandler(emoji);
                }}
              />
            }
            isHidden={isEmojiPickerHidden}
            setHidden={emojiPickerHandler}
            marginTop="-460px"
            marginLeft="-350px"
          >
            <RoundButton
              size="24px"
              padding="4px"
              onClick={() => {
                setEmojiPickerHidden(!isEmojiPickerHidden);
              }}
            >
              <SmileSvg />
            </RoundButton>
          </FloatingMenu>
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
