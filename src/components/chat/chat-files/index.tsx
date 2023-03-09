import { FC, memo } from 'react';

import { useChat } from 'shared/hooks/use-chat.hook';
import { FilesItemDiv } from './file-item/styled';
import { ChatFilesButtonContainer, FilesContainer } from './styled';
import ChatOptionSvg from 'components/svg/chat-option-svg';
import FilesList from './files-list';
import { Button, Spinner } from 'components/ui';

interface ChatFilesProps {
  chatId: string;
}

const ChatFiles: FC<ChatFilesProps> = memo((props: ChatFilesProps) => {
  const { chatId } = props;
  const { chat, messages, isMessagesLoading, isMessagesError } = useChat(chatId);

  if (!chat) return null;

  return (
    <FilesContainer>
      <FilesItemDiv>
        <div>Файл</div>
        <div>Отправитель</div>
        <div>Дата отправки</div>
        <div />
      </FilesItemDiv>
      <ChatFilesButtonContainer>
        <Button name="Добавить файл" textJustifyContentProperty="flex-start" gap="10px" isHoverHighlighted>
          <ChatOptionSvg />
        </Button>
      </ChatFilesButtonContainer>
      {isMessagesLoading ? <Spinner /> : <FilesList messages={messages} />}
    </FilesContainer>
  );
});

ChatFiles.displayName = 'ChatFiles';
export default ChatFiles;
