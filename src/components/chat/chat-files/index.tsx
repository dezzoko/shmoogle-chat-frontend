import ChatOptionSvg from 'components/svg/chat-option-svg';
import ChatPageOptionButton from 'components/ui/chat-page-option-button';
import { Chat } from 'core/entities/chat.entity';
import { FC, memo } from 'react';
import { FilesItemDiv } from './file-item/styled';
import FilesList from './files-list';
import { FilesContainer } from './styled';

interface ChatFilesProps {
  chat: Chat;
}

const ChatFiles: FC<ChatFilesProps> = (props: ChatFilesProps) => {
  return (
    <FilesContainer>
      <FilesItemDiv>
        <div>File</div>
        <div>Posted by</div>
        <div>Date Posted</div>
        <div></div>
      </FilesItemDiv>
      <ChatPageOptionButton title="Add File">
        <ChatOptionSvg />
      </ChatPageOptionButton>
      <FilesList chat={props.chat} />
    </FilesContainer>
  );
};

ChatFiles.displayName = 'ChatFiles';
export default memo(ChatFiles);
