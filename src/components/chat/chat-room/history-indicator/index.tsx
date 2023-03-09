import { FC } from 'react';

import { Chat } from 'core/entities/chat.entity';
import { User } from 'core/entities/user.entity';
import { useAppTheme } from 'shared/hooks/use-app-theme.hook';
import { HistoryInfo, HistoryWho } from './styled';
import ChatHistorySvg from 'components/svg/chat-history-svg';

interface HistoryIndicatorProps {
  chat: Chat;
  user: User;
}

const HistoryIndicator: FC<HistoryIndicatorProps> = (props: HistoryIndicatorProps) => {
  const { chat, user } = props;
  const [theme] = useAppTheme();

  const userId = user.id;
  const creator = chat.users.find((user) => user.id === chat.creatorId);

  return (
    <>
      <HistoryWho>
        <ChatHistorySvg size="20px" fill={theme.text.primaryColor} />
        {chat.isHistorySaved
          ? 'История включена'
          : chat.creatorId === userId
          ? 'Вы выключили историю'
          : `${creator?.username} выключил историю`}
      </HistoryWho>
      <HistoryInfo>
        {chat.isHistorySaved
          ? ' Если история чата включена, отправленные сообщения сохраняются.'
          : 'Когда история отключена, сообщения удаляются через 24 часа'}
      </HistoryInfo>
    </>
  );
};

HistoryIndicator.displayName = 'HistoryIndicator';

export default HistoryIndicator;
