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
  IRDeckLink?: string;
  landingPageLink?: string;
  externalDescriptionLink?: string[];
  isActive: boolean;
  employmentEndDate: Date;
};

type PostBriefDTO = Omit<PostDTO, 'createdAt' | 'updatedAt' | 'isActive'>;

export type PostsResponse = {
  posts: PostBriefDTO[];
  paginator: {
    lastPage: number;
  };
};

export type PostDetailResponse = PostDTO;
