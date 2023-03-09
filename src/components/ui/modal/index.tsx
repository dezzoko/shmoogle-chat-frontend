import { FC, memo, MouseEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import CrossSvg from 'components/svg/cross-svg';
import RoundButton from '../round-button';
import { ModalBody, ModalContent, ModalTitle, StyledModal } from './styled';

interface ModalProps {
  title?: string;
  scrollable?: boolean;
  hasPadding?: boolean;
  isHidden: boolean;
  setHidden: (value: boolean) => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = memo((props: ModalProps) => {
  const { title, children, isHidden, setHidden, scrollable, hasPadding } = props;

  const clickHandler = (event?: MouseEvent) => {
    setHidden(true);
  };

  return ReactDOM.createPortal(
    <StyledModal isHidden={isHidden} onClick={clickHandler}>
      <ModalBody onClick={(e) => e.stopPropagation()} scrollable={scrollable}>
        {title ? (
          <ModalTitle>
            <label>{title}</label>
            <RoundButton size="20px" padding="4px" onClick={clickHandler}>
              <CrossSvg />
            </RoundButton>
          </ModalTitle>
        ) : (
          <></>
        )}
        <ModalContent hasPadding={hasPadding}>{children}</ModalContent>
      </ModalBody>
    </StyledModal>,
    document.body,
  );
});

Modal.displayName = 'Modal';

export default Modal;
