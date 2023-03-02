import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from 'core/constants/routes';
import { Chat } from 'core/entities/chat.entity';
import { ActionContainer, ChatActionsMenuInput, StyledChatActionsMenu } from './styled';
import AddUserSvg from 'components/svg/add-user-svg';
import SupportSvg from 'components/svg/support-svg';
import ManagerSvg from 'components/svg/manager-svg';
import SearchInputResultsList from 'components/search-input/search-input-result-list';
import Modal from 'components/ui/modal';
import CreateChatForm from 'components/forms/create-chat-form';

const ChatActionsMenu: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isCreateChatModalHidden, setCreateChatModalHidden] = useState(true);
  const navigate = useNavigate();

  const chatClickHandler = (chatId: string) => {
    navigate(routes.chat + chatId);
  };

  const userClickHandler = (userId: string, dmId?: string) => {
    if (dmId) {
      navigate(routes.dm + dmId);
    }
  };

  const modalCancelHandler = () => {
    setCreateChatModalHidden(true);
  };

  const goToChat = (chat?: Chat) => {
    if (chat) {
      navigate(routes.chat + chat.id);
    }
  };

  return (
    <StyledChatActionsMenu>
      <ChatActionsMenuInput
        value={inputValue}
        onChange={(event: any) => setInputValue(event.target.value)}
        placeholder="Пользователь или чат группа"
      />
      {inputValue ? (
        <SearchInputResultsList
          chatClickHandler={chatClickHandler}
          userClickHandler={userClickHandler}
          filterValue={inputValue}
        />
      ) : (
        <>
          <ActionContainer onClick={() => setCreateChatModalHidden(false)}>
            <AddUserSvg />
            <span>Создать чат-группу</span>
          </ActionContainer>
          <ActionContainer>
            <ManagerSvg />
            <span>Обзор групп</span>
          </ActionContainer>
          <ActionContainer>
            <SupportSvg />
            <span>Запросы на переписку</span>
          </ActionContainer>
        </>
      )}
      <Modal isHidden={isCreateChatModalHidden} setHidden={setCreateChatModalHidden}>
        <CreateChatForm onCancelClick={modalCancelHandler} onCreateClick={goToChat} />
      </Modal>
    </StyledChatActionsMenu>
  );
};

ChatActionsMenu.displayName = 'ChatActionsMenu';

export default ChatActionsMenu;
