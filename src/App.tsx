import { Outlet } from 'react-router-dom';

import { AppBody } from './styled';
import Layout from './components/layout';
import { useAppTheme } from 'shared/hooks/use-app-theme.hook';
import { ThemeProvider } from 'styled-components';
import { useChats } from 'shared/hooks/use-chats.hook';

function App() {
  const [theme] = useAppTheme();

  useChats();

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
