import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockPosts } from '@/mocks/post/data.ts';
import type { PostsResponse } from '@/mocks/post/schemas.ts';

type PostsResolver = {
  posts: HttpResponseResolver<never, never, PostsResponse>;
};

export const postsResolver: PostsResolver = {
  posts: () => {
    return HttpResponse.json(mockPosts, { status: 200 });
  },
};
