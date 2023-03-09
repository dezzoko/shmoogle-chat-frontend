import { FC, memo } from 'react';

import { Chat } from 'core/entities/chat.entity';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { DmGreeterLogin, DmGreeterUsername, StyledDmGreeter } from './styled';
import HistoryIndicator from '../history-indicator';
import { Avatar } from 'components/ui';

interface DmGreeterProps {
  chat: Chat;
}

const DmGreeter: FC<DmGreeterProps> = memo((props: DmGreeterProps) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { chat } = props;

  if (!user || chat.isGroup || chat.users.length !== 2) {
    return <></>;
  }

  const otherUser = chat.users.find((u) => u.id !== user.id)!;

  return (
    <StyledDmGreeter>
      <Avatar size="80px" src={otherUser.avatarUrl} label={otherUser.username[0]}></Avatar>
      <DmGreeterUsername>{otherUser.username}</DmGreeterUsername>
      <DmGreeterLogin>{otherUser.login}</DmGreeterLogin>
      <HistoryIndicator chat={chat} user={user} />
    </StyledDmGreeter>
  );
});

DmGreeter.displayName = 'DmGreeter';

export default DmGreeter;
