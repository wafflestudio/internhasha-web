import { HttpResponse, type HttpResponseResolver } from 'msw';

import { getPagedPosts } from '@/mocks/post/data';
import type { PostsResponse } from '@/mocks/post/schemas';

type PostsResolver = {
  posts: HttpResponseResolver<never, never, PostsResponse>;
};

export const postsResolver: PostsResolver = {
  posts: ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') ?? '0');

    const response = getPagedPosts(page);
    return HttpResponse.json(response, { status: 200 });
  },
};
