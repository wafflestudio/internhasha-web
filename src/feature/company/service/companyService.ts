import type { Apis } from '@/api';
import type { LocalServerDTO } from '@/api';
import type { Paginator } from '@/entities/paginator';
import type { BriefPost, JobMinorCategory } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type CompanyService = {
  getMyPosts({
    page,
    roles,
    status,
    token,
  }: {
    page?: number;
    roles?: JobMinorCategory[];
    status?: 0 | 1 | 2;
    token: string;
  }): ServiceResponse<{
    posts: BriefPost[];
    paginator: Paginator;
  }>;
  getMyCompanys({ token }: { token: string }): ServiceResponse<BriefPost[]>;
  getMyInfo({
    token,
  }: {
    token: string;
  }): ServiceResponse<LocalServerDTO.UserResponse>;
};

export const implCompanyService = ({
  apis,
}: {
  apis: Apis;
}): CompanyService => ({
  getMyPosts: async ({ page, roles, status: employing, token }) => {
    const params = {
      page,
      roles,
      employing,
    };
    const { status, data } = await apis['GET /post/position/me']({
      params,
      token,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  getMyCompanys: async ({ token }) => {
    const { status, data } = await apis['GET /post/company/me']({ token });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  getMyInfo: async ({ token }) => {
    const { status, data } = await apis['GET /user/me']({ token });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
