import { FC, useRef } from 'react';

import RoundedPlusSvg from 'components/svg/rounded-plus-svg';
import { RoundButton } from 'components/ui';

interface ChatFeaturesChoiceProps {
  setFile: (f: FileList) => any;
}

const ChatFeaturesChoice: FC<ChatFeaturesChoiceProps> = (props: ChatFeaturesChoiceProps) => {
  const { setFile } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const chatFeatureChoice = (event: any) => {
    setFile(event.target.files);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.files = null;
    }
  };
  return (
    //TODO: refactor component
    <>
      <input
        type="file"
        id="upload-file"
        style={{
          display: 'none',
        }}
        onChange={chatFeatureChoice}
        ref={inputRef}
      />

      <label htmlFor="upload-file">
        <RoundButton size="24px" padding="8px" type="file">
          <RoundedPlusSvg />
        </RoundButton>
      </label>
    </>
  );
};
export default ChatFeaturesChoice;
