import type { ServiceResponse } from '@/entities/response.ts';
import type { Apis } from '@/shared/api';

export type CompanyListService = {
  getCompanyList(): ServiceResponse<CompanyListService[]>;
};

export const implCompanyListService = ({ apis }: { apis: Apis }) => ({
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
