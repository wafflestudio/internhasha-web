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
  | 'BACKEND'
  | 'OTHERS'
  | 'DESIGN'
  | 'DATA'
  | 'MARKETING';

type Link = {
  link: string;
  description: string;
};

type Series = 'SEED' | 'PRE_A' | 'A' | 'B' | 'C' | 'D';

type PostDTO = {
  id: string;
  author: AuthorBriefDTO;

  // 회사 정보
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount: number;
  investCompany: string;
  series: Series;
  irDeckLink?: string | null;
  landingPageLink?: string | null;
  imageLink: string;
  links?: Link[];
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
  | 'explanation'
  | 'irDeckLink'
  | 'landingPageLink'
  | 'links'
  | 'tags'
  | 'createdAt'
  | 'updatedAt'
  | 'detail'
>;

export type CoffeeChatStatus = 'WAITING' | 'ACCEPTED' | 'CANCELED' | 'REJECTED';

type CoffeeChatDTO = {
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

type CoffeeChatBriefDTO = Omit<CoffeeChatDTO, 'content'> & {
  applicant: CoffeeChatUserInfo;
};
type CoffeeChatUserInfo = {
  name: string;
  imageKey?: string;
};
// Params
export type PostPathParams = {
  page?: number;
  roles?: JobCategory[];
  investmentMax?: number;
  investmentMin?: number;
  series?: Series[];
  employing?: 0 | 1;
  order?: 0 | 1;
};

export type PostIdParams = {
  postId: string;
};

export type S3DownloadParams = {
  filePath: string;
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
        mail: string;
        password: string;
      };
    }
  | {
      authType: 'COMPANY';
      info: {
        type: 'COMPANY';
        name: string;
        secretPassword: string;
        password: string;
        mail: string;
      };
    };

export type SignInRequest = {
  mail: string;
  password: string;
};

export type MailRequest = {
  mail: string;
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
  'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'isBookmarked'
>;

export type CreateCoffeeChatRequest = {
  phoneNumber: string;
  content: string;
};

export type CancelCoffeeChatRequest = {
  coffeeChatStatus: 'CANCELED';
};

export type CoffeeChatStatusRequest = {
  coffeeChatStatus: CoffeeChatStatus;
};

export type S3UploadReq = {
  fileName: string;
  fileType: string;
};

export type CreateCompanyRequest = {
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount: number;
  investCompany: string;
  series: Series;
  irDeckLink?: string;
  landingPageLink?: string;
  imageLink: string;
  links?: Link[];
  tags?: { tag: string }[];
};

export type CreatePostRequest = {
  title: string;
  employmentEndDate?: string;
  category: JobCategory;
  detail: string;
  headcount: number;
  isActive: boolean;
  companyId: string;
};

// Response
export type UserWithTokenResponse = {
  user: UserBrief;
  token: string;
};

export type TokenResponse = {
  accessToken: string;
};

export type UserResponse = Omit<UserDTO, 'isMerged'>;

export type Applicant = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userRole: UserRole;
  snuMail?: string;
  enrollYear: number;
  department: string;
  positions?: JobCategory[];
  slogan?: string;
  explanation?: string;
  stacks?: string[];
  imageKey?: string;
  cvKey?: string;
  portfolioKey?: string;
  links?: Link[];
};

export type PostsResponse = {
  posts: PostBriefDTO[];
  paginator: {
    lastPage: number;
  };
};

export type PostDetailResponse = PostDTO;

export type PositionRespone = Pick<
  PostDTO,
  | 'id'
  | 'title'
  | 'category'
  | 'detail'
  | 'headcount'
  | 'createdAt'
  | 'updatedAt'
  | 'employmentEndDate'
  | 'isActive'
>;
export type CoffeeChatCount = {
  num: number;
};
export type CoffeeChatResponse = CoffeeChatDTO;

export type CoffeeChatListResponse = { coffeeChatList: CoffeeChatBriefDTO[] };

export type S3UploadResp = {
  url: string;
  s3Key: string;
};

export type S3DownloadResp = {
  url: string;
};
