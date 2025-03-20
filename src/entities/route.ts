import type { JobMinorCategory, Link, Series } from '@/entities/post';

export type MyPageRouteQuery = {
  tab: 'POST' | 'COFFEE_CHAT' | 'BOOKMARK' | 'PROFILE';
};

export type PostFilterRouteQuery = {
  page?: number;
  roles?: JobMinorCategory[];
  investmentMax?: number;
  investmentMin?: number;
  employing?: 0 | 1;
  series?: Series[];
  order?: 0 | 1;
};

export type VerifyMailRouteQuery = {
  password: string;
  username: string;
};

export type PreviousSignUpFormRouteQuery = {
  password: string;
  username: string;
};

export type CompanyRouteQuery = {
  id: string;
  companyName: string;
  explanation: string;
  email: string;
  slogan: string;
  investAmount: number;
  investCompany: string;
  series: Series;
  irDeckLink?: string;
  landingPageLink?: string;
  imageLink?: string;
  links?: Link[];
  tags?: string[];
};

export type PostRouteQuery = {
  id: string;
  title: string;
  employmentEndDateTime?: string;
  jobMajorCategory: string;
  jobMinorCategory: string;
  detail: string;
  headcount: number;
};

export type ProfileRouteQuery = {
  enrollYear: string;
  department: string;
  positions?: JobMinorCategory[];
  slogan?: string;
  explanation?: string;
  stack?: string[];
  imagePreview?: { file: File; url: string } | null;
  cvPreview?: { file: File; url: string } | null;
  portfolioPreview?: { file: File; url: string } | null;
  links?: Link[];
};
