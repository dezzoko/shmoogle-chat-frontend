import Input from 'components/ui/input';
import ButtonWithIcon from 'components/ui/with-icon-button';
import { routes } from 'core/constants/routes';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InviteDmFormButtons,
  InviteDmFormInputContainer,
  InviteDmFormText,
  InviteDmFormTitle,
  StyledInviteDmForm,
} from './styled';

interface InviteDmFormProps {
  onJoinClick?: (value?: string) => void;
}

const InviteDmForm: FC<InviteDmFormProps> = (props: InviteDmFormProps) => {
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
    <StyledInviteDmForm>
      <InviteDmFormTitle>Введите Email пользователя</InviteDmFormTitle>
      <InviteDmFormText>Чтобы послать запрос на переписку пользователю</InviteDmFormText>
      <InviteDmFormInputContainer>
        <Input placeholder="Введите email пользователя" value={value} setValue={setValue} />
      </InviteDmFormInputContainer>
      <InviteDmFormButtons>
        <ButtonWithIcon name="Отправить" onClick={joinClickHandler} />
      </InviteDmFormButtons>
    </StyledInviteDmForm>
  );
};

InviteDmForm.displayName = 'InviteDmForm';

export default InviteDmForm;
