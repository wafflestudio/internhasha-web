import type { Apis } from '@waffle/api';

import type { Paginator } from '@/entities/paginator';
import type { BriefPost } from '@/entities/post';
import type { Series } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type VentureCapitalService = {
  getMyPosts({
    page,
    roles,
    investmentMax,
    investmentMin,
    series,
    pathStatus,
    token,
  }: {
    page?: number;
    roles?: string[];
    investmentMax?: number;
    investmentMin?: number;
    series?: Series[];
    pathStatus?: number;
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
    pathStatus,
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

    const params = {
      postPath: postPath.toString(),
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
