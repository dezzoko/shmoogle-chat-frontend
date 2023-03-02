import { routes } from 'core/constants/routes';
import React, { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from 'shared/services/auth.service';

const AuthRequire: FC<PropsWithChildren> = ({ children }) => {
  if (!AuthService.Instance.isLoggedIn()) {
    return <Navigate to={routes.auth} />;
  }

  return <>{children}</>;
};
AuthRequire.displayName = 'AuthRequire';
export default AuthRequire;
