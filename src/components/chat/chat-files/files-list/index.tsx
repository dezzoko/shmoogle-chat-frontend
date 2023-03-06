import { Message } from 'core/entities/message.entity';
import { FC, useMemo } from 'react';
import { FileItem } from '../file-item';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';

interface FilesListProps {
  messages: Message[];
}

const FilesList: FC<FilesListProps> = (props: FilesListProps) => {
  const { messages } = props;
  const { setHighlightedMessage } = chatRoomActions;

  //TODO: complete finding highlighted Message
  const filteredMessages = useMemo(() => messages.filter((message) => message.files), [messages]);

  return (
    <>
      {filteredMessages.map((message) => (
        <FileItem key={message.id} message={message} />
      ))}
    </>
  );
};

FilesList.displayName = 'FilesList';
export default FilesList;
