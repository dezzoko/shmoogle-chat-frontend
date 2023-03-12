import { Avatar, Button, Modal } from 'components/ui';
import TextArea from 'components/ui/textArea';
import { routes } from 'core/constants/routes';
import { User } from 'core/entities/user.entity';
import { FC, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { userActions } from 'shared/store/reducers/user.slice';
import OptionsContainer from '../options/options-container';
import { OptionsBody } from '../options/styled';
import ModalQuitMessage from './modal-quit-message';
import { StyledInfoContainer, StyledInput, StyledUserContainer, UserCredits } from './styled';

interface UserProfileProps {
  user: User | null;
  isProfileHidden: boolean;
}

const UserProfile: FC<UserProfileProps> = memo((props: UserProfileProps) => {
  const { user, isProfileHidden } = props;
  const [isEditable, setEditable] = useState(false);
  const [usernameLenghtValid, setUsernameLenghtValid] = useState(true);
  const [usernameTheSameValid, setUsernameTheSameValid] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setLoggedUser } = userActions;
  const [userName, setUserName] = useState(user?.username);
  const [isQuitModalHidden, setQuitModalHidden] = useState(true);
  const editHandler = () => {
    setUserName(user?.username);
    setEditable(!isEditable);
  };
  const editUserNameHandler = (e: any) => {
    setUserName(e.target.value);
  };

  const confirmChanges = () => {
    if (usernameLenghtValid && usernameTheSameValid) {
      UserService.Instance.update({
        username: userName,
      });

      dispatch(setLoggedUser({ ...user, username: userName! } as User));
      setEditable(!isEditable);
    } else {
      if (!usernameTheSameValid) {
        setEditable(!isEditable);
      } else {
        return;
      }
    }
  };
  const quitModalHandler = () => {
    setQuitModalHidden(!isQuitModalHidden);
  };
  const quitHandler = () => {
    AuthService.Instance.logout();
    navigate(routes.auth);
  };
  useLayoutEffect(() => {
    if (userName && userName?.length <= 3) {
      setUsernameLenghtValid(false);
    } else {
      if (userName && userName === user?.username) {
        setUsernameTheSameValid(false);
      } else {
        setUsernameLenghtValid(true);
        setUsernameTheSameValid(true);
      }
    }
  }, [userName]);
  useEffect(() => {
    setEditable(false);
  }, [isProfileHidden]);
  return (
    <>
      <ModalQuitMessage
        quitHandler={quitHandler}
        quitModalHandler={quitModalHandler}
        isQuitModalHidden={isQuitModalHidden}
        setQuitModalHidden={setQuitModalHidden}
      />
      <StyledUserContainer>
        <StyledInfoContainer>
          <Avatar size="60px" src={user?.avatarUrl} label={user?.username[0] || 'U'}></Avatar>
          <UserCredits>
            {isEditable ? (
              <>
                <TextArea fontSize="12px">
                  <label htmlFor="username">Имя Пользователя</label>
                </TextArea>
                <StyledInput
                  id="username"
                  value={userName}
                  onChange={editUserNameHandler}
                  isInvalidUserName={!usernameLenghtValid}
                />
                {!usernameLenghtValid && (
                  <TextArea color="red" fontSize="12px" fontWeight="bold">
                    Имя Должно быть длиннее 3-х символов
                  </TextArea>
                )}
              </>
            ) : (
              <>
                <TextArea>{user?.username}</TextArea>
                <TextArea fontWeight="200" fontSize="12px">
                  {user?.login}
                </TextArea>
              </>
            )}
          </UserCredits>
        </StyledInfoContainer>

        {isEditable ? (
          <>
            <Button name="Окей" onClick={confirmChanges} isHoverHighlighted></Button>
            <Button name="Отмена" onClick={editHandler} color="red" isHoverHighlighted></Button>
          </>
        ) : (
          <>
            <Button name="Изменить Профиль" isHoverHighlighted={true} onClick={editHandler}></Button>
            <Button name="Выйти" color="red" isHoverHighlighted={true} onClick={quitModalHandler}></Button>
          </>
        )}
      </StyledUserContainer>
    </>
  );
});

export default UserProfile;
UserProfile.displayName = 'User Profile';
