import type { Apis } from '@waffle/api';

import type { Paginator } from '@/entities/paginator';
import type {
  BriefPost,
  CreateCompanyRequest,
  CreatePostRequest,
  Post,
  Series,
} from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type PostService = {
  getPosts({
    page,
    roles,
    investmentMax,
    investmentMin,
    series,
    pathStatus,
  }: {
    page?: number;
    roles?: string[];
    investmentMax?: number;
    investmentMin?: number;
    series?: Series[];
    pathStatus?: number;
  }): ServiceResponse<{
    posts: BriefPost[];
    paginator: Paginator;
  }>;
  getPostDetail({
    postId,
    token,
  }: {
    postId: string;
    token: string;
  }): ServiceResponse<Post>;
  createCompany({
    token,
    companyContents,
  }: {
    token: string;
    companyContents: CreateCompanyRequest;
  }): ServiceResponse<void>;
  createPost({
    token,
    postContents,
  }: {
    token: string;
    postContents: CreatePostRequest;
  }): ServiceResponse<void>;
  addBookmark({
    postId,
    token,
  }: {
    postId: string;
    token: string;
  }): ServiceResponse<void>;
  deleteBookmark({
    postId,
    token,
  }: {
    postId: string;
    token: string;
  }): ServiceResponse<void>;
  getBookmarkList: ({
    token,
    bookmarkPage,
  }: {
    token: string;
    bookmarkPage?: string;
  }) => ServiceResponse<{
    posts: BriefPost[];
    paginator: {
      lastPage: number;
    };
  }>;
};

export const implPostService = ({ apis }: { apis: Apis }): PostService => ({
  getPosts: async ({
    page,
    roles,
    investmentMax,
    investmentMin,
    series,
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
    if (series !== undefined) postPath.append('series', series.toString());
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
    return { type: 'error', code: data.code, message: data.message };
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
    return { type: 'error', code: data.code, message: data.message };
  },
  createCompany: async ({ token, companyContents }) => {
    const { status, data } = await apis['POST /curator/company']({
      token: token,
      body: companyContents,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },

  createPost: async ({ token, postContents }) => {
    const { status, data } = await apis['POST /curator/post']({
      token: token,
      body: postContents,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  addBookmark: async ({ token, postId }) => {
    const params = { postId };
    const { status, data } = await apis['POST /post/:postId/bookmark']({
      token: token,
      params: params,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  deleteBookmark: async ({ token, postId }) => {
    const params = { postId };
    const { status, data } = await apis['DELETE /post/:postId/bookmark']({
      token: token,
      params: params,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  getBookmarkList: async ({ token, bookmarkPage }) => {
    const params = { bookmarkPage };
    const { status, data } = await apis['GET /post/bookmarks']({
      token: token,
      params: params,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
