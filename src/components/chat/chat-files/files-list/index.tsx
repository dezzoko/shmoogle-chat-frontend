import { FC, useMemo } from 'react';

import { Message } from 'core/entities/message.entity';
import { FileItem } from '../file-item';

interface FilesListProps {
  messages: Message[];
}

const FilesList: FC<FilesListProps> = (props: FilesListProps) => {
  const { messages } = props;
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
