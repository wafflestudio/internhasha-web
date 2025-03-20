import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockApplicant } from '@/mocks/applicant/data';
import type { Applicant } from '@/mocks/applicant/schemas';

type AuthResolver = {
  getProfile: HttpResponseResolver<never, never, Applicant>;
};

export const applicantResolver: AuthResolver = {
  getProfile: () => {
    const body = mockApplicant;
    return HttpResponse.json(body, { status: 200 });
  },
};
