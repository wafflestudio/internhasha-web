import { useNavigate } from 'react-router';

import { HREF, PATH } from '@/entities/route';

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

type PreviousForm = {
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
    SIGN_UP_COMPLETE,
  } = PATH;

  const { POST, APPLY_COFFEE_CHAT } = HREF;

  return {
    toMain: () => {
      void navigate(INDEX);
    },
    toPost: ({ postId }: { postId: string }) => {
      void navigate(POST(postId));
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
    toSignUpLocal: (body?: PreviousForm) => {
      void navigate(SIGN_UP_LOCAL, { state: { body } });
    },
    toSignUpComplete: () => {
      void navigate(SIGN_UP_COMPLETE);
    },
    toApplyCoffeeChat: ({ postId }: { postId: string }) => {
      void navigate(APPLY_COFFEE_CHAT(postId));
    }
  };
};
