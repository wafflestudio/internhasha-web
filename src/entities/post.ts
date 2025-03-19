import type { AuthorBriefDTO } from '@/entities/author';

export type JobMajorCategory =
  | 'DEVELOPMENT'
  | 'DESIGN'
  | 'PLANNER'
  | 'MARKETING';

type JobMinorCategoryMap = {
  DEVELOPMENT: 'FRONT' | 'APP' | 'BACKEND' | 'DATA' | 'OTHERS';
  DESIGNER: 'DESIGN';
  PLANNER: 'PLANNER';
  MARKETING: 'MARKETING';
};

export type JobMinorCategory = JobMinorCategoryMap[keyof JobMinorCategoryMap];

export const JOB_CATEGORY_MAP: Record<JobMajorCategory, JobMinorCategory[]> = {
  DEVELOPMENT: ['FRONT', 'APP', 'BACKEND', 'DATA', 'OTHERS'],
  DESIGN: ['DESIGN'],
  PLANNER: ['PLANNER'],
  MARKETING: ['MARKETING'],
};

export const JOB_MAJOR_CATEGORIES = Object.keys(JOB_CATEGORY_MAP);

export type Series = 'SEED' | 'PRE_A' | 'A' | 'B' | 'C' | 'D';
export const seriesList = ['SEED', 'PRE_A', 'A', 'B', 'C', 'D'];

export type PostFilter = {
  roles?: JobMinorCategory[];
  investmentMax?: number;
  investmentMin?: number;
  employing?: 0 | 1;
  series?: Series[];
  order?: 0 | 1;
};

export type Link = {
  link: string;
  description: string;
};

type PostRequest = {
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
  irDeckLink?: string;
  landingPageLink?: string;
  imageLink: string;
  links?: Link[];
  tags?: { tag: string }[];

  // post 정보
  title: string;
  employmentEndDate: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  category: JobMinorCategory;
  detail: string;
  headcount: number;
  isBookmarked: boolean;
};

export type PostResponse = {
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
  category: JobMinorCategory;
  detail: string;
  headcount: number;
  isBookmarked: boolean;
};

export type CreateCompanyRequest = Pick<
  PostRequest,
  | 'companyName'
  | 'explanation'
  | 'email'
  | 'slogan'
  | 'investAmount'
  | 'investCompany'
  | 'series'
  | 'irDeckLink'
  | 'landingPageLink'
  | 'imageLink'
  | 'links'
  | 'tags'
>;

export type CreatePostRequest = Pick<
  PostRequest,
  'title' | 'category' | 'detail' | 'headcount' | 'isActive'
> & { employmentEndDate?: string };

export type BriefPost = Omit<
  PostResponse,
  | 'explanation'
  | 'irDeckLink'
  | 'landingPageLink'
  | 'links'
  | 'tags'
  | 'createdAt'
  | 'updatedAt'
  | 'detail'
>;

export type PositionDTO = Pick<
  PostResponse,
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
