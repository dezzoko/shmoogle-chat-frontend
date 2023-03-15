import { FC, useState, memo, useRef, useLayoutEffect } from 'react';

import { useChat } from 'shared/hooks/use-chat.hook';
import {
  StyledChatRoom,
  ChatRoomViewBox,
  ChatRoomFormContainer,
  ChatRoomContent,
  ChatRoomScrollDownButton,
  SpinnerContainer,
} from './styled';
import ChatRoomForm from './chat-form';
import MessageList from 'components/message/message-list';
import ChatGroupGreeter from './chat-group-greeter';
import ChatPrivateGreeter from './dm-greeter';
import { Spinner } from 'components/ui';

interface ChatRoomProps {
  chatId: string;
}

// TODO: fix scrolldown button
const ChatRoom: FC<ChatRoomProps> = memo((props: ChatRoomProps) => {
  const { chatId } = props;

  const { chat, messages, sendMessage, isMessagesLoading, isMessagesError } = useChat(chatId);
  if (!chat) {
    return null;
  }
  const [formText, setFormText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [scrolledProgress, setScrolledProgress] = useState(100);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollDownButtonRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    if (scrolledProgress > 95) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollHandler = () => {
    if (contentRef.current !== null) {
      const scroll = contentRef.current.scrollTop;
      const height = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const currentScrolled = (scroll / height) * 100;

      if (scrollDownButtonRef.current !== null) {
        scrollDownButtonRef.current.style.bottom = `calc(10% - ${contentRef.current.scrollTop}px)`;
      }

      setScrolledProgress(currentScrolled);
    }
  };

  const scrollToBottom = () => {
    if (contentRef.current !== null) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  const formTextHandler = (value: string) => {
    setFormText(value);
  };

  const filesHandler = (value: File[]) => {
    setFiles(value);
  };

  const sendClickHandler = () => {
    sendMessage({ text: formText, files });
    setFormText('');
    setFiles([]);
  };
  return (
    <StyledChatRoom>
      <ChatRoomViewBox ref={contentRef} onScroll={scrollHandler}>
        {isMessagesLoading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <ChatRoomContent>
            {chat.isGroup ? <ChatGroupGreeter chat={chat} /> : <ChatPrivateGreeter chat={chat} />}
            <MessageList messages={messages} />
          </ChatRoomContent>
        )}
        <ChatRoomScrollDownButton onClick={scrollToBottom} isVisible={scrolledProgress < 60} ref={scrollDownButtonRef}>
          Промотать вниз
        </ChatRoomScrollDownButton>
      </ChatRoomViewBox>
      <ChatRoomFormContainer showShadow={scrolledProgress < 90}>
        <ChatRoomForm onChange={formTextHandler} onSendClick={sendClickHandler} onChangeFiles={filesHandler} />
      </ChatRoomFormContainer>
    </StyledChatRoom>
  );
});

ChatRoom.displayName = 'ChatRoom';

export default ChatRoom;
