import { FC, PropsWithChildren, useEffect } from 'react';

import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { userActions } from 'shared/store/reducers/user.slice';
import { SpinnerContainer } from './styled';
import Spinner from 'components/ui/spinner';

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
      {isUserError && <div>Cannot retrieve user</div>}
    </>
  );
};
UserLoader.displayName = 'UserLoader';

export default UserLoader;
