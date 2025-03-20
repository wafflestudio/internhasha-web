import { useParams } from 'react-router';

export const useRouteParams = <
  T extends Record<string, string | undefined>,
>() => {
  const params = useParams<T>();
  return params;
};
