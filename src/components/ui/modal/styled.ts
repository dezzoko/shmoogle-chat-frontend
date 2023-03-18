import styled from 'styled-components';

export const StyledModal = styled.div<StyledModalProps>`
  display: ${(props) => (props.isHidden ? 'none' : 'block')};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(32, 33, 36, 0.6);
  z-index: 998;
`;

export const ModalBody = styled.div<ModalBodyProps>`
  position: fixed;
  width: fit-content;
  height: fit-content;
  max-height: 80%;
  border-radius: 10px;
  overflow-y: ${(props) => (props.scrollable ? 'scroll' : 'visible')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
`;

export const ModalTitle = styled.div`
  background: ${({ theme }) => theme.block.background};
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 1.5rem;
`;

export const ModalContent = styled.div<ModalContentProps>`
  background: ${({ theme }) => theme.block.secondaryBackground};
  border-radius: 10px;
  padding: ${(props) => (props.hasPadding ? '10px 20px' : '')};
`;

interface StyledModalProps {
  isHidden?: boolean;
}

interface ModalContentProps {
  hasPadding?: boolean;
}

interface ModalBodyProps {
  scrollable?: boolean;
}
