import { useNavigate } from 'react-router';

import { PATH } from '@/entities/route';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const { INDEX, ECHO, LOGIN, CREATE_POST } = PATH;

  return {
    toMain: () => {
      void navigate(INDEX);
    },
    toEcho: () => {
      void navigate(ECHO);
    },
    toLogin: () => {
      void navigate(LOGIN);
    },
    toCreatePost: () => {
      void navigate(CREATE_POST);
    },
  };
};
