import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockUser } from '@/mocks/auth/data';
import type {
  AccessTokenResponse,
  EmailVerifyRequest,
  LocalIdRequest,
  SendEmailCodeRequest,
  UserWithTokenResponse,
} from '@/mocks/auth/schemas';

type AuthResolver = {
  sendCode: HttpResponseResolver<never, SendEmailCodeRequest, never>;
  verfiyEmail: HttpResponseResolver<never, EmailVerifyRequest, never>;
  signInLocal: HttpResponseResolver<never, never, UserWithTokenResponse>;
  checkLocalIdDuplicate: HttpResponseResolver<never, LocalIdRequest, never>;
  reissueToken: HttpResponseResolver<never, never, AccessTokenResponse>;
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
  signInLocal: () => {
    return HttpResponse.json(mockUser, { status: 200 });
  },
  checkLocalIdDuplicate: () => {
    return HttpResponse.json(null, { status: 200 });
  },
  reissueToken: () => {
    const body = {
      accessToken: 'asdf',
    };
    return HttpResponse.json(body, { status: 200 });
  },
};
