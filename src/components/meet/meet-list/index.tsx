import { FC, useState, memo, ChangeEvent } from 'react';

import {
  MeetListItemContainer,
  CheckboxContainer,
  ListBody,
  ListContainer,
  ListHeader,
  NameContainer,
  CameraImage,
  KeyboardImage,
} from './styled';
import ListCheckbox from '../../ui/list-checkbox';
import ButtonWithIcon from 'components/ui/with-icon-button';
import Modal from 'components/ui/modal';
import JoinMeetForm from 'components/forms/join-meet-form';
import { ConferenceRoomService } from 'shared/services/conference-room.service';
import NewMeet from '../new-meet';

interface MeetListProps {
  name: string;
  isOpen?: boolean;
  isOpenHandler?: (value: boolean) => void;
}

// TODO: change buttons

const MeetList: FC<MeetListProps> = memo((props: MeetListProps) => {
  const { name, isOpenHandler, isOpen: isOpenProp } = props;

  const [isOpen, setIsOpen] = useState(isOpenProp ?? false);
  const [isNewMeetModalHidden, setNewMeetModalHidden] = useState(true);
  const [isToMeetModalHidden, setToMeetModalHidden] = useState(true);
  const [joinToken, setJoinToken] = useState('');

  const onOpenHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(event.target.checked);
    if (isOpenHandler) {
      isOpenHandler(event.target.checked);
    }
  };

  const newMeetHandler = () => {
    ConferenceRoomService.Instance.createConferenceRoom()
      .then((room) => {
        setJoinToken(room.joinToken);
        setNewMeetModalHidden(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const toMeetHandler = () => {
    setToMeetModalHidden(false);
  };

  return (
    <>
      <ListContainer>
        <ListHeader>
          <CheckboxContainer>
            <ListCheckbox onChecked={onOpenHandler} initialValue={isOpen} />
          </CheckboxContainer>

          <NameContainer>{name}</NameContainer>
        </ListHeader>
        <ListBody>
          {isOpen && (
            <>
              <MeetListItemContainer onClick={newMeetHandler}>
                <ButtonWithIcon
                  name="Новая встреча"
                  gap="20px"
                  outlined={false}
                  textJustifyContentProperty="flex-start"
                >
                  <CameraImage />
                </ButtonWithIcon>
              </MeetListItemContainer>
              <MeetListItemContainer onClick={toMeetHandler}>
                <ButtonWithIcon
                  name="Перейти на встречу"
                  gap="20px"
                  outlined={false}
                  textJustifyContentProperty="flex-start"
                >
                  <KeyboardImage />
                </ButtonWithIcon>
              </MeetListItemContainer>
            </>
          )}
        </ListBody>
      </ListContainer>
      <Modal isHidden={isNewMeetModalHidden} setHidden={setNewMeetModalHidden}>
        <NewMeet joinToken={joinToken} />
      </Modal>
      <Modal isHidden={isToMeetModalHidden} setHidden={setToMeetModalHidden}>
        <JoinMeetForm />
      </Modal>
    </>
  );
});

MeetList.displayName = 'MeetList';

export default MeetList;
