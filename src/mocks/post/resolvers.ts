import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockPost1, mockPost2, mockPosts } from '@/mocks/post/data.ts';
import type {
  PostDetailResponse,
  PostsResponse,
} from '@/mocks/post/schemas.ts';

type PostsResolver = {
  posts: HttpResponseResolver<never, never, PostsResponse>;
  postDetail1: HttpResponseResolver<never, never, PostDetailResponse>;
  postDetail2: HttpResponseResolver<never, never, PostDetailResponse>;
};

export const postsResolver: PostsResolver = {
  posts: () => {
    return HttpResponse.json(mockPosts, { status: 200 });
  },
  postDetail1: () => {
    return HttpResponse.json(mockPost1, { status: 200 });
  },
  postDetail2: () => {
    return HttpResponse.json(mockPost2, { status: 200 });
  },
};
