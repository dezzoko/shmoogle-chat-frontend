import { FC, useState, memo, ChangeEvent } from 'react';

import { ConferenceRoomService } from 'shared/services/conference-room.service';
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
import JoinMeetForm from 'components/forms/join-meet-form';
import NewMeet from '../new-meet';
import { Button, Modal, ListCheckbox } from 'components/ui';

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
                <Button
                  name="Новая встреча"
                  gap="20px"
                  outlined={false}
                  textJustifyContentProperty="flex-start"
                  isHoverHighlighted={false}
                >
                  <CameraImage />
                </Button>
              </MeetListItemContainer>
              <MeetListItemContainer onClick={toMeetHandler}>
                <Button
                  name="Перейти на встречу"
                  gap="20px"
                  outlined={false}
                  textJustifyContentProperty="flex-start"
                  isHoverHighlighted={false}
                >
                  <KeyboardImage />
                </Button>
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
