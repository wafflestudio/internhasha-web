import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockUser } from '@/mocks/auth/data';
import type {
  EmailVerifyRequest,
  GoogleSignUpRequest,
  LocalIdRequest,
  LocalSignUpRequest,
  SendEmailCodeRequest,
  UserWithTokenResponse,
} from '@/mocks/auth/schemas';

type AuthResolver = {
  sendCode: HttpResponseResolver<never, SendEmailCodeRequest, never>;
  verfiyEmail: HttpResponseResolver<never, EmailVerifyRequest, never>;
  signupGoogle: HttpResponseResolver<
    never,
    GoogleSignUpRequest,
    UserWithTokenResponse
  >;
  signUpLocal: HttpResponseResolver<
    never,
    LocalSignUpRequest,
    UserWithTokenResponse
  >;
  checkLocalIdDuplicate: HttpResponseResolver<never, LocalIdRequest, never>;
};

export const authResolver: AuthResolver = {
  sendCode: () => {
    // const ctx = { error: '잘못된 요청입니다.' };
    // return HttpResponse.json(ctx, { status: 401 });
    return HttpResponse.json(null, { status: 200 });
  },
  verfiyEmail: () => {
    return HttpResponse.json(null, { status: 200 });
  },
  signupGoogle: () => {
    const { id, username, isAdmin } = mockUser;
    const body = { user: { id, username, isAdmin }, accessToken: 'asdf' };
    return HttpResponse.json(body, { status: 200 });
  },
  signUpLocal: () => {
    const { id, username, isAdmin } = mockUser;
    const body = { user: { id, username, isAdmin }, accessToken: 'asdf' };
    return HttpResponse.json(body, { status: 200 });
  },
  checkLocalIdDuplicate: () => {
    return HttpResponse.json(null, { status: 200 });
  },
};
