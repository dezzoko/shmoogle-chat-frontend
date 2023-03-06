import { FC, memo } from 'react';

import ChatOptionSvg from 'components/svg/chat-option-svg';
import ChatPageOptionButton from 'components/ui/chat-page-option-button';
import { FilesItemDiv } from './file-item/styled';
import FilesList from './files-list';
import { ChatFilesButtonContainer, FilesContainer } from './styled';
import { useChat } from 'shared/hooks/use-chat.hook';
import ButtonWithIcon from 'components/ui/with-icon-button';

interface ChatFilesProps {
  chatId: string;
}

const ChatFiles: FC<ChatFilesProps> = (props: ChatFilesProps) => {
  const { chatId } = props;
  const { chat, messages } = useChat(chatId);

  if (!chat) return null;

  return (
    <FilesContainer>
      <FilesItemDiv>
        <div>Файл</div>
        <div>Отправитель</div>
        <div>Дата отправки</div>
        <div></div>
      </FilesItemDiv>
      <ChatFilesButtonContainer>
        <ButtonWithIcon name="Добавить файл" textJustifyContentProperty="flex-start" gap="10px" isHoverHighlighted>
          <ChatOptionSvg />
        </ButtonWithIcon>
      </ChatFilesButtonContainer>
      <FilesList messages={messages} />
    </FilesContainer>
  );
};

ChatFiles.displayName = 'ChatFiles';
export default memo(ChatFiles);
