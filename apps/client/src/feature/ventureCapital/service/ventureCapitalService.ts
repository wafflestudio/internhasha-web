import type { Apis } from '@waffle/api';

import type { BriefPost } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type VentureCapitalService = {
  getMyPost({ token }: { token: string }): ServiceResponse<BriefPost[]>;
  getMyCompany({ token }: { token: string }): ServiceResponse<BriefPost[]>;
};

export const implVentureCapitalService = ({
  apis,
}: {
  apis: Apis;
}): VentureCapitalService => ({
  getMyPost: async ({ token }) => {
    const { status, data } = await apis['GET /post/position/me']({ token });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  getMyCompany: async ({ token }) => {
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
