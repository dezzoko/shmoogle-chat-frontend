import { FC } from 'react';
import { File } from 'core/entities/file.entity';
import { FileMessageContainer, ImageContainer } from './styled';
import fileImage from 'assets/file-icon.png';
interface MessageFileProps {
  file: File;
}

const MessageFile: FC<MessageFileProps> = (props: MessageFileProps) => {
  const { name } = props.file;
  //TODO: add image display for files
  const typeFile = name.substring(name.lastIndexOf('.'));
  return (
    <FileMessageContainer>
      <ImageContainer src={fileImage} />
      <div>{name}</div>
    </FileMessageContainer>
  );
};

export default MessageFile;
MessageFile.displayName = 'MessageFile';
