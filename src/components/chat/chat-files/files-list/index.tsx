import { Chat } from 'core/entities/chat.entity';
import { File } from 'core/entities/file.entity';
import { Message } from 'core/entities/message.entity';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { MessageService } from 'shared/services/message.service';
import { FileItem } from '../file-item';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';

interface FilesListProps {
  chat: Chat;
}
async function fetchMessages(chatId: number) {
  return MessageService.Instance.getAll(chatId);
}

const FilesList: FC<FilesListProps> = (props: FilesListProps) => {
  const { setHighlightedMessage } = chatRoomActions;

  const dispatch = useAppDispatch();
  //TODO: complete finding highlighted Message
  const messageFindHandler = (messageId: number) => {
    dispatch(setHighlightedMessage(messageId));
  };

  const { chat } = props;
  const [messages, setMessages] = useState<Message[]>([]);

  const filteredMessages = useMemo(() => messages.filter((message) => message.files), [messages]);

  useEffect(() => {
    fetchMessages(chat.id).then((result) => {
      setMessages(result);
    });
  }, [chat]);

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
