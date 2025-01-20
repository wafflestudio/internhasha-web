import type { Apis } from '@waffle/api';

import type { ServiceResponse } from '@/entities/response.ts';
import type {
  CreateAndUpdatePostRequest,
  PostDetailResponse,
  PostsResponse,
} from '@/shared/api/entities';

export type PostService = {
  getPosts: ({
    page,
    roles,
    investmentMax,
    investmentMin,
    pathStatus,
  }: {
    page?: number;
    roles?: string[];
    investmentMax?: number;
    investmentMin?: number;
    pathStatus?: number;
  }) => ServiceResponse<PostsResponse>;
  getPostDetail: ({
    postId,
    token,
  }: {
    postId: string;
    token: string;
  }) => ServiceResponse<PostDetailResponse>;
  createPost: ({
    token,
    postContents,
  }: {
    token: string;
    postContents: CreateAndUpdatePostRequest;
  }) => ServiceResponse<PostDetailResponse>;
  updatePost: ({
    postId,
    token,
    postContents,
  }: {
    postId: string;
    token: string;
    postContents: CreateAndUpdatePostRequest;
  }) => ServiceResponse<PostDetailResponse>;
};

export const implPostService = ({ apis }: { apis: Apis }): PostService => ({
  getPosts: async ({
    page,
    roles,
    investmentMax,
    investmentMin,
    pathStatus,
  }: {
    page?: number;
    roles?: string[];
    investmentMax?: number;
    investmentMin?: number;
    pathStatus?: number;
  }) => {
    const postPath = new URLSearchParams();

    if (page !== undefined) postPath.append('page', page.toString());
    if (roles !== undefined) {
      roles.forEach((role) => {
        postPath.append('roles', role);
      });
    }
    if (investmentMax !== undefined)
      postPath.append('investmentMax', investmentMax.toString());
    if (investmentMin !== undefined)
      postPath.append('investmentMin', investmentMin.toString());
    if (pathStatus !== undefined)
      postPath.append('status', pathStatus.toString());

    const params = {
      postPath: postPath.toString(),
    };
    const { status, data } = await apis['GET /post']({ params });

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

  createPost: async ({
    token,
    postContents,
  }: {
    token: string;
    postContents: CreateAndUpdatePostRequest;
  }) => {
    const { status, data } = await apis['POST /admin/post']({
      token: token,
      body: postContents,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },

  updatePost: async ({
    token,
    postId,
    postContents,
  }: {
    token: string;
    postId: string;
    postContents: CreateAndUpdatePostRequest;
  }) => {
    const params = { postId };
    const { status, data } = await apis['PATCH /admin/post/:postId']({
      token: token,
      params: params,
      body: postContents,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
});
