import { useNavigate } from 'react-router';

import type {
  CompanyRouteQuery,
  MyPageRouteQuery,
  PostFilterRouteQuery,
  PostRouteQuery,
  PreviousSignUpFormRouteQuery,
  ProfileRouteQuery,
  VerifyMailRouteQuery,
} from '@/entities/route';
import { PATH } from '@/shared/route/constants';
import { routeFormatPresentation } from '@/shared/route/routeFormatPresentation';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const {
    SIGN_IN,
    VERIFY_EMAIL,
    RESET_PASSWORD,
    SIGN_UP,
    SIGN_UP_COMPLETE,
    CREATE_COMPANY,
    PATCH_COMPANY,
    CREATE_PROFILE,
    PATCH_PROFILE,
    CHANGE_PASSWORD,
  } = PATH;
  const {
    INDEX,
    POST_DETAIL,
    CREATE_COFFEE_CHAT,
    COFFEE_CHAT_DETAIL,
    CREATE_POST,
    MY_PAGE,
  } = routeFormatPresentation.formatRoutes();

  return {
    toMain: ({ query }: { query?: PostFilterRouteQuery }) => {
      void navigate(INDEX({ query }));
    },
    toPost: ({ postId }: { postId: string }) => {
      void navigate(POST_DETAIL({ postId }));
    },
    toSignInSelect: () => {
      void navigate(SIGN_IN);
    },
    toFindAccount: () => {
      void navigate(RESET_PASSWORD);
    },
    toChangePassword: () => {
      void navigate(CHANGE_PASSWORD);
    },
    toVerifyEmail: ({ body }: { body: VerifyMailRouteQuery }) => {
      void navigate(VERIFY_EMAIL, { state: { ...body } });
    },
    toSignUp: ({ body }: { body?: PreviousSignUpFormRouteQuery }) => {
      void navigate(SIGN_UP, { state: { ...body } });
    },
    toSignUpComplete: () => {
      void navigate(SIGN_UP_COMPLETE);
    },
    toCreateCoffeeChat: ({ postId }: { postId: string }) => {
      void navigate(CREATE_COFFEE_CHAT({ postId }));
    },
    toCoffeeChatDetail: ({ coffeeChatId }: { coffeeChatId: string }) => {
      void navigate(COFFEE_CHAT_DETAIL({ coffeeChatId }));
    },
    toCreateCompany: ({ body }: { body?: CompanyRouteQuery }) => {
      void navigate(CREATE_COMPANY, { state: { ...body } });
    },
    toPatchCompany: () => {
      void navigate(PATCH_COMPANY);
    },
    toCreatePost: ({
      companyId,
      body,
    }: {
      companyId: string;
      body?: PostRouteQuery;
    }) => {
      if (body === undefined) {
        void navigate(CREATE_POST({ companyId }));
        return;
      }
      void navigate(CREATE_POST({ companyId }), { state: { ...body } });
    },
    toMyPage: ({ query }: { query?: MyPageRouteQuery }) => {
      void navigate(MY_PAGE({ query }));
    },
    toCreateProfile: ({ body }: { body?: ProfileRouteQuery }) => {
      if (body === undefined) {
        void navigate(CREATE_PROFILE);
        return;
      }
      void navigate(CREATE_PROFILE, { state: { ...body } });
    },
    toPatchProfile: () => {
      void navigate(PATCH_PROFILE);
    },
    refreshPage: () => {
      void navigate(0);
    },
  };
};
