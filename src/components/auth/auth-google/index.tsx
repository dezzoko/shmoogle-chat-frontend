import { FC } from 'react';
import GoogleSvg from 'components/svg/google-svg';
import Tooltip from 'components/tooltip';
import RoundButton from 'components/ui/round-button';
import { SERVER_URL } from 'core/constants/api';

const AuthGoogleButton: FC = () => {
  const clickHandler = () => {
    window.open(`${SERVER_URL}auth/google`, '_self');
  };

  return (
    <Tooltip text="Войти через Google">
      <RoundButton size="24px" margin="8px" onClick={clickHandler}>
        <GoogleSvg />
      </RoundButton>
    </Tooltip>
  );
};

AuthGoogleButton.displayName = 'AuthGoogleButton';

export default AuthGoogleButton;
