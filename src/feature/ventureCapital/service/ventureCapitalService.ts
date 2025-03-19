import type { Apis } from '@/api';
import type { Paginator } from '@/entities/paginator';
import type { BriefPost, JobMinorCategory } from '@/entities/post';
import type { Series } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type VentureCapitalService = {
  getMyPosts({
    page,
    roles,
    investmentMax,
    investmentMin,
    series,
    employing,
    token,
  }: {
    page?: number;
    roles?: JobMinorCategory[];
    investmentMax?: number;
    investmentMin?: number;
    series?: Series[];
    employing?: 0 | 1;
    token: string;
  }): ServiceResponse<{
    posts: BriefPost[];
    paginator: Paginator;
  }>;
  getMyCompanys({ token }: { token: string }): ServiceResponse<BriefPost[]>;
};

export const implVentureCapitalService = ({
  apis,
}: {
  apis: Apis;
}): VentureCapitalService => ({
  getMyPosts: async ({
    page,
    roles,
    investmentMax,
    investmentMin,
    series,
    employing,
    token,
  }) => {
    const params = {
      page,
      roles,
      investmentMax,
      investmentMin,
      series,
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
});
