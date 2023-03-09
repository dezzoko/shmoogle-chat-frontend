import styled from 'styled-components';

export const StyledErrorNotifier = styled.div<StyledErrorNotifierProps>`
  position: absolute;
  width: 30%;
  height: 30px;
  background: ${({ theme }) => theme.block.background};
  border-radius: 5px;
  box-shadow: 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%), 0px 5px 5px -3px rgb(0 0 0 / 20%);
  color: ${({ theme }) => theme.text.primaryColor};
  z-index: 10;
  padding: 10px;
  top: 10%;
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
