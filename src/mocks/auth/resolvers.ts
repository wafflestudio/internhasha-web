import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockUser } from '@/mocks/auth/data';
import type {
  AccessTokenResponse,
  EmailVerifyRequest,
  GoogleSignUpRequest,
  LocalIdRequest,
  LocalSignUpRequest,
  MockResponse,
  SendEmailCodeRequest,
  UserWithTokenResponse,
} from '@/mocks/auth/schemas';

type AuthResolver = {
  sendCode: HttpResponseResolver<never, SendEmailCodeRequest, never>;
  verfiyEmail: HttpResponseResolver<never, EmailVerifyRequest, never>;
  signupGoogle: HttpResponseResolver<
    never,
    GoogleSignUpRequest,
    MockResponse<UserWithTokenResponse>
  >;
  signUpLocal: HttpResponseResolver<
    never,
    LocalSignUpRequest,
    UserWithTokenResponse
  >;
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
  signupGoogle: async ({ request }) => {
    const { snuMail } = await request.json();

    if (snuMail === 'ywk0524@snu.ac.kr') {
      return HttpResponse.json(
        { error: '동일한 스누메일로 등록된 계정이 존재합니다.' },
        { status: 409 },
      );
    }

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
  reissueToken: () => {
    const body = {
      accessToken: 'asdf',
    };
    return HttpResponse.json(body, { status: 200 });
  },
};
