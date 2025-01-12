import { http } from 'msw';

import { authResolver } from '@/mocks/auth/resolvers';

export const authHandlers = [
  http.post('*/api/user/signup/send-code', authResolver.sendCode),
  http.post('*/api/user/signup/verify-email', authResolver.verfiyEmail),
  http.post('*/api/user/signup/google', authResolver.signupGoogle),
  http.post('*/api/user/signup/local', authResolver.signUpLocal),
  http.post(
    '*/api/user/signup/id-duplicate',
    authResolver.checkLocalIdDuplicate,
  ),
];
