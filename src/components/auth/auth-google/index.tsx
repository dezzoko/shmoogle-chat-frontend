import GoogleSvg from 'components/svg/google-svg';
import Tooltip from 'components/tooltip';
import RoundButton from 'components/ui/round-button';
import { FC } from 'react';
import { AuthService } from 'shared/services/auth.service';

const AuthGoogleButton: FC = () => {
  const clickHandler = () => {
    AuthService.Instance.loginGoogle().then((res) => {
      console.log('result is ', res);
    });
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
