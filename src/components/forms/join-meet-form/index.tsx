import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from 'core/constants/routes';
import { Input, Button } from 'components/ui';
import { FormBody, FormButtons, FormText, FormTitle } from '../styled';

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
    <FormBody>
      <FormTitle>У вас есть код встречи?</FormTitle>
      <FormText>Чтобы присоединиться к встрече, введите код, предоставленный организатором.</FormText>
      <Input placeholder="Введите код встречи" value={value} setValue={setValue}></Input>

      <FormButtons>
        <Button name="Присоединиться" onClick={joinClickHandler} />
      </FormButtons>
    </FormBody>
  );
};

JoinMeetForm.displayName = 'JoinMeetForm';

export default JoinMeetForm;
