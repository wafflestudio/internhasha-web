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
  role: UserRole;
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

type CoffeeChatDTO = {
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
  type: 'APPLICANT';
  name: string;
  snuMail: string;
  password: string;
};

type LocalCompanyInfo = {
  type: 'COMPANY';
  name: string;
  secretPassword: string;
  password: string;
  email: string;
};

// Params
export type PostPathParams = {
  postPath: string;
};

export type PostIdParams = {
  postId: string;
};

export type CoffeeChatIdParams = {
  coffeeChatId: string;
};

export type BookmarkPageParams = {
  bookmarkPage?: string;
};

// Request
export type SignUpRequest = {
  authType: UserRole;
  info: LocalApplicantInfo | LocalCompanyInfo;
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

export type FileUploadRequest = {
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

export type CoffeeChatResponse = CoffeeChatDTO;

export type CoffeeChatListResponse = { coffeeChatList: CoffeeChatDTO[] };

export type PresignedUrlResponse = {
  presignedUrl: string;
};
