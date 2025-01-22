import type { Apis, ExternalApis } from '@waffle/api';

import type { Paginator } from '@/entities/paginator';
import type { BriefPost, Post, PostRequest } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

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
  }) => ServiceResponse<{
    posts: BriefPost[];
    paginator: Paginator;
  }>;
  getPostDetail: ({
    postId,
    token,
  }: {
    postId: string;
    token: string;
  }) => ServiceResponse<Post>;
  createPost: ({
    token,
    postContents,
  }: {
    token: string;
    postContents: PostRequest;
  }) => ServiceResponse<Post>;
  updatePost: ({
    postId,
    token,
    postContents,
  }: {
    postId: string;
    token: string;
    postContents: PostRequest;
  }) => ServiceResponse<Post>;
  getPresignedUrl({
    token,
    fileName,
    fileType,
  }: {
    token: string;
    fileName: string;
    fileType: string;
  }): ServiceResponse<{ presignedUrl: string }>;
  uploadImage({
    presignedUrl,
    file,
  }: {
    presignedUrl: string;
    file: File;
  }): ServiceResponse<void>;
};

export const implPostService = ({
  apis,
  externalApis,
}: {
  apis: Apis;
  externalApis: ExternalApis;
}): PostService => ({
  getPosts: async ({
    page,
    roles,
    investmentMax,
    investmentMin,
    pathStatus,
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

  createPost: async ({ token, postContents }) => {
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

  updatePost: async ({ token, postId, postContents }) => {
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
  getPresignedUrl: async ({ token, fileName, fileType }) => {
    const body = { fileName, fileType };
    const { status, data } = await apis['POST /admin/post/upload/presigned']({
      token,
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  uploadImage: async ({ presignedUrl, file }) => {
    const body = { file };
    const { status, data } = await externalApis['PUT upload-file']({
      path: presignedUrl,
      body,
      contentType: file.type,
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
