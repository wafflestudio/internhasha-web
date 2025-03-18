import { http } from 'msw';

import { applicantResolver } from '@/mocks/applicant/resolvers';

export const applicantHandlers = [
  http.get('*/api/applicant/me', applicantResolver.getProfile),
];
