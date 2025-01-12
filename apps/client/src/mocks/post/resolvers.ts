import { HttpResponse, type HttpResponseResolver } from 'msw';

import { getPagedPosts, mockPost1, mockPost2 } from '@/mocks/post/data.ts';
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
  posts: ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') ?? '0');

    const response = getPagedPosts(page);
    return HttpResponse.json(response, { status: 200 });
  },
  postDetail1: () => {
    return HttpResponse.json(mockPost1, { status: 200 });
  },
  postDetail2: () => {
    return HttpResponse.json(mockPost2, { status: 200 });
  },
};
