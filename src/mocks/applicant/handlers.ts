import { http } from 'msw';

import { applicantResolver } from '@/mocks/applicant/resolvers';

export const authHandlers = [
  http.post('*/api/applicant/me', applicantResolver.getProfile),
];
