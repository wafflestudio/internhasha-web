type AuthorBriefDTO = {
  id: string;
  name: string;
  profileImageLink?: string;
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
