import type { Link } from '@/entities/link';

export type Applicant = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userRole: string;
  snuMail?: string;
  enrollYear: number;
  department: string;
  positions?: string[];
  slogan?: string;
  explanation?: string;
  stack?: string[];
  imageKey?: string;
  cvKey?: string;
  portfolioKey?: string;
  linkes?: Link[];
};
