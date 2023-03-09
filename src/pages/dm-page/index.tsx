import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { routes } from 'core/constants/routes';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import ChatRoom from 'components/chat/chat-room';
import { DmPageBody, StyledDmPage, DmPageBodyContent, DmPageHeader } from './styled';
import ChatHeader from 'components/chat/chat-header';

export const DmPage: FC = () => {
  const { id } = useParams();
  const { chats, user } = useAppSelector((state) => state.userReducer);

  if (!id || !user) {
    return <Navigate to={routes.welcome} />;
  }
  const chat = chats.find((item) => item.id === id);

  if (!chat) {
    return <Navigate to={routes.welcome} />;
  }

  if (chat.isGroup) {
    console.log('ZDES');
    return <Navigate to={`${routes.chat}${id}`} />;
  }

  return (
    <StyledDmPage>
      <DmPageHeader>
        <ChatHeader chat={chat} />
      </DmPageHeader>
      <DmPageBody>
        <DmPageBodyContent>
          <ChatRoom chatId={chat.id} />
        </DmPageBodyContent>
      </DmPageBody>
    </StyledDmPage>
  );
};
