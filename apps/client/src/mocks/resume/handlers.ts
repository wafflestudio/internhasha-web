import { http } from 'msw';

import { postsResolver } from '@/mocks/post/resolvers.ts';
import type {
  PostDetailResponse,
  PostsResponse,
} from '@/mocks/post/schemas.ts';

export const resumeHandlers = [
  http.get<never, never, PostsResponse>('*/api/post', postsResolver.posts),
  http.get<never, never, PostDetailResponse>(
    '*/api/post/1',
    postsResolver.postDetail1,
  ),
  http.get<never, never, PostDetailResponse>(
    '*/api/post/2',
    postsResolver.postDetail2,
  ),
];
