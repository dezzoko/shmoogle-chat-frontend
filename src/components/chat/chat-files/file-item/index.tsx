import { FC, MouseEvent } from 'react';

import { File } from 'core/entities/file.entity';
import { Message } from 'core/entities/message.entity';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { MessageService } from 'shared/services/message.service';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';
import { getNativeDate } from 'shared/utils/transform-date';
import { FileItemPostedBy, FilesItemDiv } from './styled';
import ChatMessageSvg from 'components/svg/chat-message-svg';
import { Avatar, RoundButton } from 'components/ui';

interface FileItemProps {
  message: Message;
}

export const FileItem: FC<FileItemProps> = (props: FileItemProps) => {
  const { setHighlightedMessage } = chatRoomActions;

  const dispatch = useAppDispatch();
  const { message } = props;

  const findMessageHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    dispatch(setHighlightedMessage(message.id));
    event.stopPropagation();
  };

  const downloadFileHandler = (file: File) => {
    const { id, name } = file;

    MessageService.Instance.getFile(id).then((response) => {
      const href = URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  return (
    <>
      {message.files?.map((file) => {
        return (
          <FilesItemDiv key={file.id} onClick={() => downloadFileHandler(file)}>
            <div>{file.name}</div>
            <FileItemPostedBy>
              <Avatar src={message.user.avatarUrl} label={message.user.username[0]} size="24px" />
              {message.user.username}
            </FileItemPostedBy>
            <div>{getNativeDate(message.creationDate)}</div>
            <div>
              <RoundButton padding="5px" onClick={findMessageHandler}>
                <ChatMessageSvg />
              </RoundButton>
            </div>
          </FilesItemDiv>
        );
      })}
    </>
  );
};
