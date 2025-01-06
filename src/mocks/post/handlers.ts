import { http } from 'msw';

import { postsResolver } from '@/mocks/post/resolvers.ts';
import type { PostsResponse } from '@/mocks/post/schemas.ts';

export const postsHandlers = [
  http.get<never, never, PostsResponse[]>('*/api/posts', postsResolver.posts),
];
