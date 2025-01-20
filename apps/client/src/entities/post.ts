import type { Author } from '@/entities/author';

export type RoleCategory =
  | 'PLANNER'
  | 'FRONT'
  | 'APP'
  | 'BACKEND'
  | 'DESIGN'
  | 'DATA'
  | 'MARKETING'
  | 'OTHERS';

export type FilterElements = {
  roles?: RoleCategory[];
  investmentMax?: number;
  investmentMin?: number;
  pathStatus?: 0 | 1 | 2;
};

type Link = {
  link: string;
  description: string;
};

export type Post = {
  id: string;
  author: Author;

  // 회사 정보
  companyName: string;
  email: string;
  slogan: string;
  investAmount?: number;
  investCompany: string[];
  series: 'SEED' | 'PRE_A' | 'A' | 'B' | 'C' | 'D';
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
  category: RoleCategory;
  detail: string;
  headcount: string;
};

export type BriefPost = Omit<
  Post,
  | 'email'
  | 'IRDeckLink'
  | 'landingPageLink'
  | 'externalDescriptionLink'
  | 'tags'
  | 'detail'
>;

export const ROLE_CATEGORY_LIST: RoleCategory[] = [
  'PLANNER',
  'FRONT',
  'APP',
  'BACKEND',
  'DESIGN',
  'DATA',
  'MARKETING',
  'OTHERS',
];
