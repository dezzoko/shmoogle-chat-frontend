import { FC, useEffect, useState, memo, useRef, useLayoutEffect } from 'react';

import { Message } from 'core/entities/message.entity';
import { Chat } from 'core/entities/chat.entity';
import { MessageService } from 'shared/services/message.service';
import {
  StyledChatRoom,
  ChatRoomViewBox,
  ChatRoomFormContainer,
  ChatRoomContent,
  ChatRoomScrollDownButton,
} from './styled';
import ChatRoomForm from './chat-form';
import MessageList from 'components/message/message-list';
import ChatGroupGreeter from './chat-group-greeter';
import ChatPrivateGreeter from './dm-greeter';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { CreateMessageDto } from 'core/interfaces/message-service.interface';
import { useChat } from 'shared/hooks/use-chat.hook';

interface ChatRoomProps {
  chatId: string;
}

// TODO: fix scrolldown button

const ChatRoom: FC<ChatRoomProps> = memo((props: ChatRoomProps) => {
  const { chatId } = props;
  const { user } = useAppSelector((state) => state.userReducer);

  //const [messages, setMessages] = useState<Message[]>([]);

  const { chat, messages, sendMessage } = useChat(chatId);

  if (!chat) {
    return null;
  }

  const [formText, setFormText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [scrolledProgress, setScrolledProgress] = useState(100);
  const contentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   fetchMessages(chat.id).then((result) => {
  //     setMessages(result);
  //   });
  // }, [chat]);

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

    sendMessage({ text: formText });

    // const instance = { chatId: chat.id, text: formText, user: user! };
    // addMessage(instance).then((msg) => {
    //   setMessages([...messages, msg]);
    // });
  };

  return (
    <StyledChatRoom>
      <ChatRoomViewBox ref={contentRef} onScroll={scrollHandler}>
        <ChatRoomContent>
          {chat.isGroup ? <ChatGroupGreeter chat={chat} /> : <ChatPrivateGreeter chat={chat} />}
          <MessageList messages={messages} />
        </ChatRoomContent>
        <ChatRoomScrollDownButton onClick={scrollToBottom} isVisible={scrolledProgress < 60}>
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
