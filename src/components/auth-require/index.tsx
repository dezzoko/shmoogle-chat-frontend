import { routes } from 'core/constants/routes';
import { USER_TOKEN } from 'core/constants/tokens';
import React, { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

const AuthRequire: FC<PropsWithChildren> = ({ children }) => {
  if (!localStorage.getItem(USER_TOKEN)) {
    return <Navigate to={routes.auth} />;
  }

  return <>{children}</>;
};
AuthRequire.displayName = 'AuthRequire';
export default AuthRequire;
