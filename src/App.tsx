import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { USER_TOKEN } from './core/constants/tokens';
import { useAppDispatch } from './shared/hooks/app-dispatch.hook';
import { userActions } from './shared/store/reducers/user.slice';
import { AppBody } from './styled';
import Layout from './components/layout';
import { useAppTheme } from 'shared/hooks/use-app-theme.hook';
import { ThemeProvider } from 'styled-components';

function App() {
  const dispatch = useAppDispatch();
  // localStorage.setItem(USER_TOKEN, '1');
  const [theme] = useAppTheme();
  useEffect(() => {
    dispatch(userActions.fetchLoggedUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppBody>
        <Layout>
          <Outlet />
        </Layout>
      </AppBody>
    </ThemeProvider>
  );
}

export default App;
