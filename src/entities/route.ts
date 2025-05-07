import type { Domain } from '@/entities/company';
import type { Link } from '@/entities/link';
import type { JobMinorCategory, Series } from '@/entities/post';

export type MyPageRouteQuery = {
  tab: 'POST' | 'COFFEE_CHAT' | 'BOOKMARK' | 'PROFILE';
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
  positionTitle: string;
  employmentEndDateTime: string | null;
  jobMinorCategory: string;
  detail: string;
  headcount: number;
  salary: number | null;
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

export type PostQuery = {
  roles?: JobMinorCategory[];
  isActive?: boolean;
  domains?: Domain[];
  page?: number;
  order?: 0 | 1;
};
