import { FC, memo, useEffect, useState } from 'react';

import { User } from 'core/entities/user.entity';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { backendUserToEntityFactory } from 'shared/utils/factories';
import { UserService } from 'shared/services/user.service';
import { ResultContainer, StyledSearchInputResultsList } from './styled';
import UserSearchResult from '../user-search-result';
import ChatSearchResult from '../chat-search-result';

interface SearchInputResultsListProps {
  filterValue: string;
  chatClickHandler: (chatId: string) => void;
  userClickHandler: (userId: string, chatId?: string) => void;
}

async function fetchUsers() {
  return UserService.Instance.getKnownUsers();
}

// TODO: improve filter;
const SearchInputResultsList: FC<SearchInputResultsListProps> = memo((props: SearchInputResultsListProps) => {
  const { filterValue, chatClickHandler, userClickHandler } = props;
  const [users, setUsers] = useState<User[]>([]);

  const { user, chats } = useAppSelector((state) => state.userReducer);

  const filterUsers = users.filter(
    (u) => u.login.includes(filterValue) || (u.username.includes(filterValue) && u.id != user?.id),
  );
  const filterChats = chats.filter((ch) => ch.name.includes(filterValue) && ch.isGroup);

  const findDmByUserId = (userId: string) => {
    return chats.find((chat) => !chat.isGroup && chat.users.find((u) => u.id === userId))?.id;
  };

  useEffect(() => {
    fetchUsers().then((backendUsers) => {
      const users = backendUsers.map((u) => backendUserToEntityFactory(u));
      setUsers(users);
    });
  }, []);

  return (
    <StyledSearchInputResultsList>
      {filterUsers.length && filterValue ? (
        filterUsers.map((u) => (
          <ResultContainer key={u.id} onClick={() => userClickHandler(u.id, findDmByUserId(u.id))}>
            <UserSearchResult user={u} />
          </ResultContainer>
        ))
      ) : (
        <></>
      )}
      {filterChats.length && filterValue ? (
        filterChats.map((chat) => (
          <ResultContainer key={chat.id} onClick={() => chatClickHandler(chat.id)}>
            <ChatSearchResult chat={chat} />
          </ResultContainer>
        ))
      ) : (
        <></>
      )}

      {!filterUsers.length && !filterChats.length && filterValue ? <div>Совпадений нет</div> : <></>}
    </StyledSearchInputResultsList>
  );
});

SearchInputResultsList.displayName = 'SearchInputResultsList';

export default SearchInputResultsList;
