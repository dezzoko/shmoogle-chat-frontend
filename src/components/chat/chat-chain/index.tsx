import MessageList from 'components/message/message-list';
import MessageListItem from 'components/message/message-list-item';
import { FC, useState } from 'react';
import { useChat } from 'shared/hooks/use-chat.hook';
import ChatRoom from '../chat-room';
import ChatRoomForm from '../chat-room/chat-form';
import { ChatChainContent, ChatChainHeader, ChatChainResponses, StyledChatChain } from './styled';

interface ChatChainProps {
  chatId: string;
  messageId: string;
}

export const ChatChain: FC<ChatChainProps> = (props: ChatChainProps) => {
  const { chatId, messageId } = props;
  const { chat, messages } = useChat(chatId);
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const chainRoot = messages.find((message) => message.id === messageId);

  if (!chainRoot || chainRoot.responseToId) {
    return null;
  }

  const textChangeHandler = (value: string) => {
    setText(value);
  };

  const filesChangeHandler = (files: File[]) => {
    setFiles(files);
  };

  const sendHandler = () => {
    alert(text);
  };

  return (
    <StyledChatChain>
      <ChatChainHeader>
        <h3>Активная цепочка</h3>
      </ChatChainHeader>
      <ChatChainContent>
        <MessageListItem message={chainRoot} />
        <ChatChainResponses>
          <hr />
          <span>
            {chainRoot.responses.length} ответ
            {chainRoot.responses.length == 0 || chainRoot.responses.length > 4 ? 'ов' : 'а'}
          </span>
          <hr />
        </ChatChainResponses>
        <MessageList messages={chainRoot.responses} />
        <ChatRoomForm onSendClick={sendHandler} onChangeFiles={filesChangeHandler} onChange={textChangeHandler} />
      </ChatChainContent>
    </StyledChatChain>
  );
};

ChatChain.displayName = 'ChatChain';

export default ChatChain;
