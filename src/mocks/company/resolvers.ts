import { HttpResponse, type HttpResponseResolver } from 'msw';

import type { CompanyListResponse } from '@/mocks/company/schemas.ts';

type companyResolver = {
  companyList: HttpResponseResolver<never, never, CompanyListResponse[]>;
};

export const companyResolver: companyResolver = {
  companyList: () => {
    const companies = [
      { id: '1', name: '1start', description: 'first description' },
      { id: '2', name: 'up2', description: 'second description' },
      { id: '3', name: 'startup', description: 'third description' },
      { id: '4', name: 'startup4', description: 'fourth description' },
      { id: '5', name: 'startup5', description: 'fifth description' },
      { id: '6', name: 'startup6', description: 'sixth description' },
    ];

    return HttpResponse.json(companies, { status: 200 });
  },
};
