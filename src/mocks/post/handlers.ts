import { http } from 'msw';

import { postsResolver } from '@/mocks/post/resolvers';
import type { PostsResponse } from '@/mocks/post/schemas';

export const postsHandlers = [
  http.get<never, never, PostsResponse>('*/api/post', postsResolver.posts),
];
