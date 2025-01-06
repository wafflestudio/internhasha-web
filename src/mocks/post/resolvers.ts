import { HttpResponse, type HttpResponseResolver } from 'msw';

import type { PostsResponse } from '@/mocks/post/schemas.ts';

type PostsResolver = {
  posts: HttpResponseResolver<never, never, PostsResponse>;
};

export const postsResolver: PostsResolver = {
  posts: () => {
    const posts = {
      posts: mockPostData
    };

    return HttpResponse.json(posts, { status: 200 });
  },
};

const mockPostData = [
  {
    id: "1",
    name: "ABC 회사",
    title: "string",
    email: "string",
    author: {
      id: "string",
      username: "string",
      profileImageLink: "String?"
    },
    tags: [
      "ABC초콜릿",
      "ABC초코쿠키도 있어요",
      "설빙ABC초코쿠키도 많은관심"
    ],
    roles: [{
      id: "asdjfkadf",
      category: "개발자",
      detail: "프론트엔드",
      headcount: 3
    },
      {
        id: "sjdfhsjldf",
        category: "개발자",
        detail: "SpringBoot",
        headcount: 2
      }
    ],
    imageLink: "목업",
    investAmount: "string",
    investCompany: "String",
    isActive: true,
  },
  {
    id: "2",
    name: "ABC 회사",
    title: "string",
    email: "string",
    author: {
      id: "string",
      username: "string",
      profileImageLink: "String?"
    },
    tags: [
      "ABC초콜릿",
      "ABC초코쿠키도 있어요",
      "설빙ABC초코쿠키도 많은관심"
    ],
    roles: [{
      id: "asdjfkadf",
      category: "개발자",
      detail: "프론트엔드",
      headcount: 3
    },
      {
        id: "sjdfhsjldf",
        category: "개발자",
        detail: "SpringBoot",
        headcount: 2
      }
    ],
    imageLink: "목업",
    investAmount: "string",
    investCompany: "String",
    isActive: true,
  },
  {
    id: "3",
    name: "ABC 회사",
    title: "string",
    email: "string",
    author: {
      id: "string",
      username: "string",
      profileImageLink: "String?"
    },
    tags: [
      "ABC초콜릿",
      "ABC초코쿠키도 있어요",
      "설빙ABC초코쿠키도 많은관심"
    ],
    roles: [{
      id: "asdjfkadf",
      category: "개발자",
      detail: "프론트엔드",
      headcount: 3
    },
      {
        id: "sjdfhsjldf",
        category: "개발자",
        detail: "SpringBoot",
        headcount: 2
      }
    ],
    imageLink: "목업",
    investAmount: "string",
    investCompany: "String",
    isActive: true,
  },
  {
    id: "4",
    name: "ABC 회사",
    title: "string",
    email: "string",
    author: {
      id: "string",
      username: "string",
      profileImageLink: "String?"
    },
    tags: [
      "ABC초콜릿",
      "ABC초코쿠키도 있어요",
      "설빙ABC초코쿠키도 많은관심"
    ],
    roles: [{
      id: "asdjfkadf",
      category: "개발자",
      detail: "프론트엔드",
      headcount: 3
    },
      {
        id: "sjdfhsjldf",
        category: "개발자",
        detail: "SpringBoot",
        headcount: 2
      }
    ],
    imageLink: "목업",
    investAmount: "string",
    investCompany: "String",
    isActive: true,
  },
  {
    id: "5",
    name: "ABC 회사",
    title: "string",
    email: "string",
    author: {
      id: "string",
      username: "string",
      profileImageLink: "String?"
    },
    tags: [
      "ABC초콜릿",
      "ABC초코쿠키도 있어요",
      "설빙ABC초코쿠키도 많은관심"
    ],
    roles: [{
      id: "asdjfkadf",
      category: "개발자",
      detail: "프론트엔드",
      headcount: 3
    },
      {
        id: "sjdfhsjldf",
        category: "개발자",
        detail: "SpringBoot",
        headcount: 2
      }
    ],
    imageLink: "목업",
    investAmount: "string",
    investCompany: "String",
    isActive: true,
  }
]