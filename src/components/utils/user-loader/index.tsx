import { FC, PropsWithChildren, useEffect } from 'react';

import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { userActions } from 'shared/store/reducers/user.slice';
import { SpinnerContainer } from './styled';
import Spinner from 'components/ui/spinner';
import { Navigate } from 'react-router-dom';
import { routes } from 'core/constants/routes';

const UserLoader: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const { user, isUserError, isUserLoading } = useAppSelector((state) => state.userReducer);
  const { fetchLoggedUser } = userActions;

  useEffect(() => {
    dispatch(fetchLoggedUser());
  }, []);

  return (
    <>
      {user ? <>{children}</> : <></>}
      {isUserLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      {isUserError && <Navigate to={routes.auth} />}
    </>
  );
};
UserLoader.displayName = 'UserLoader';

export default UserLoader;
