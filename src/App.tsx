import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch } from './shared/hooks/app-dispatch.hook';
import { userActions } from './shared/store/reducers/user.slice';
import { AppBody } from './styled';
import Layout from './components/layout';
import { useAppTheme } from 'shared/hooks/use-app-theme.hook';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { SERVER_SOCKET_URL } from 'core/constants/api';
import { useChats } from 'shared/hooks/use-chats.hook';
import { socketActions } from 'shared/store/reducers/socket.slice';

function App() {
  const dispatch = useAppDispatch();
  const [theme] = useAppTheme();

  const { socket } = useAppSelector((state) => state.socketReducer);
  const { setSocket } = socketActions;
  const { user, isUserError, isUserLoading } = useAppSelector((state) => state.userReducer);
  const { fetchLoggedUser } = userActions;

  useEffect(() => {
    dispatch(fetchLoggedUser());
    if (!socket) {
      dispatch(setSocket(SERVER_SOCKET_URL));
    }
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
