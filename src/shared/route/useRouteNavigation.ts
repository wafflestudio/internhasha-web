import { useNavigate } from 'react-router';

import type { Series } from '@/entities/post';
import { PATH } from '@/entities/route';

type VerifyMailBody = {
  password: string;
  username: string;
};

type PreviousForm = {
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

type MyPageBody = {
  tab: 'POST' | 'COFFEE_CHAT' | 'BOOKMARK' | 'PROFILE';
};

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
    toVerifyEmail: ({ body }: { body: VerifyMailBody }) => {
      void navigate(VERIFY_EMAIL, { state: { body } });
    },
    toSignUp: ({ body }: { body?: PreviousForm }) => {
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
    toMyPage: ({ myPageBody }: { myPageBody: MyPageBody }) => {
      void navigate(MY_PAGE, { state: { myPageBody } });
    },
    toCreateProfile: () => {
      void navigate(CREATE_PROFILE);
    },
    refreshPage: () => {
      void navigate(0);
    },
  };
};
