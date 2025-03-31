import { http } from 'msw';

import { companyResolver } from '@/mocks/company/resolvers';

export const companyHandlers = [
  http.get('*/api/company/me', companyResolver.getCompany),
];
