import { ChangeEvent, FC, useId, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { routes } from 'core/constants/routes';
import { Chat } from 'core/entities/chat.entity';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import ChatRoom from 'components/chat-room';
import OptionRadio from 'components/ui/option-radiobutton';
import ChatHeader from 'components/chat/chat-header';
import {
  ChatPageBody,
  ChatPageFlexContainer,
  StyledChatPage,
  ChatPageBodyOptions,
  ChatPageBodyContent,
} from './styled';

enum ChatPageOption {
  chat = 1,
  files,
  tasks,
}

function renderSwitch(option: ChatPageOption, chatId: string) {
  switch (option) {
    case ChatPageOption.chat:
      return <ChatRoom chatId={chatId}></ChatRoom>;
    case ChatPageOption.files:
      return <></>;
    case ChatPageOption.tasks:
      return <></>;
    default:
      return <></>;
  }
}

export const ChatPage: FC = () => {
  const radioName = useId();
  const { id } = useParams();
  const { chats } = useAppSelector((state) => state.userReducer);
  const [currentOption, setCurrentOption] = useState(ChatPageOption.chat);

  const onOptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (+value in ChatPageOption) {
      setCurrentOption(+value);
    }
  };

  if (!id) {
    return <Navigate to={routes.welcome} />;
  }
  const chat = chats.find((item) => item.id === id);

  if (!chat) {
    return <Navigate to={routes.welcome} />;
  }

  if (!chat.isGroup) {
    console.log('AGA');
    return <Navigate to={`${routes.dm}${id}`} />;
  }

  return (
    <StyledChatPage>
      <ChatHeader chat={chat} />
      <ChatPageBody>
        <ChatPageBodyOptions>
          <ChatPageFlexContainer>
            <OptionRadio
              name={radioName}
              value={ChatPageOption.chat}
              checked={currentOption === ChatPageOption.chat}
              onChange={onOptionChangeHandler}
            >
              Чат
            </OptionRadio>
            <OptionRadio
              name={radioName}
              value={ChatPageOption.files}
              //checked={currentOption === ChatPageOption.files}
              onChange={onOptionChangeHandler}
            >
              Файлы
            </OptionRadio>
            <OptionRadio
              name={radioName}
              value={ChatPageOption.tasks}
              //checked={currentOption === ChatPageOption.tasks}
              onChange={onOptionChangeHandler}
            >
              Задачи
            </OptionRadio>
          </ChatPageFlexContainer>
        </ChatPageBodyOptions>

        <ChatPageBodyContent>{renderSwitch(currentOption, chat.id)}</ChatPageBodyContent>
      </ChatPageBody>
    </StyledChatPage>
  );
};
