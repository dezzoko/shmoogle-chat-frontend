import { FC, useRef, useLayoutEffect, useState, memo, ChangeEvent } from 'react';

import { MessageService } from 'shared/services/message.service';
import { ChatRoomFormSendButton, ChatRoomFormTextarea, StyledChatRoomForm } from './styled';
import SendArrowSvg from 'components/svg/send-arrow-svg';
import ChatFeaturesChoice from './chat-features-choice';
import UploadedFilesList from 'components/chat/chat-files/uploaded-files-list';
import { RoundButton } from 'components/ui';

interface ChatRoomFormProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSendClick?: () => void;
  onChangeFiles?: (value: File[]) => void;
}

const ChatRoomForm: FC<ChatRoomFormProps> = memo((props: ChatRoomFormProps) => {
  const { placeholder, onChange, onSendClick, onChangeFiles } = props;
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [files, setFile] = useState<File[]>([]);
  const [imgURLs, setImageUrl] = useState<string[]>([]);
  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (onChange) {
      onChange(value);
    }
    setValue(value);
  };

  const onUploadHandler = (fileList: FileList) => {
    const fileArray = Array.from(fileList);
    if (fileList.length !== 0) {
      setFile((prevState: File[]) => {
        return [...prevState, ...fileArray];
      });

      fileArray.forEach(async (f) => {
        if (f.type === 'image/png') {
          const imgURL = await MessageService.Instance.readImageURLs(f);
          setImageUrl((prevState: string[]) => {
            return [...prevState, imgURL];
          });
        }
      });
    }

    if (onChangeFiles) {
      onChangeFiles(fileArray);
    }
  };

  const clickHandler = () => {
    if (onSendClick) {
      onSendClick();
    }
    setFile([]);
    setImageUrl([]);

    setValue('');
  };

  useLayoutEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 16)}px`;
    }
  }, [value]);

  return (
    <>
      <StyledChatRoomForm>
        <ChatFeaturesChoice setFile={onUploadHandler} />

        <ChatRoomFormTextarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        ></ChatRoomFormTextarea>

        <RoundButton size="24px" padding="8px" disabled={!value} onClick={clickHandler}>
          <ChatRoomFormSendButton disabled={!value}>
            <SendArrowSvg />
          </ChatRoomFormSendButton>
        </RoundButton>
      </StyledChatRoomForm>
      <UploadedFilesList files={files} imgURLs={imgURLs} />
    </>
  );
});

ChatRoomForm.displayName = 'ChatRoomForm';

export default ChatRoomForm;
