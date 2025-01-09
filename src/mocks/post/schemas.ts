type AuthorBriefDTO = {
  id: string;
  name: string;
  profileImageLink?: string;
};

type RoleDTO = {
  id: string;
  category: string;
  detail: string;
  headcount: string;
};

type PostDTO = {
  id: string;
  companyName: string;
  email: string;
  author: AuthorBriefDTO;
  explanation: string;
  tags: string[];
  roles: RoleDTO[];
  imageLink: string;
  investAmount: number;
  investCompany: string[];
  IRDeckLink: string;
  landingPageLink: string;
  externalDescriptionLink: string[];
  isActive: boolean;
  employmentEndDate: Date;
};

type PostBriefDTO = {
  id: string;
  companyName: string;
  email: string;
  author: AuthorBriefDTO;
  explanation: string;
  tags: string[];
  roles: RoleDTO[];
  imageLink: string;
  investAmount: number;
  investCompany: string[];
  isActive: boolean;
  employmentEndDate: Date;
};

export type PostsResponse = PostBriefDTO[];

export type PostDetailResponse = PostDTO;
