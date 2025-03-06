import { useNavigate } from 'react-router';

import type { Series } from '@/entities/post';
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

type PreviousForm = {
  authProvider: 'LOCAL';
  localId: string;
  password: string;
  username: string;
};

type CompanyBody = {
  id: string;
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount: number;
  investCompany: string;
  series: Series;
  irDeckLink?: string;
  landingPageLink?: string;
  imageLink?: string;
  links?: { link: string; description: string }[];
  tags?: string[];
};

type PostBody = {
  id: string;
  title: string;
  employmentEndDateTime?: string;
  jobMajorCategory: string;
  jobMinorCategory: string;
  detail: string;
  headcount: number;
};

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const {
    INDEX,
    SIGN_IN_SELECT,
    SIGN_UP_SELECT,
    VERIFY_EMAIL,
    FIND_ACCOUNT,
    SIGN_UP_LOCAL,
    SIGN_UP_COMPLETE,
    COFFEE_CHAT_LIST,
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
      void navigate(SIGN_IN_SELECT);
    },
    toSignUpSelect: () => {
      void navigate(SIGN_UP_SELECT);
    },
    toFindAccount: () => {
      void navigate(FIND_ACCOUNT);
    },
    toVerifyEmail: ({ body }: { body: VerifyMailBody }) => {
      void navigate(VERIFY_EMAIL, { state: { body } });
    },
    toSignUpLocal: ({ body }: { body?: PreviousForm }) => {
      void navigate(SIGN_UP_LOCAL, { state: { body } });
    },
    toSignUpComplete: () => {
      void navigate(SIGN_UP_COMPLETE);
    },
    toCreateCoffeeChat: ({ postId }: { postId: string }) => {
      void navigate(CREATE_COFFEE_CHAT(postId));
    },
    toCoffeeChatList: () => {
      void navigate(COFFEE_CHAT_LIST);
    },
    toCoffeeChatDetail: ({ coffeeChatId }: { coffeeChatId: string }) => {
      void navigate(COFFEE_CHAT_DETAIL(coffeeChatId));
    },
    toCreateCompany: ({ companyBody }: { companyBody?: CompanyBody }) => {
      void navigate(CREATE_COMPANY, { state: { companyBody } });
    },
    toCreatePost: ({
      companyId,
      postBody,
    }: {
      companyId: string;
      postBody?: PostBody;
    }) => {
      void navigate(CREATE_POST(companyId), { state: { postBody } });
    },
    toMyPage: () => {
      void navigate(MY_PAGE);
    },
    toCreateProfile: () => {
      void navigate(CREATE_PROFILE);
    },
    refreshPage: () => {
      void navigate(0);
    },
  };
};
