import { FC, PropsWithChildren } from 'react';
import { StyledChatPageOptionButton } from './styled';
interface ChatPageOptionButton {
  title: string;
}

const ChatPageOptionButton: FC<PropsWithChildren<ChatPageOptionButton>> = ({ children, title }) => {
  return (
    <StyledChatPageOptionButton>
      {children}
      {title}
    </StyledChatPageOptionButton>
  );
};

ChatPageOptionButton.displayName = 'ChatPageOptionButton';
export default ChatPageOptionButton;
