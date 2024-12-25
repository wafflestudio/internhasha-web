import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PATH } from './entities/routes';
import { AdminPage } from './pages/AdminPage';
import { LandingPage } from './pages/LandingPage';
import { SurveyDetailPage } from './pages/SurveyDetailPage';
import { SurveyListPage } from './pages/SurveyListPage';

const publicRoutes = [
  {
    path: PATH.INDEX,
    element: <LandingPage />,
  },
  {
    path: PATH.SURVEY_LIST,
    element: <SurveyListPage />,
  },
  {
    path: PATH.SURVEY_DETAIL,
    element: <SurveyDetailPage />,
  },
  {
    path: PATH.ADMIN,
    element: <AdminPage />,
  },
];

const routers = createBrowserRouter([...publicRoutes]);

export const App = () => {
  return <RouterProvider router={routers} />;
};
