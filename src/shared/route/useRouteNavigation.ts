import { useNavigate } from 'react-router';

import { PATH } from '@/entities/route';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const {
    INDEX,
    ECHO,
    SIGN_IN_SELECT,
    SIGN_IN_LOCAL,
    SIGN_UP_SELECT,
    VERIFY_EMAIL,
    SIGN_UP_LOCAL,
  } = PATH;

  return {
    toMain: () => {
      void navigate(INDEX);
    },
    toEcho: () => {
      void navigate(ECHO);
    },
    toSignInSelect: () => {
      void navigate(SIGN_IN_SELECT);
    },
    toLocalSignIn: () => {
      void navigate(SIGN_IN_LOCAL);
    },
    toSignUpSelect: () => {
      void navigate(SIGN_UP_SELECT);
    },
    toVerifyEmail: ({ token }: { token: string }) => {
      void navigate(VERIFY_EMAIL, { state: { token } });
    },
    toSignUpLocal: () => {
      void navigate(SIGN_UP_LOCAL);
    },
  };
};
