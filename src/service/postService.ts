import type { ServiceResponse } from '@/entities/response.ts';
import type { Apis } from '@/shared/api';
import type { PostsResponse } from '@/shared/api/entities';

export type PostService = {
  getPosts(): ServiceResponse<PostsResponse[]>;
};

export const implPostService = ({ apis }: { apis: Apis }): PostService => ({
  getPosts: async () => {
    const { status, data } = await apis['GET /post']();

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
});
