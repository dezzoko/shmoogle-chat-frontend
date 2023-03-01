import { createBrowserRouter, Navigate } from 'react-router-dom';

import { routes } from './routes';
import App from 'App';
import { ChatPage } from 'pages/chat-page';
import { WelcomePage } from 'pages/welcome-page';
import { DmPage } from 'pages/dm-page';
import AuthPage from 'pages/auth';
import AuthRequire from 'components/auth-require';
import MeetRoomRequire from 'components/meet/meet-room-require';
import MeetPage from 'pages/meet-page';

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: (
      <AuthRequire>
        <App />
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
        <MeetRoomRequire>
          <MeetPage />
        </MeetRoomRequire>
      </AuthRequire>
    ),
  },
  {
    path: routes.welcome,
    element: <Navigate to={routes.home} />,
  },
]);
