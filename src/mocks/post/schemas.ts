type AuthorBriefDTO = {
  id: string;
  name: string;
  profileImageLink?: string;
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

type CompanyDTO = {
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
  vcName?: string;
  vcRecommendation?: string;
};

type PositionDTO = {
  id: string;
  positionTitle: string;
  positionType: string;
  headCount: number;
  salary: number | null;
  detail: string;
  employmentEndDate: string | null;
  createdAt: string;
  updatedAt: string;
};

type Link = {
  link: string;
  description: string;
};

type PostDTO = {
  id: string;
  author: AuthorBriefDTO;
  company: CompanyDTO;
  position: PositionDTO;
  isBookmarked: boolean;
};

export type PostBriefDTO = {
  id: string;
  author: AuthorBriefDTO;
  companyName: string;
  profileImageKey: string;
  location: string;
  employmentEndDate: string | null;
  positionTitle: string;
  domain: string;
  detailSummary: string;
  slogan: string;
  positionType: string;
  headCount: number;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
  tags: { tag: string }[];
  coffeeChatCount: number;
};

export type PostsResponse = {
  posts: PostBriefDTO[];
  paginator: {
    lastPage: number;
  };
};

export type PostDetailResponse = PostDTO;
