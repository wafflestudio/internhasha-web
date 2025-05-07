import type { Apis, LocalServerDTO } from '@/api';
import type { Domain } from '@/entities/company';
import type { JobMinorCategory } from '@/entities/post';
import type { CreatePostRequest } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type PostService = {
  getPosts({
    roles,
    isActive,
    page,
    order,
    domains,
    token,
  }: {
    roles?: JobMinorCategory[];
    isActive?: boolean;
    page?: number;
    order?: 0 | 1;
    domains?: Domain[];
    token: string | null;
  }): ServiceResponse<LocalServerDTO.PostsResponse>;
  getPostDetail({
    postId,
    token,
  }: {
    postId: string;
    token?: string;
  }): ServiceResponse<LocalServerDTO.PostDetailResponse>;
  createPost({
    token,
    companyId,
    postContents,
  }: {
    token: string;
    companyId: string;
    postContents: CreatePostRequest;
  }): ServiceResponse<LocalServerDTO.PositionRespone>;
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
  }): ServiceResponse<LocalServerDTO.PositionRespone>;
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
  }) => ServiceResponse<LocalServerDTO.PostsResponse>;
};

export const implPostService = ({ apis }: { apis: Apis }): PostService => ({
  getPosts: async ({ roles, isActive, page, order, domains, token }) => {
    const params = {
      roles,
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
      body,
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
      body,
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
