import { useNavigate } from 'react-router';

import { PATH } from '@/entities/route';

type VerifyMailBody =
  | {
      authProvider: 'GOOGLE';
      token: string;
    }
  | {
      authProvider: 'LOCAL';
      localId: string;
      password: string;
      username: string;
    };

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const {
    INDEX,
    ECHO,
    SIGN_IN_SELECT,
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
    toSignUpSelect: () => {
      void navigate(SIGN_UP_SELECT);
    },
    toVerifyEmail: (body: VerifyMailBody) => {
      void navigate(VERIFY_EMAIL, { state: { body } });
    },
    toSignUpLocal: () => {
      void navigate(SIGN_UP_LOCAL);
    },
  };
};
