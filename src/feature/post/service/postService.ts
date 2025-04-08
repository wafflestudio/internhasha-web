import type { Apis } from '@/api';
import type { Domain } from '@/entities/company';
import type { Paginator } from '@/entities/paginator';
import type {
  BriefPost,
  CreatePostRequest,
  JobMinorCategory,
  PositionDTO,
  PostResponse,
} from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type PostService = {
  getPosts({
    positions,
    isActive,
    page,
    order,
    domains,
    token,
  }: {
    positions?: JobMinorCategory[];
    isActive?: boolean;
    page?: number;
    order?: 0 | 1;
    domains?: Domain[];
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
  createPost({
    token,
    companyId,
    postContents,
  }: {
    token: string;
    companyId: string;
    postContents: CreatePostRequest;
  }): ServiceResponse<PositionDTO>;
  patchPost({
    token,
    companyId,
    postContents,
    postId,
  }: {
    token: string;
    companyId: string;
    postContents: CreatePostRequest;
    postId: string;
  }): ServiceResponse<PositionDTO>;
  closePost({
    token,
    postId,
  }: {
    token: string;
    postId: string;
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
  getPosts: async ({ positions, isActive, page, order, domains, token }) => {
    const params = {
      positions,
      isActive,
      page,
      order,
      domains,
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
  patchPost: async ({ token, companyId, postContents, postId }) => {
    const params = { postId };
    const body = { ...postContents, companyId };
    const { status, data } = await apis['PUT /post/position/:positionId']({
      token: token,
      body: body,
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
  closePost: async ({ token, postId }) => {
    const params = { postId };
    const { status, data } = await apis[
      'PATCH /post/position/:positionId/close'
    ]({
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
