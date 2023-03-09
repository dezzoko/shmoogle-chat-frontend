import styled from 'styled-components';

export const StyledChatRoomForm = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

export const ChatRoomFormTextarea = styled.textarea`
  resize: none;
  flex: 1;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.textarea.borderColor};
  padding: 9px 20px;
  box-sizing: border-box;
  overflow: hidden;
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.textarea.borderColor};
    outline: none;
  }
`;

export const ChatRoomFormSendButton = styled.div<ChatRoomFormSendButtonProps>`
  height: 100%;
  & svg {
    fill: ${(props) => (props.disabled ? props.theme.text.secondaryColor : props.theme.button.textColor)};
  }
`;

interface ChatRoomFormSendButtonProps {
  disabled?: boolean;
}
