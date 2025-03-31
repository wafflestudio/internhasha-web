type Link = {
  link: string;
  description: string;
};

type Domain =
  | 'FINTECH'
  | 'HEALTHTECH'
  | 'EDUCATION'
  | 'ECOMMERCE'
  | 'FOODTECH'
  | 'MOBILITY'
  | 'CONTENTS'
  | 'B2B'
  | 'OTHERS';

export type CompanyResponse = {
  id: string;
  companyName: string;
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
  vcName: string;
  vcRecommendation: string;
};
