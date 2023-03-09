import styled from 'styled-components';

export const StyledChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 32px;
  box-sizing: border-box;
`;

export const ChatRoomViewBox = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  overflow-y: scroll;
  flex: 1;
  padding: 0 5%;
`;

export const ChatRoomContent = styled.div`
  position: absolute;
`;

export const ChatRoomScrollDownButton = styled.a<ChatRoomScrollDownButtonProps>`
  position: absolute;
  bottom: 10%;
  margin-bottom: ${(props) => props.marginBottom};
  background: ${({ theme }) => theme.button.textColor};
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  padding: 5px 20px;
  color: white;
  user-select: none;
  border-radius: 40px;
  transition: opacity 0.3s ease;
  &:hover {
    cursor: pointer;
  }
`;

export const ChatRoomFormContainer = styled.form<ChatRoomFormContainerProps>`
  padding: 0 5%;
  padding-top: 5px;
  transition: box-shadow 0.5s ease;
  position: relative;
  box-shadow: ${(props) => (props.showShadow ? `0px -10px 10px -4px ${props.theme.textarea.borderColor}` : '')};
`;

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ChatRoomFormContainerProps {
  showShadow?: boolean;
}

interface ChatRoomScrollDownButtonProps {
  isVisible?: boolean;
  marginBottom?: string;
}
