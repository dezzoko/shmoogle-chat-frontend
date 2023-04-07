import MessageActions from 'components/message/message-actions';
import MessageList from 'components/message/message-list';
import MessageListItem from 'components/message/message-list-item';
import { Message } from 'core/entities/message.entity';
import { FC, memo, useEffect, useState } from 'react';
import { SendMessageDto, useChat } from 'shared/hooks/use-chat.hook';
import ChatRoom from '../chat-room';
import ChatRoomForm from '../chat-room/chat-form';
import { ChatChainContent, ChatChainHeader, ChatChainResponses, StyledChatChain } from './styled';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import CrossSvg from 'components/svg/cross-svg';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { RoundButton } from 'components/ui';

interface ChatChainProps {
  chatId: string;
  messageId: string;
}

const ChatChain: FC<ChatChainProps> = (props: ChatChainProps) => {
  const { chatId, messageId } = props;
  const { chat, messages, sendMessage } = useChat(chatId);
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [chainRootResponses, setChainRootResponses] = useState<Message[] | []>([]);
  const chainRoot = messages.find((message) => message.id === messageId);
  const responses = messages.filter((m) => m.responseToId === messageId);
  const dispatch = useAppDispatch();
  const { setChatChainsOpened } = chatRoomActions;

  useEffect(() => {
    if (chainRoot?.responses) {
      setChainRootResponses(chainRoot?.responses);
    }
  }, []);

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
    sendMessage({ text, files, isResponseToId: messageId } as SendMessageDto);
  };

  return (
    <StyledChatChain>
      <ChatChainHeader>
        <h3>Активная цепочка</h3>
        <RoundButton size="24px" padding="4px" onClick={() => dispatch(setChatChainsOpened(false))}>
          <CrossSvg />
        </RoundButton>
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
        <MessageList messages={responses} showResponses={true} />
        <ChatRoomForm onSendClick={sendHandler} onChangeFiles={filesChangeHandler} onChange={textChangeHandler} />
      </ChatChainContent>
    </StyledChatChain>
  );
};

ChatChain.displayName = 'ChatChain';

export default memo(ChatChain);
