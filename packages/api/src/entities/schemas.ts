// DTO
type UserBriefDTO = {
  id: string;
  username: string;
  isAdmin: boolean;
};

type AuthorBriefDTO = {
  id: string;
  name: string;
  profileImageLink?: string;
};

type RoleDTO = {
  id: string;
  category:
    | "PLANNER"
    | "FRONT"
    | "APP"
    | "BACKEND"
    | "DESIGN"
    | "DATA"
    | "MARKETER";
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

type LocalApplicantInfo = {
  name: string;
  localLoginId: string;
  snuMail: string;
  password: string;
};

type PostAdminInfo = {
  secretPassword: string;
  name: string;
  localLoginId: string;
  password: string;
};

type SocialApplicantInfo = {
  provider: "google";
  snuMail: string;
  token: string;
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

// Request
export type PretotypeUserSubmitRequest = {
  email: string;
  isSubscribed: boolean;
};

export type SignUpRequest = {
  authType: "LOCAL_APPLICANT" | "SOCIAL_APPLICANT" | "POST_ADMIN";
  info: LocalApplicantInfo | PostAdminInfo | SocialApplicantInfo;
};

export type SignInRequest = {
  authType: "LOCAL" | "SOCIAL";
  info:
    | {
        localLoginId: string;
        password: string;
      }
    | {
        provider: "google";
        token: string;
      };
};

export type AccessTokenRequest = {
  accessToken: string;
};
export type SnuMailRequest = {
  snuMail: string;
};

export type EmailVerifyRequest = {
  snuMail: string;
  code: string;
};

export type IdRequest = {
  id: string;
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
