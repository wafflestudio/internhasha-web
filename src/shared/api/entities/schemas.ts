// DTO
type UserBriefDTO = {
  id: string;
  username: string;
  isAdmin: boolean;
};

export type AuthorBriefDTO = {
  id: string;
  name: string;
  profileImageLink?: string;
}

export type RoleDTO = {
  id: string;
  category: string;
  detail: string;
  headcount: string;
}

export type PostDTO = {
  id: string;
  companyName: string,
  email: string,
  author: AuthorBriefDTO,
  explanation: string,
  tags: string[],
  roles: RoleDTO[],
  imageLink: string,
  investAmount: number,
  investCompany: string[],
  IRDeckLink: string,
  landingPageLink: string,
  externalDescriptionLink: string[],
  isActive: boolean,
  employmentEndDate: Date,
};

export type PostBriefDTO = {
  id: string;
  companyName: string,
  email: string,
  author: AuthorBriefDTO,
  explanation: string,
  tags: string[],
  roles: RoleDTO[],
  imageLink: string,
  investAmount: number,
  investCompany: string[],
  isActive: boolean,
  employmentEndDate: Date,
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

export type PostsResponse = PostBriefDTO[]

export type PostDetailResponse = PostDTO
