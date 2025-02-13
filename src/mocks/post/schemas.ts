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

type PostDTO = {
  id: string;
  author: AuthorBriefDTO;

  // 회사 정보
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount?: number;
  investCompany: string[];
  series: 'SEED' | 'PRE_A' | 'A' | 'B' | 'C' | 'D';
  irDeckLink?: string;
  landingPageLink?: string;
  imageLink?: string;
  links?: Link[];
  tags?: string[];

  // post 정보
  title: string;
  employmentEndDate?: string;
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

export type PostsResponse = {
  posts: PostBriefDTO[];
  paginator: {
    lastPage: number;
  };
};

export type PostDetailResponse = PostDTO;
