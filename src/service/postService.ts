import type { ServiceResponse } from '@/entities/response.ts';
import type { Apis } from '@/shared/api';
import type { PostDetailResponse, PostsResponse } from '@/shared/api/entities';

export type PostService = {
  getPosts: ({
    page,
    roles,
    investment,
    investor,
    pathStatus,
  }: {
    page?: number;
    roles?: string[];
    investment?: number;
    investor?: string;
    pathStatus?: number;
  }) => ServiceResponse<PostsResponse>;
  getPostDetail: ({
    postId,
    token,
  }: {
    postId: string;
    token: string;
  }) => ServiceResponse<PostDetailResponse>;
};

export const implPostService = ({ apis }: { apis: Apis }): PostService => ({
  getPosts: async ({
    page,
    roles,
    investment,
    investor,
    pathStatus,
  }: {
    page?: number;
    roles?: string[];
    investment?: number;
    investor?: string;
    pathStatus?: number;
  }) => {
    const postPath = new URLSearchParams();

    if (page !== undefined) postPath.append('page', page.toString());
    if (roles !== undefined) {
      roles.forEach(role => {
        postPath.append('roles', role);
      });
    }
    if (investment !== undefined)
      postPath.append('investment', investment.toString());
    if (investor !== undefined) postPath.append('investor', investor);
    if (pathStatus !== undefined)
      postPath.append('status', pathStatus.toString());

    const params = {
      postPath: postPath.toString(),
    };

    const { status, data } = await apis['GET /post']({ params });

    console.log(params.postPath);

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },

  getPostDetail: async ({
    token,
    postId,
  }: {
    token?: string;
    postId: string;
  }) => {
    const params = { postId };

    const { status, data } = await apis['GET /post/:postId']({ token, params });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
});
