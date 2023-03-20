import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { routes } from 'core/constants/routes';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthService } from 'shared/services/auth.service';
import { Spinner } from 'components/ui';

async function refreshTokens() {
  return AuthService.Instance.refreshTokens();
}

const AuthRequire: FC<PropsWithChildren> = ({ children }) => {

  const [isRefreshTried, setRefreshTried] = useState(false);

  const navigate = useNavigate();

  // if (isRefreshTried && !AuthService.Instance.isLoggedIn()) {
  //   return <Navigate to={routes.auth} />;
  // }

  useEffect(() => {
    if (!AuthService.Instance.isLoggedIn()) {
      refreshTokens()
        .then(() => {
          setRefreshTried(true);
        })
        .catch((error) => {
          navigate(routes.auth);
        });
    } else {
      setRefreshTried(true);
    }
  }, []);

  return <>{isRefreshTried ? <>{children}</> : <Spinner />} </>;
};
AuthRequire.displayName = 'AuthRequire';
export default AuthRequire;
