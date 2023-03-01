import Input from 'components/ui/input';
import ButtonWithIcon from 'components/ui/with-icon-button';
import { routes } from 'core/constants/routes';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinMeetFormButtons, JoinMeetFormText, JoinMeetFormTitle, StyledJoinMeetForm } from './styled';

interface JoinMeetFormProps {
  onJoinClick?: (value?: string) => void;
}

const JoinMeetForm: FC<JoinMeetFormProps> = (props: JoinMeetFormProps) => {
  const { onJoinClick } = props;

  const navigate = useNavigate();

  const [value, setValue] = useState('');

  const joinClickHandler = () => {
    navigate(routes.meet + value);
    if (onJoinClick) {
      onJoinClick(value);
    }
    setValue('');
  };

  return (
    <StyledJoinMeetForm>
      <JoinMeetFormTitle>У вас есть код встречи?</JoinMeetFormTitle>
      <JoinMeetFormText>Чтобы присоединиться к встрече, введите код, предоставленный организатором.</JoinMeetFormText>
      <Input placeholder="Введите код встречи" value={value} setValue={setValue}></Input>

      <JoinMeetFormButtons>
        <ButtonWithIcon name="Присоединиться" onClick={joinClickHandler} />
      </JoinMeetFormButtons>
    </StyledJoinMeetForm>
  );
};

JoinMeetForm.displayName = 'JoinMeetForm';

export default JoinMeetForm;
