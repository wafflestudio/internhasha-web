import { useNavigate } from 'react-router';

import { PATH } from '@/entities/route';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const { INDEX, ECHO, SIGN_UP, VERIFY_EMAIL } = PATH;

  return {
    toMain: () => {
      void navigate(INDEX);
    },
    toEcho: () => {
      void navigate(ECHO);
    },
    toSignUp: () => {
      void navigate(SIGN_UP);
    },
    toVerifyEmail: () => {
      void navigate(VERIFY_EMAIL, )
    }
  };
};
