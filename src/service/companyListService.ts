import type { ServiceResponse } from '@/entities/response.ts';
import type { Apis } from '@/shared/api';
import type { CompanyListResponse } from '@/shared/api/entities';

export type CompanyListService = {
  getCompanyList(): ServiceResponse<CompanyListResponse[]>;
};

export const implCompanyListService = ({
  apis,
}: {
  apis: Apis;
}): CompanyListService => ({
  getCompanyList: async () => {
    const { status, data } = await apis['GET /company-list']();

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
});
