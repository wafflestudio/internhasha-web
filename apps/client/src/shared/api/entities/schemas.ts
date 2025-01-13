// DTO
type UserBriefDTO = {
  id: string;
  username: string;
  isAdmin: boolean;
};

type UserDTO = {
  id: string;
  snuMail: string;
  username: string;
  phoneNumber?: string;
  isAdmin: boolean;
  localId?: string;
  googleId?: string;
}

type AuthorBriefDTO = {
  id: string;
  name: string;
  profileImageLink?: string;
};

type RoleDTO = {
  id: string;
  category:
    | 'PLANNER'
    | 'FRONT'
    | 'APP'
    | 'BACKEND'
    | 'DESIGN'
    | 'DATA'
    | 'MARKETER';
  detail: string;
  headcount: string;
};

type PostDTO = {
  id: string;
  companyName: string;
  email: string;
  author: AuthorBriefDTO;
  explanation: string;
  tags: string[];
  roles: RoleDTO[];
  imageLink?: string;
  investAmount?: number;
  investCompany: string[];
  IRDeckLink?: string;
  landingPageLink?: string;
  externalDescriptionLink?: string[];
  isActive: boolean;
  employmentEndDate: string;
};

export type PostBriefDTO = {
  id: string;
  companyName: string;
  email: string;
  author: AuthorBriefDTO;
  explanation: string;
  tags: string[];
  roles: RoleDTO[];
  imageLink?: string;
  investAmount?: number;
  investCompany: string[];
  isActive: boolean;
  employmentEndDate: string;
};

type ResumeDTO = {
  id: string;
  postId: string;
  author: UserDTO;
  content: string;
  phoneNumber: string;
  createdAt: string;
}

// Params
export type EchoParams = {
  message: string;
};

export type PostPathParams = {
  postPath: string;
};

export type PostIdParams = {
  postId: string;
};

export type ResumeIdParams = {
  resumeId: string;
};

// Request
export type PretotypeUserSubmitRequest = {
  email: string;
  isSubscribed: boolean;
};

export type LocalSignUpRequest = {
  username: string;
  localId: string;
  password: string;
  snuMail: string;
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

export type CheckLocalIdDuplicateRequest = {
  localId: string;
};

export type CreateAndUpdatePostRequest = PostDTO;

// Response
export type PretotypeUserSubmitResponse = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

export type UserResponse = {
  id: string;
  snuMail: string;
  username: string;
  phoneNumber?: string;
  isAdmin: boolean;
};

export type UserWithTokenResponse = {
  user: UserBriefDTO;
  accessToken: string;
};

export type PostsResponse = {
  posts: PostBriefDTO[];
  paginator: {
    lastPage: number;
  };
};

export type PostDetailResponse = PostDTO;

export type TokenResponse = {
  accessToken: string;
};

export type GoogleEmailResponse = {
  googleEmail: string;
};

export type ResumeResponse = ResumeDTO;

