import { FC } from 'react';

import { UserStatus } from 'core/entities/status.entity';
import { Chat } from 'core/entities/chat.entity';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { StyledChatInfoButton } from './styled';
import { ListCheckbox } from 'components/ui';

interface ChatInfoButtonProps {
  chat: Chat;
  onClick: (event?: any) => void;
}

const ChatInfoButton: FC<ChatInfoButtonProps> = (props: ChatInfoButtonProps) => {
  const { chat, onClick } = props;
  const { user } = useAppSelector((state) => state.userReducer);

  let otherUser;

  if (!chat.isGroup && user) {
    otherUser = chat.users.find((u) => u.id !== user.id);
  }

  return (
    <StyledChatInfoButton onClick={onClick}>
      <div>
        {chat.isGroup ? chat.name : otherUser?.username}
        <ListCheckbox initialValue={true} />
      </div>
      <span>
        {chat.isGroup
          ? chat.users.length + ' участник'
          : otherUser?.statusId === UserStatus.online
          ? 'В сети'
          : otherUser?.statusId === UserStatus.nobother
          ? 'Не беспокоить'
          : 'Не в сети'}
      </span>
    </StyledChatInfoButton>
  );
};

ChatInfoButton.displayName = 'ChatInfoButton';

export default ChatInfoButton;
