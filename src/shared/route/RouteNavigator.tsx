import { Navigate } from 'react-router';

export const RouteNavigator = ({
  link,
  state,
}: {
  link: string;
  state?: Record<string, unknown>;
}) => {
  return <Navigate to={link} state={state} replace />;
};
