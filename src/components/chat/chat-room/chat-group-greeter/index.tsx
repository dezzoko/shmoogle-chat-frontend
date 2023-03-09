import { FC, memo } from 'react';
import { Navigate } from 'react-router-dom';

import { Chat } from 'core/entities/chat.entity';
import { routes } from 'core/constants/routes';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { transformDate } from 'shared/utils/transform-date';
import chatImage from 'assets/new_chat_room.png';
import { ChatGroupAction, ChatGroupActionContainer, ChatGroupGreeterDate, StyledChatGroupGreeter } from './styled';
import { Button } from 'components/ui';
import AddUserSvg from 'components/svg/add-user-svg';
import ShareFileSvg from 'components/svg/share-file-svg';
import AddTasksSvg from 'components/svg/add-tasks-svg';
import HistoryIndicator from '../history-indicator';

interface ChatGroupGreeterProps {
  chat: Chat;
}

const ChatGroupGreeter: FC<ChatGroupGreeterProps> = memo((props: ChatGroupGreeterProps) => {
  const { user } = useAppSelector((state) => state.userReducer);

  if (!user) {
    return <Navigate to={routes.welcome} />;
  }

  const { chat } = props;
  const userId = user.id;
  const creator = chat.users.find((user) => chat.creatorId === user.id);
  const [, , weekDay, monthDay, month] = transformDate(chat.creationDate);

  return (
    <StyledChatGroupGreeter>
      <img src={chatImage} width="160" height="160" />
      <ChatGroupGreeterDate>
        {chat.creatorId === userId
          ? `Вы создали эту чат группу ${weekDay},${monthDay} ${month}.`
          : `${creator?.username} создал эту чат группу ${weekDay},${monthDay} ${month}.`}
      </ChatGroupGreeterDate>
      <ChatGroupActionContainer>
        <ChatGroupAction>
          <Button name="Добавить пользователей" outlined>
            <AddUserSvg />
          </Button>
        </ChatGroupAction>
        <ChatGroupAction>
          <Button name="Поделиться файлом" outlined>
            <ShareFileSvg />
          </Button>
        </ChatGroupAction>
        <ChatGroupAction>
          <Button name="Назначить задачи" outlined>
            <AddTasksSvg />
          </Button>
        </ChatGroupAction>
      </ChatGroupActionContainer>
      <div>
        <HistoryIndicator chat={chat} user={user} />
      </div>
    </StyledChatGroupGreeter>
  );
});

ChatGroupGreeter.displayName = 'ChatGroupGreeter';

export default ChatGroupGreeter;
