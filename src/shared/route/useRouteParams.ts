import { useLocation, useParams, useSearchParams } from 'react-router';

export const useRoutePathParams = <
  T extends Record<string, string | undefined>,
>() => {
  const params = useParams<T>();
  return params;
};

export const useRouteQueryParams = () => {
  const [searchParams] = useSearchParams();
  if (searchParams.size === 0) {
    return null;
  }
  return Object.fromEntries(searchParams.entries());
};

export const useRouteLocation = () => {
  const location = useLocation();
  return location.state as Record<string, unknown> | null;
};
