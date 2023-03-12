import { Modal, Button } from 'components/ui';
import TextArea from 'components/ui/textArea';
import { FC, useState } from 'react';
import OptionsContainer from '../../options/options-container';
import { QuitContainer, ButtonsContainer } from './styled';
interface ModalQuitMessage {
  quitHandler: () => void;
  quitModalHandler: () => void;
  setQuitModalHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isQuitModalHidden: boolean;
}

const ModalQuitMessage: FC<ModalQuitMessage> = (props: ModalQuitMessage) => {
  const { quitHandler, quitModalHandler, isQuitModalHidden, setQuitModalHidden } = props;

  return (
    <Modal isHidden={isQuitModalHidden} setHidden={setQuitModalHidden}>
      <OptionsContainer>
        <QuitContainer>
          <TextArea textAlign="center">Вы точно хотите выйти?</TextArea>
          <ButtonsContainer>
            <Button name="Нет" isHoverHighlighted={true} onClick={quitModalHandler}></Button>
            <Button name="ЯпидорасЯпидорас" color="red" isHoverHighlighted={true} onClick={quitHandler}></Button>
          </ButtonsContainer>
        </QuitContainer>
      </OptionsContainer>
    </Modal>
  );
};

export default ModalQuitMessage;
