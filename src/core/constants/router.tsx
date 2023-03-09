import { createBrowserRouter, Navigate } from 'react-router-dom';

import { routes } from './routes';
import App from 'App';
import { ChatPage } from 'pages/chat-page';
import { WelcomePage } from 'pages/welcome-page';
import { DmPage } from 'pages/dm-page';
import AuthPage from 'pages/auth-page';
import AuthRequire from 'components/utils/auth-require';
import MeetRoomRequire from 'components/utils/meet-room-require';
import MeetPage from 'pages/meet-page';
import UserLoader from 'components/utils/user-loader';

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: (
      <AuthRequire>
        <UserLoader>
          <App />
        </UserLoader>
      </AuthRequire>
    ),
    children: [
      {
        element: <WelcomePage />,
        index: true,
      },
      {
        path: routes.chat + ':id',
        element: <ChatPage />,
      },
      {
        path: routes.dm + ':id',
        element: <DmPage />,
      },
    ],
  },

  {
    path: routes.auth,
    element: <AuthPage />,
  },
  {
    path: routes.meet + ':id',
    element: (
      <AuthRequire>
        <UserLoader>
          <MeetRoomRequire>
            <MeetPage />
          </MeetRoomRequire>
        </UserLoader>
      </AuthRequire>
    ),
  },
  {
    path: routes.welcome,
    element: <Navigate to={routes.home} />,
  },
]);
