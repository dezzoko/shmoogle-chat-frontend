import ChatMessageSvg from 'components/svg/chat-message-svg';
import RoundButton from 'components/ui/round-button';
import { Message } from 'core/entities/message.entity';
import { FC } from 'react';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { chatRoomActions } from 'shared/store/reducers/chat-room.slice';
import { getNativeDate } from 'shared/utils/transform-date';
import { FilesItemDiv } from './styled';

interface FileItemProps {
  message: Message;
}

export const FileItem: FC<FileItemProps> = (props: FileItemProps) => {
  const { setHighlightedMessage } = chatRoomActions;

  const dispatch = useAppDispatch();
  const { message } = props;
  return (
    <>
      {message.files?.map((file) => {
        return (
          <FilesItemDiv key={file.id} type="link">
            <div>{file.name}</div>
            <div>{message.user.username}</div>
            <div>{getNativeDate(message.creationDate)}</div>
            <div>
              <RoundButton
                padding="5px"
                onClick={() => {
                  dispatch(setHighlightedMessage(message.id));
                }}
              >
                <ChatMessageSvg />
              </RoundButton>
            </div>
          </FilesItemDiv>
        );
      })}
    </>
  );
};
