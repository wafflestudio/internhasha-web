export type Post = {
  id: string;
  name: string;
  title: string;
  email: string;
  author: {
    id: string;
    username: string;
    profileImageLink?: string;
  };
  tags: string[];
  roles: {
    id: string;
    category: string;
    detail: string;
    headcount: number;
  }[];
  imageLink: string;
  investAmount: string;
  investCompany: string;
  isActive: boolean;
};

export type PostsResponse = {
  posts: Post[];
};
