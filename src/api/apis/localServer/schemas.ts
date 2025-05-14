// DTO
type UserRole = 'APPLICANT' | 'COMPANY';

type UserDTO = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  userRole: UserRole;
  snuMail: string;
  phoneNumber?: string;
  profileImageLink: string;
  isMerged: boolean;
};

type UserBrief = {
  id: string;
  userRole: UserRole;
};

type AuthorBriefDTO = {
  id: string;
  name: string;
  profileImageLink?: string;
};

type JobCategory =
  | 'PLANNER'
  | 'FRONT'
  | 'APP'
  | 'DATA'
  | 'GAME'
  | 'BACKEND'
  | 'AI'
  | 'OTHERS'
  | 'DESIGN'
  | 'MARKETING'
  | 'HUMANRESOURCE';

type Link = {
  link: string;
  description: string;
};

type Domain =
  | 'FINTECH'
  | 'HEALTHTECH'
  | 'EDUCATION'
  | 'ECOMMERCE'
  | 'FOODTECH'
  | 'MOBILITY'
  | 'CONTENTS'
  | 'B2B'
  | 'OTHERS';

type CompanyDTO = {
  id: string;
  companyName: string;
  companyEstablishedYear: number;
  domain: Domain;
  headcount: number;
  location: string;
  slogan: string;
  detail: string;
  profileImageKey: string;
  companyInfoPDFKey?: string;
  landingPageLink?: string;
  links?: Link[];
  tags?: { tag: string }[];
  vcName?: string;
  vcRecommendation?: string;
};

type PositionDTO = {
  id: string;
  positionTitle: string;
  positionType: string;
  headCount: number;
  salary: number | null;
  detail: string;
  employmentEndDate: string | null;
  createdAt: string;
  updatedAt: string;
};

type PostDTO = {
  id: string;
  author: AuthorBriefDTO;
  company: CompanyDTO;
  position: PositionDTO;
  isBookmarked: boolean;
};

export type PostBriefDTO = {
  id: string;
  author: AuthorBriefDTO;
  companyName: string;
  profileImageKey: string;
  location: string;
  employmentEndDate: string | null;
  positionTitle: string;
  domain: string;
  detailSummary: string;
  slogan: string;
  positionType: string;
  headCount: number;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
  tags: { tag: string }[];
  coffeeChatCount: number;
};

export type CoffeeChatStatus = 'WAITING' | 'ACCEPTED' | 'CANCELED' | 'REJECTED';

export type CoffeeChatApplicant = {
  id: string;
  postId: string;
  title: string;
  company: CoffeeChatUserInfo;
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  content: string;
};

export type Applicant = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userRole: UserRole;
  email?: string;
  enrollYear: number;
  department: string;
  positions?: string[];
  slogan?: string;
  explanation?: string;
  stacks?: string[];
  imageKey?: string;
  cvKey: string;
  portfolioKey?: string;
  links?: Link[];
};

export type CoffeeChatCompany = {
  id: string;
  postId: string;
  title: string;
  company: CoffeeChatUserInfo;
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  content: string;
  applicant: Applicant;
};

export type CoffeeChatDetailList =
  | {
      succeeded: CoffeeChatApplicant[];
      failed: CoffeeChatApplicant[];
    }
  | {
      succeeded: CoffeeChatCompany[];
      failed: CoffeeChatCompany[];
    };

type CoffeeChatBriefDTO = {
  id: string;
  postId: string;
  positionType: string;
  company: CoffeeChatUserInfo;
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  content: string;
  applicant: CoffeeChatUserInfo;
};

type CoffeeChatUserInfo = {
  name: string;
  imageKey?: string;
};

// Params
export type PostPathParams = {
  roles?: JobCategory[];
  isActive?: boolean;
  domains?: Domain[];
  page?: number;
  order?: 0 | 1;
};

export type PostIdParams = {
  postId: string;
};

export type S3DownloadParams = {
  s3Key: string;
  fileType: string;
};

export type CoffeeChatIdParams = {
  coffeeChatId: string;
};
export type CoffeeChatCountResponse = {
  num: number;
};
export type BookmarkPageParams = {
  bookmarkPage?: string;
};

// Request
export type SignUpRequest =
  | {
      authType: 'APPLICANT';
      info: {
        type: 'APPLICANT';
        name: string;
        email: string;
        password: string;
        successCode: string;
      };
    }
  | {
      authType: 'COMPANY';
      info: {
        type: 'COMPANY';
        name: string;
        secretPassword: string;
        password: string;
        email: string;
      };
    };

export type SignInRequest = {
  email: string;
  password: string;
};

export type MailRequest = {
  email: string;
};

export type SnuMailRequest = {
  snuMail: string;
};

export type CheckSnuMailVerificationRequest = {
  snuMail: string;
  code: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type CreateAndUpdatePostRequest = Omit<
  PostDTO,
  'id' | 'createdAt' | 'updatedAt' | 'isBookmarked'
>;

export type CreateCoffeeChatRequest = {
  content: string;
};

export type CoffeeChatStatusRequest = {
  coffeeChatStatus: CoffeeChatStatus;
  coffeeChatList: string[];
};

export type S3UploadReq = {
  fileName: string;
  fileType: string;
};

export type CreateCompanyRequest = Omit<
  CompanyDTO,
  'id' | 'companyName' | 'vcName' | 'vcRecommendation'
>;

export type CreatePositionRequest = {
  positionTitle: string;
  positionType: JobCategory;
  detail: string;
  headCount: number;
  salary?: number;
  employmentEndDate?: string;
  companyId: string;
};

export type PutApplicantRequest = {
  enrollYear: number;
  department: string;
  positions?: string[];
  slogan?: string;
  explanation?: string;
  stacks?: string[];
  imageKey?: string;
  cvKey: string;
  portfolioKey?: string;
  links?: Link[];
};

// Response
export type UserWithTokenResponse = {
  user: UserBrief;
  token: string;
};

export type TokenResponse = {
  accessToken: string;
};

export type SuccessCode = {
  successCode: string;
};

export type UserResponse = Omit<UserDTO, 'isMerged'>;

export type ApplicantResponse = Applicant;

export type PostsResponse = {
  posts: PostBriefDTO[];
  paginator: {
    lastPage: number;
  };
};

export type PostDetailResponse = PostDTO;

export type PositionRespone = PositionDTO;

export type CoffeeChatCount = {
  num: number;
};
export type CoffeeChatResponse = CoffeeChatApplicant | CoffeeChatCompany;

export type CoffeeChatListResponse = { coffeeChatList: CoffeeChatBriefDTO[] };

export type S3UploadResp = {
  url: string;
  s3Key: string;
};

export type S3DownloadResp = {
  url: string;
};

export type CompanyResponse = CompanyDTO;
