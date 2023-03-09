import { FC, useEffect, useMemo, useState } from 'react';

import { User } from 'core/entities/user.entity';
import { Chat } from 'core/entities/chat.entity';
import { ServerEvents } from 'core/constants/api';
import { UserService } from 'shared/services/user.service';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { chatSocketEmitter } from 'shared/emitters/socket-emitter';
import { backendUserToEntityFactory } from 'shared/utils/factories';
import {
  CreateChatFormInfo,
  CreateChatFormInputContainer,
  CreateChatFormInputs,
  CreateChatFormUsers,
  UserResultContainer,
  UserResults,
} from './styled';
import { FormBody, FormButtons, FormTitle } from '../styled';
import SmileSvg from 'components/svg/smile-svg';
import UserSearchResult from 'components/search-input/user-search-result';
import { Input, Button, Chip } from 'components/ui';

interface CreateChatFormProps {
  onCreateClick?: (chat?: Chat) => void;
  onCancelClick?: () => void;
}

async function fetchUsers() {
  return UserService.Instance.getKnownUsers();
}

//TODO: Add error handling

const CreateChatForm: FC<CreateChatFormProps> = (props: CreateChatFormProps) => {
  const { onCancelClick } = props;

  const { user: loggedUser } = useAppSelector((state) => state.userReducer);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [newMember, setNewMember] = useState('');
  const [members, setMembers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  if (!loggedUser) {
    return <div>User is not logged in</div>;
  }

  const notPickedUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          !members.find((member) => member.id === user.id && user.id === loggedUser.id) &&
          (user.login.includes(newMember) || user.username.includes(newMember)),
      ),
    [members, users, newMember],
  );

  const deleteMember = (member: User) => {
    const memberToDelete = members.indexOf(member);
    if (memberToDelete !== -1) {
      members.splice(memberToDelete, 1);
      setMembers([...members]);
    }
  };

  const addMember = (user: User) => {
    setMembers([...members, user]);
    setNewMember('');
  };

  const createClickHandler = () => {
    const chat = {
      name: name,
      creatorId: loggedUser.id,
      users: members.map((m) => m.id),
      isGroup: true,
    };

    chatSocketEmitter.emit(ServerEvents.CREATE_CHAT, chat);
    cancelClickHandler();
  };

  const cancelClickHandler = () => {
    setName('');
    setDescription('');
    setNewMember('');
    setMembers([]);
    if (onCancelClick) {
      onCancelClick();
    }
  };

  useEffect(() => {
    fetchUsers().then((backendUsers) => {
      const users = backendUsers.map((backendUser) => backendUserToEntityFactory(backendUser));
      setUsers(users);
    });
  }, []);

  return (
    <FormBody>
      <FormTitle>Создать чат-группу</FormTitle>
      <CreateChatFormInfo>
        <div>
          <SmileSvg />
        </div>
        <CreateChatFormInputs>
          <CreateChatFormInputContainer>
            <Input
              placeholder="Название чат-группы"
              value={name}
              setValue={setName}
              isLengthIndicator={true}
              maxLength={64}
            />
          </CreateChatFormInputContainer>
          <CreateChatFormInputContainer>
            <Input
              placeholder="Описание (необязательно)"
              value={description}
              setValue={setDescription}
              isLengthIndicator={true}
              maxLength={150}
            />
          </CreateChatFormInputContainer>
        </CreateChatFormInputs>
      </CreateChatFormInfo>
      <CreateChatFormUsers>
        <Input
          placeholder={!members.length ? 'Введите имя или адрес электронной почты человека или группы' : ''}
          value={newMember}
          setValue={setNewMember}
          isLengthIndicator={true}
        >
          {members.map((member) => (
            <Chip
              onButtonClick={() => deleteMember(member)}
              key={member.id}
              imageSrc={member.avatarUrl}
              name={member.username}
            />
          ))}
        </Input>
        <UserResults>
          {notPickedUsers.map((user) => (
            <UserResultContainer key={user.id} onClick={() => addMember(user)}>
              <UserSearchResult user={user} />
            </UserResultContainer>
          ))}
        </UserResults>
      </CreateChatFormUsers>
      <FormButtons>
        <Button name="Отмена" onClick={cancelClickHandler} />
        <Button name="Создать" onClick={createClickHandler} />
      </FormButtons>
    </FormBody>
  );
};

CreateChatForm.displayName = 'CreateChatForm';

export default CreateChatForm;
