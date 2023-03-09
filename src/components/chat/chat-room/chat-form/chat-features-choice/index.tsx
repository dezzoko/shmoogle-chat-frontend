import { FC } from 'react';

import RoundedPlusSvg from 'components/svg/rounded-plus-svg';
import { RoundButton } from 'components/ui';

interface ChatFeaturesChoiceProps {
  setFile: (f: FileList) => any;
}

const ChatFeaturesChoice: FC<ChatFeaturesChoiceProps> = (props: ChatFeaturesChoiceProps) => {
  const { setFile } = props;

  const chatFeatureChoice = (event: any) => {
    setFile(event.target.files);
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
