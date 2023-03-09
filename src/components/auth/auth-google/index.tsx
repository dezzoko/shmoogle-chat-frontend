import { FC } from 'react';

import { SERVER_URL } from 'core/constants/api';
import GoogleSvg from 'components/svg/google-svg';
import { RoundButton, Tooltip } from 'components/ui';

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
