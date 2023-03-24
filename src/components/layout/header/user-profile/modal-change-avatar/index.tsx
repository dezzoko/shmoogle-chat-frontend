import { Avatar, Button, Modal } from 'components/ui';
import { User } from 'core/entities/user.entity';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { UserService } from 'shared/services/user.service';
import { userActions } from 'shared/store/reducers/user.slice';
import { backendUserToEntityFactory } from 'shared/utils/factories';
import { AvatarChangeContainer } from './styled';

interface ModalChangeAvatar {
  isChangeAvatarModalHidden: boolean;
  setChangeAvatarModalHidden: () => void;
  user: User | null;
}
//TODO:Make input workable
const ModalChangeAvatar: FC<ModalChangeAvatar> = memo((props: ModalChangeAvatar) => {
  const { isChangeAvatarModalHidden, setChangeAvatarModalHidden, user } = props;
  const [image, setImage] = useState<any>();
  const [imageURL, setImageURL] = useState<any>();
  const fileReader = new FileReader();
  const avatarRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { setLoggedUser } = userActions;

  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  };
  const handleOnChange = (event: any) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);

      setImage(file);
      fileReader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      console.log(event.dataTransfer.files[0]);
      setImage(event.dataTransfer.files[0]);
      fileReader.readAsDataURL(event.dataTransfer.files[0]);
    }
  };

  const handleDragEmpty = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };
  useEffect(() => {
    setImage(null);
    setImageURL(null);
  }, [isChangeAvatarModalHidden]);
  const onClickHandler = (e: any) => {
    e.target.value = null;
  };
  const submitHandler = async () => {
    const formData = new FormData();
    formData.append('avatar', image);
    const updatedUser = await UserService.Instance.updateAvatar(formData);

    dispatch(setLoggedUser(backendUserToEntityFactory(updatedUser as User)));

    setChangeAvatarModalHidden();
  };
  const cancelHandler = () => {
    setChangeAvatarModalHidden();
  };

  return (
    <Modal hasPadding isHidden={isChangeAvatarModalHidden} setHidden={setChangeAvatarModalHidden}>
      <AvatarChangeContainer>
        <Avatar
          size="160px"
          ref={avatarRef}
          src={imageURL || user?.avatarUrl}
          label={user?.username[0] || 'U'}
          onDrop={handleDrop}
          onDragEnter={handleDragEmpty}
          onDragOver={handleDragEmpty}
        />
        <input
          onClick={onClickHandler}
          type="file"
          id="upload-avatar"
          style={{
            display: 'none',
          }}
          onChange={handleOnChange}
        />
        {!imageURL && !image ? (
          <>
            <label htmlFor="upload-avatar">
              <Button name="Добавить фото профиля" isHoverHighlighted />
            </label>
          </>
        ) : (
          <>
            <Button name="Сохранить" isHoverHighlighted onClick={submitHandler} />
            <Button name="Отмена" color={'red'} isHoverHighlighted onClick={cancelHandler} />
          </>
        )}
      </AvatarChangeContainer>
    </Modal>
  );
});

export default ModalChangeAvatar;
ModalChangeAvatar.displayName = 'ModalChangeAvatar';
