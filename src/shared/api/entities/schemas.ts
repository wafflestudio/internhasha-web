// DTO
type UserBriefDTO = {
  id: string;
  username: string;
  isAdmin: boolean;
};

// Params
export type EchoParams = {
  message: string;
};

export type PostIdParams = {
  postId: string;
};

// Request
export type PretotypeUserSubmitRequest = {
  email: string;
  isSubscribed: boolean;
};

export type LocalSignUpRequest = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  authProvider: string;
};

export type LocalSignInRequest = {
  localId: string;
  password: string;
};

export type GoogleSignUpRequest = {
  snuMail: string;
  googleAccessToken: string;
};

export type SendEmailCodeRequest = {
  snuMail: string;
};

export type EmailVerifyRequest = {
  snuMail: string;
  code: string;
};

export type GoogleSignInRequest = {
  googleAccessToken: string;
};

// Response
export type PretotypeUserSubmitResponse = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

export type UserWithTokenResponse = {
  user: UserBriefDTO;
  accessToken: string;
};

export type Post = {
  id: string;
  name: string;
  title: string;
  email: string;
  author: {
    id: string;
    username: string;
    profileImageLink?: string;
  };
  tags: string[];
  roles: {
    id: string;
    category: string;
    detail: string;
    headcount: number;
  }[];
  imageLink: string;
  investAmount: string;
  investCompany: string;
  isActive: boolean;
};

export type PostsResponse = {
  posts: Post[];
};

export type PostDetailResponse = {
  id: string;
  name: string;
  title: string;
  email: string;
  author: {
    id: string;
    username: string;
    profileImageLink?: string;
  };
  explanation: string;
  tags: [string, string, string];
  roles: [
    {
      id: string;
      category: string;
      detail: string;
      headcount: number;
    },
    {
      id: string;
      category: string;
      detail: string;
      headcount: number;
    },
  ];
  imageLink: string;
  investAmount: number;
  investCompany: string[];
  IRDeckLink: string;
  landingPageLink: string;
  externalDescriptionLink: string[];
  isActive: boolean;
};
