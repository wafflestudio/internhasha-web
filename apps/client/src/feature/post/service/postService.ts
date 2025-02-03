import type { Apis } from '@waffle/api';

import type { Paginator } from '@/entities/paginator';
import type {
  BriefPost,
  CreateCompanyRequest,
  CreatePostRequest,
  PostResponse,
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
    token,
    order,
  }: {
    page?: number;
    roles?: string[];
    investmentMax?: number;
    investmentMin?: number;
    series?: Series[];
    pathStatus?: number;
    order?: number;
    token: string | null;
  }): ServiceResponse<{
    posts: BriefPost[];
    paginator: Paginator;
  }>;
  getPostDetail({
    postId,
    token,
  }: {
    postId: string;
    token?: string;
  }): ServiceResponse<PostResponse>;
  createCompany({
    token,
    companyContents,
  }: {
    token: string;
    companyContents: CreateCompanyRequest;
  }): ServiceResponse<void>;
  createPost({
    token,
    companyId,
    postContents,
  }: {
    token: string;
    companyId: string;
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
    order,
    token,
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
    if (order !== undefined) {
      postPath.append('order', order.toString());
    }

    const params = {
      postPath: postPath.toString(),
    };
    const { status, data } = await apis['GET /post']({
      params,
      token: token !== null ? token : undefined,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  getPostDetail: async ({ token, postId }) => {
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
    console.log(companyContents);
    const { status, data } = await apis['POST /post/company']({
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

  createPost: async ({ token, companyId, postContents }) => {
    const body = { ...postContents, companyId };
    const { status, data } = await apis['POST /post/position']({
      token: token,
      body: body,
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
