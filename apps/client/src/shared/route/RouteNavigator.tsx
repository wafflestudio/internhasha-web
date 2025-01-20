import { Navigate } from 'react-router';

export const RouteNavigator = ({ link }: { link: string }) => {
  return <Navigate to={link} replace />;
};
