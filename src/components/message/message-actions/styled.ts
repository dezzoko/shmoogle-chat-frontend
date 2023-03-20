import styled from 'styled-components';

export const StyledMessageActions = styled.div`
  position: relative;
`;

export const MessageActionsBox = styled.div<MessageActionsBoxProps>`
  z-index: 10;
  position: absolute;
  background: ${({ theme }) => theme.block.background};
  padding: 5px;
  border-radius: 5px;
  top: -15px;
  right: 10%;
  box-sizing: border-box;
  transition: opacity 0.3s ease, visibility 0s;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  display: flex;
  flex-direction: row;
  gap: 5px;
  border-radius: 30px;
  padding: 5px;
  box-shadow: 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%), 0px 5px 5px -3px rgb(0 0 0 / 20%);
`;

interface MessageActionsBoxProps {
  isVisible?: boolean;
}
