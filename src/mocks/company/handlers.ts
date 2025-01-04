import { http } from 'msw';

import { companyResolver } from '@/mocks/company/resolvers.ts';
import type { CompanyListResponse } from '@/mocks/company/schemas.ts';

export const companyHandlers = [
  http.get<never, never, CompanyListResponse[]>('*/api/company-list', companyResolver.companyList),
];
