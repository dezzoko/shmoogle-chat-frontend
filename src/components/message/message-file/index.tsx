import { FC } from 'react';

import { File } from 'core/entities/file.entity';
import { MessageService } from 'shared/services/message.service';
import { FileMessageContainer, ImageContainer } from './styled';
import fileImage from 'assets/file-icon.png';

interface MessageFileProps {
  file: File;
}

//TODO: add image display for files
//const typeFile = name.substring(name.lastIndexOf('.'));

const MessageFile: FC<MessageFileProps> = (props: MessageFileProps) => {
  const { id, name } = props.file;

  const fileClickHandler = () => {
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
    <FileMessageContainer onClick={fileClickHandler}>
      <ImageContainer src={fileImage} />
      <span>{name}</span>
    </FileMessageContainer>
  );
};

export default MessageFile;
MessageFile.displayName = 'MessageFile';
