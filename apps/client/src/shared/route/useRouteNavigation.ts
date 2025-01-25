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
  companyName: string;
  email: string;
  slogan: string;
  series: Series;
  imageLink: string;
  investAmount: number;
  investCompany: string[];
  tags?: string[];
  IRDeckLink?: string;
  landingPageLink?: string;
  externalDescriptionLink?: { link: string; description: string }[];
};

type PostBody = {
  title: string;
  jobMajorCategory: string;
  jobMinorCategory: string;
  headcount: number;
  content: string;
  employmentEndDateTime: string;
};

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const {
    INDEX,
    SIGN_IN_SELECT,
    SIGN_UP_SELECT,
    VERIFY_EMAIL,
    SIGN_UP_LOCAL,
    SIGN_UP_COMPLETE,
    RESUME_LIST,
    CREATE_COMPANY,
    CREATE_POST,
    MY_PAGE,
  } = PATH;
  const { POST_DETAIL, CREATE_RESUME, RESUME_DETAIL } = PATH.MAKE;

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
    toVerifyEmail: ({ body }: { body: VerifyMailBody }) => {
      void navigate(VERIFY_EMAIL, { state: { body } });
    },
    toSignUpLocal: ({ body }: { body?: PreviousForm }) => {
      void navigate(SIGN_UP_LOCAL, { state: { body } });
    },
    toSignUpComplete: () => {
      void navigate(SIGN_UP_COMPLETE);
    },
    toCreateResume: ({ postId }: { postId: string }) => {
      void navigate(CREATE_RESUME(postId));
    },
    toResumeList: () => {
      void navigate(RESUME_LIST);
    },
    toResumeDetail: ({ resumeId }: { resumeId: string }) => {
      void navigate(RESUME_DETAIL(resumeId));
    },
    toCreateCompany: ({ companyBody }: { companyBody?: CompanyBody }) => {
      void navigate(CREATE_COMPANY, { state: { companyBody } });
    },
    toCreatePost: ({
      companyBody,
      postBody,
    }: {
      companyBody: CompanyBody;
      postBody?: PostBody;
    }) => {
      void navigate(CREATE_POST, { state: { companyBody, postBody } });
    },
    toMyPage: () => {
      void navigate(MY_PAGE);
    },
  };
};
