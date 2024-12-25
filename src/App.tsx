import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PATH } from './entities/routes';
import { SurveyDetailPage } from './pages/SurveyDetailPage';
import { SurveyListPage } from './pages/SurveyListPage';

const publicRoutes = [
  {
    path: PATH.SURVEY_LIST,
    element: <SurveyListPage />,
  },
  {
    path: PATH.SURVEY_DETAIL,
    element: <SurveyDetailPage />,
  },
];

const routers = createBrowserRouter([...publicRoutes]);

export const App = () => {
  return <RouterProvider router={routers} />;
};
