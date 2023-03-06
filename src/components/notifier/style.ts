import styled from 'styled-components';

export const StyledErrorNotifier = styled.div<StyledErrorNotifierProps>`
  position: absolute;
  background: ${({ theme }) => theme.block.background};
  color: ${({ theme }) => theme.text.primaryColor};
  z-index: 10;
  padding: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  transition: opacity 0.3s ease, visibility 0s;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
`;

export interface StyledErrorNotifierProps {
  visible: boolean;
}
