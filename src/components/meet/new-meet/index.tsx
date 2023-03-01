import ButtonWithIcon from 'components/ui/with-icon-button';
import { routes } from 'core/constants/routes';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewMeetButtons, NewMeetText, NewMeetTitle, StyledNewMeet } from './styled';

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
          <ButtonWithIcon name={'✔'} disabled={true} />
        ) : (
          <ButtonWithIcon name="Скопировать код" onClick={copyClickHandler} />
        )}
        <ButtonWithIcon name="Присоединиться" onClick={joinClickHandler} />
      </NewMeetButtons>
    </StyledNewMeet>
  );
};

NewMeet.displayName = 'NewMeet';

export default NewMeet;
