import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockCompany } from '@/mocks/company/data';
import type { CompanyResponse } from '@/mocks/company/schemas';

type CompanyResolver = {
  getCompany: HttpResponseResolver<never, never, CompanyResponse>;
};

export const companyResolver: CompanyResolver = {
  getCompany: () => {
    const response = mockCompany;
    return HttpResponse.json(response, { status: 200 });
  },
};
