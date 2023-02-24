import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch } from './shared/hooks/app-dispatch.hook';
import { userActions } from './shared/store/reducers/user.slice';
import { AppBody } from './styled';
import Layout from './components/layout';
import { useAppTheme } from 'shared/hooks/use-app-theme.hook';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { useChats } from 'shared/hooks/use-chats.hook';

function App() {
  const dispatch = useAppDispatch();
  const [theme] = useAppTheme();

  const { user, isUserError, isUserLoading } = useAppSelector((state) => state.userReducer);
  const { fetchLoggedUser } = userActions;

  useEffect(() => {
    dispatch(fetchLoggedUser());
  }, []);

  useChats();

  return (
    <>
      {isUserLoading ? (
        <div>{'Loading...'}</div>
      ) : isUserError ? (
        <div>Cannot retrieve user...</div>
      ) : (
        <ThemeProvider theme={theme}>
          <AppBody>
            <Layout>
              <Outlet />
            </Layout>
          </AppBody>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
