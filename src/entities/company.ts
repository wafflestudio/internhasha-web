import type { Link } from '@/entities/link';

export type Domain =
  | 'FINTECH'
  | 'HEALTHTECH'
  | 'EDUCATION'
  | 'ECOMMERCE'
  | 'FOODTECH'
  | 'MOBILITY'
  | 'CONTENTS'
  | 'B2B'
  | 'OTHERS';

export const domainList = [
  'FINTECH',
  'HEALTHTECH',
  'EDUCATION',
  'ECOMMERCE',
  'FOODTECH',
  'MOBILITY',
  'CONTENTS',
  'B2B',
  'OTHERS',
];

export type CreateCompanyRequest = {
  companyEstablishedYear: number;
  domain: Domain;
  headcount: number;
  location: string;
  slogan: string;
  detail: string;
  profileImageKey: string;
  companyInfoPDFKey?: string;
  landingPageLink?: string;
  links?: Link[];
  tags?: { tag: string }[];
};
