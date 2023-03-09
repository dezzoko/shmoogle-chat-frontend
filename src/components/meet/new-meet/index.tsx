import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from 'core/constants/routes';
import { NewMeetButtons, NewMeetText, NewMeetTitle, StyledNewMeet } from './styled';
import { Button } from 'components/ui';

interface NewMeetProps {
  joinToken: string;
}

const NewMeet: FC<NewMeetProps> = (props: NewMeetProps) => {
  const { joinToken } = props;
  const [isCopied, setCopied] = useState(false);

  const navigate = useNavigate();

  const joinClickHandler = () => {
    navigate(routes.meet + joinToken);
  };

  const copyClickHandler = () => {
    navigator.clipboard.writeText(joinToken);
    setCopied(true);
  };

  return (
    <StyledNewMeet>
      <NewMeetTitle>Идентификатор встречи</NewMeetTitle>
      <NewMeetText>Отправьте код другим людям, чтобы они присоединились</NewMeetText>
      <label>{joinToken}</label>
      <NewMeetButtons>
        {isCopied ? (
          <Button name={'✔'} disabled={true} />
        ) : (
          <Button name="Скопировать код" onClick={copyClickHandler} />
        )}
        <Button name="Присоединиться" onClick={joinClickHandler} />
      </NewMeetButtons>
    </StyledNewMeet>
  );
};

NewMeet.displayName = 'NewMeet';

export default NewMeet;
