import { FC } from 'react';

import { ActionContainer } from './styled';
import AppsSquaredSvg from 'components/svg/apps-squared-svg';
import ManageUsersSvg from 'components/svg/manage-users-svg';
import MessageUnreaded from 'components/svg/message-unreaded-svg';
import PenSvg from 'components/svg/pen-svg';

const ChatOptionsMenu: FC = () => {
  return (
    <>
      <ActionContainer>
        <ManageUsersSvg />
        <span>Управление участниками</span>
      </ActionContainer>
      <ActionContainer>
        <PenSvg />
        <span>Информация о чат-группе</span>
      </ActionContainer>
      <ActionContainer>
        <AppsSquaredSvg />
        <span>Приложения и интеграции</span>
      </ActionContainer>
      <ActionContainer>
        <MessageUnreaded />
        <span>Отметить как непрочитанное</span>
      </ActionContainer>
    </>
  );
};

ChatOptionsMenu.displayName = 'ChatOptionsMenu';

export default ChatOptionsMenu;
