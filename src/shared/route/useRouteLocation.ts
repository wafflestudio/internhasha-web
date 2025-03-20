import { useLocation } from 'react-router';

export const useRouteLocation = () => {
  const location = useLocation();
  return location.state as Record<string, unknown> | null;
};
