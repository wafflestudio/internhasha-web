import type { Series } from '@/entities/post';
import type { JobMinorCategory } from '@/entities/post';
import type { Link } from '@/entities/post';

export type VerifyMailRouteBody = {
  password: string;
  username: string;
};

export type PreviousSignUpFormRouteBody = {
  password: string;
  username: string;
};

export type CompanyRouteBody = {
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

export type PostRouteBody = {
  id: string;
  title: string;
  employmentEndDateTime?: string;
  jobMajorCategory: string;
  jobMinorCategory: string;
  detail: string;
  headcount: number;
};

export type MyPageRouteBody = {
  tab: 'POST' | 'COFFEE_CHAT' | 'BOOKMARK' | 'PROFILE';
};

export type ProfileRouteBody = {
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
