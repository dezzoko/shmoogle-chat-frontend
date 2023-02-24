import { FC, useEffect, useMemo, useState } from 'react';

import { User } from 'core/entities/user.entity';
import { Chat } from 'core/entities/chat.entity';
import { CreateChatDto } from 'core/interfaces/chat-service.interface';
import { ChatService } from 'shared/services/chat.service';
import { UserService } from 'shared/services/user.service';
import {
  CreateChatFormButtons,
  CreateChatFormInfo,
  CreateChatFormInputContainer,
  CreateChatFormInputs,
  CreateChatFormTitle,
  CreateChatFormUsers,
  StyledCreateChatForm,
  UserResultContainer,
  UserResults,
} from './styled';
import Input from 'components/ui/input';
import ButtonWithIcon from 'components/ui/with-icon-button';
import SmileSvg from 'components/svg/smile-svg';
import UserSearchResult from 'components/search-input/user-search-result';
import Chip from 'components/ui/chip';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { userActions } from 'shared/store/reducers/user.slice';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { ServerEvents } from 'core/constants/api';
import { chatSocketEmitter } from 'shared/emitters/chat-socket-emitter';

interface CreateChatFormProps {
  onCreateClick?: (chat?: Chat) => void;
  onCancelClick?: () => void;
}

async function fetchUsers() {
  return UserService.Instance.getAll();
}

// async function createChat(instance: CreateChatDto) {
//   return ChatService.Instance.create(instance);
// }

//TODO: Add error handling

const CreateChatForm: FC<CreateChatFormProps> = (props: CreateChatFormProps) => {
  const { onCreateClick, onCancelClick } = props;

  const dispatch = useAppDispatch();
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
    // if (onCreateClick) {
    //   onCreateClick(chat);
    // }

    // createChat({
    //   name: name,
    //   isGroup: true,
    //   creatorId: loggedUser.id,
    //   users: members,
    //   isHistorySaved: true,
    // })
    //   .then((chat) => {
    //     cancelClickHandler();
    //     dispatch(fetchUserChats());
    //     if (onCreateClick) {
    //       onCreateClick(chat);
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
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
    fetchUsers().then((users) => setUsers(users));
  }, [setUsers]);

  return (
    <StyledCreateChatForm>
      <CreateChatFormTitle>Создать чат-группу</CreateChatFormTitle>
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
      <CreateChatFormButtons>
        <ButtonWithIcon name="Отмена" onClick={cancelClickHandler} />
        <ButtonWithIcon name="Создать" onClick={createClickHandler} />
      </CreateChatFormButtons>
    </StyledCreateChatForm>
  );
};

CreateChatForm.displayName = 'CreateChatForm';

export default CreateChatForm;
