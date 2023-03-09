import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from 'core/constants/routes';
import { InviteDmFormInputContainer } from './styled';
import { FormBody, FormButtons, FormText, FormTitle } from '../styled';
import { Input, Button } from 'components/ui';
import { chatSocketEmitter } from 'shared/emitters/socket-emitter';
import { ServerEvents } from 'core/constants/api';
import { useAppSelector } from 'shared/hooks/app-selector.hook';

interface InviteDmFormProps {
  onSendClick?: (value?: string) => void;
}

const InviteDmForm: FC<InviteDmFormProps> = (props: InviteDmFormProps) => {
  const { onSendClick } = props;

  const [value, setValue] = useState('');

  const sendClickHandler = () => {
    if (onSendClick) {
      onSendClick(value);
    }
    setValue('');
  };

  return (
    <FormBody>
      <FormTitle>Введите Email пользователя</FormTitle>
      <FormText>Чтобы послать запрос на переписку пользователю</FormText>
      <InviteDmFormInputContainer>
        <Input placeholder="Введите email пользователя" value={value} setValue={setValue} />
      </InviteDmFormInputContainer>
      <FormButtons>
        <Button name="Отправить" onClick={sendClickHandler} />
      </FormButtons>
    </FormBody>
  );
};

InviteDmForm.displayName = 'InviteDmForm';

export default InviteDmForm;
