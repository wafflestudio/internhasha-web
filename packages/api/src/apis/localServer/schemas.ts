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
    | "OTHERS"
    | "DESIGN"
    | "DATA"
    | "MARKETING";
  detail: string;
  headcount: string;
};

type Link = {
  link: string;
  description: string;
};

type PostDTO = {
  id: string;
  author: AuthorBriefDTO;

  // 회사 정보
  companyName: string;
  email: string;
  slogan: string;
  investAmount?: number;
  investCompany: string[];
  series: "SEED" | "PRE_A" | "A" | "B" | "C" | "D";
  IRDeckLink?: string;
  landingPageLink?: string;
  imageLink?: string;
  externalDescriptionLink?: Link[];
  tags?: string[];

  // post 정보
  title: string;
  isAlways: boolean;
  employmentEndDate: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  category: RoleDTO["category"];
  detail: string;
  headcount: string;
};

export type PostBriefDTO = {
  id: string;
  author: AuthorBriefDTO;

  // 회사 정보
  companyName: string;
  slogan: string;
  investAmount?: number;
  investCompany: string[];
  series: "SEED" | "PRE_A" | "A" | "B" | "C" | "D";
  imageLink: string;

  // 포스트 정보
  title: string;
  isAlways: boolean;
  employmentEndDate: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  category: RoleDTO["category"];
  headcount: string;
};

type ResumeDTO = {
  id: string;
  postId: string;
  author: UserDTO;
  content: string;
  phoneNumber: string;
  createdAt: string;
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

export type ApplyCoffeeChatRequest = {
  phoneNumber: string;
  content: string;
};

export type FileUploadRequest = {
  fileName: string;
  fileType: string;
};

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

export type ResumeListResponse = { resumeList: ResumeDTO[] };

export type PresignedUrlResponse = {
  presignedUrl: string;
};
