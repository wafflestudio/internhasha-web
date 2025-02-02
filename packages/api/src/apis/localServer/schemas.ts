// DTO
type UserRole = "NORMAL" | "CURATOR";

type UserDTO = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  userRole: UserRole;
  snuMail: string;
  phoneNumber?: string;
  resumes: ResumeDTO[];
  posts: PostDTO[];
  profileImageLink: string;
  isMerged: boolean;
};

type AuthorBriefDTO = {
  id: string;
  name: string;
  profileImageLink?: string;
};

type JobCategory =
  | "PLANNER"
  | "FRONT"
  | "APP"
  | "BACKEND"
  | "OTHERS"
  | "DESIGN"
  | "DATA"
  | "MARKETING";

type Link = {
  link: string;
  description: string;
};

type Series = "SEED" | "PRE_A" | "A" | "B" | "C" | "D";

type PostDTO = {
  id: string;
  author: AuthorBriefDTO;

  // 회사 정보
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount?: number;
  investCompany: string;
  series: Series;
  irDeckLink?: string;
  landingPageLink?: string;
  imageLink: string;
  externalDescriptionLink?: Link[];
  tags?: string[];

  // post 정보
  title: string;
  employmentEndDate: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  category: JobCategory;
  detail: string;
  headcount: number;
  isBookmarked: boolean;
};

export type PostBriefDTO = Omit<
  PostDTO,
  | "explanation"
  | "irDeckLink"
  | "landingPageLink"
  | "externalDescriptionLink"
  | "tags"
  | "createdAt"
  | "updatedAt"
  | "detail"
>;

type ResumeDTO = {
  id: string;
  positionTitle: string;
  companyName: string;
  author: {
    id: string;
    name: string;
    userRole: UserRole;
    snuMail: string;
    phoneNumber?: string;
    profileImageLink?: string;
  };
  postId: string;
  content: string;
  phoneNumber: string;
  createdAt: string;
};

type LocalApplicantInfo = {
  type: "LOCAL_NORMAL";
  name: string;
  localLoginId: string;
  snuMail: string;
  password: string;
};

type PostAdminInfo = {
  type: "LOCAL_CURATOR";
  secretPassword: string;
  name: string;
  localLoginId: string;
  password: string;
};

type SocialApplicantInfo = {
  type: "SOCIAL_NORMAL";
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

export type CompanyIdParams = {
  companyId: string;
};

export type BookmarkPageParams = {
  bookmarkPage?: string;
};

// Request
export type PretotypeUserSubmitRequest = {
  email: string;
  isSubscribed: boolean;
};

export type SignUpRequest = {
  authType: "LOCAL_NORMAL" | "SOCIAL_NORMAL" | "LOCAL_CURATOR";
  info: LocalApplicantInfo | PostAdminInfo | SocialApplicantInfo;
};

export type SignInRequest = {
  authType: "LOCAL" | "SOCIAL";
  info:
    | {
        type: "LOCAL";
        localLoginId: string;
        password: string;
      }
    | {
        type: "SOCIAL";
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

export type CreateAndUpdatePostRequest = Omit<
  PostDTO,
  "id" | "createdAt" | "updatedAt" | "isActive" | "isBookmarked"
>;

export type CreateResumeRequest = {
  phoneNumber: string;
  content: string;
};

export type FileUploadRequest = {
  fileName: string;
  fileType: string;
};

export type CreateCompanyRequest = {
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount?: number;
  investCompany: string;
  series: Series;
  irDeckLink?: string;
  landingPageLink?: string;
  imageLink: string;
  externalDescriptionLink?: Link[];
  tags?: { tag: string }[];
};

export type CreatePostRequest = {
  title: string;
  employmentEndDate?: string;
  category: JobCategory;
  detail: string;
  headcount: number;
  isActive: boolean;
};

// Response
export type PretotypeUserSubmitResponse = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

export type UserResponse = Omit<UserDTO, "isMerged">;

export type UserWithTokenResponse = {
  user: UserDTO;
  token: string;
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
