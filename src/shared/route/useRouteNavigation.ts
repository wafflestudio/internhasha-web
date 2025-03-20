import { useNavigate } from 'react-router';

import { PATH } from '@/entities/route';
import type {
  CompanyRouteBody,
  MyPageRouteBody,
  PostRouteBody,
  PreviousSignUpFormRouteBody,
  ProfileRouteBody,
  VerifyMailRouteBody,
} from '@/shared/route/scheme';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const {
    INDEX,
    SIGN_IN,
    VERIFY_EMAIL,
    RESET_PASSWORD,
    SIGN_UP,
    SIGN_UP_COMPLETE,
    CREATE_COMPANY,
    MY_PAGE,
    CREATE_PROFILE,
  } = PATH;
  const { POST_DETAIL, CREATE_COFFEE_CHAT, COFFEE_CHAT_DETAIL, CREATE_POST } =
    PATH.MAKE;

  return {
    toMain: () => {
      void navigate(INDEX);
    },
    toPost: ({ postId }: { postId: string }) => {
      void navigate(POST_DETAIL(postId));
    },
    toSignInSelect: () => {
      void navigate(SIGN_IN);
    },
    toFindAccount: () => {
      void navigate(RESET_PASSWORD);
    },
    toVerifyEmail: ({ body }: { body: VerifyMailRouteBody }) => {
      void navigate(VERIFY_EMAIL, { state: { body } });
    },
    toSignUp: ({ body }: { body?: PreviousSignUpFormRouteBody }) => {
      void navigate(SIGN_UP, { state: { body } });
    },
    toSignUpComplete: () => {
      void navigate(SIGN_UP_COMPLETE);
    },
    toCreateCoffeeChat: ({ postId }: { postId: string }) => {
      void navigate(CREATE_COFFEE_CHAT(postId));
    },
    toCoffeeChatDetail: ({ coffeeChatId }: { coffeeChatId: string }) => {
      void navigate(COFFEE_CHAT_DETAIL(coffeeChatId));
    },
    toCreateCompany: ({ body }: { body?: CompanyRouteBody }) => {
      void navigate(CREATE_COMPANY, { state: { body } });
    },
    toCreatePost: ({
      companyId,
      body,
    }: {
      companyId: string;
      body?: PostRouteBody;
    }) => {
      void navigate(CREATE_POST(companyId), { state: { body } });
    },
    toMyPage: ({ body }: { body?: MyPageRouteBody }) => {
      void navigate(MY_PAGE, { state: { body } });
    },
    toCreateProfile: ({ body }: { body?: ProfileRouteBody }) => {
      void navigate(CREATE_PROFILE, { state: { body } });
    },
    refreshPage: () => {
      void navigate(0);
    },
  };
};
