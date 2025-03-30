import type { AuthorBriefDTO } from '@/entities/author';
import type { Link } from '@/entities/link';

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
  company: CompanyDTO;
  position: PositionDTO;
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

export type CreatePostRequest = {
  positionTitle: string;
  positionType: JobMinorCategory;
  detail: string;
  headCount: number;
  salary?: number;
  employmentEndDate?: string;
  isActive: boolean;
};

export type BriefPost = {
  id: string;
  author: AuthorBriefDTO;
  companyName: string;
  profileImageKey: string;
  location: string;
  employmentEndDate: string | null;
  positionTitle: string;
  isActive: boolean;
  domain: string;
  detail100: string;
  positionType: string;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
};

type CompanyDTO = {
  id: string;
  companyName: string;
  companyEstablishedYear: number;
  domain: string;
  headcount: number;
  location: string;
  slogan: string;
  detail: string;
  profileImageKey: string;
  companyInfoPDFLink?: string | null;
  landingPageLink?: string | null;
  links?: Link[];
  tags?: string[];
  vcName: string;
  vcRec: string;
};

export type PositionDTO = {
  id: string;
  isActive: boolean;
  positionTitle: string;
  positionType: string;
  headCount: number;
  salary?: number | null;
  detail: string;
  employmentEndDate: string | null;
  createdAt: string;
  updatedAt: string;
};
