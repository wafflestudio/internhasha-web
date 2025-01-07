import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '@/shared/api/entities/params';
import type {
  CheckLocalIdDuplicateRequest,
  EchoParams,
  EmailVerifyRequest,
  GoogleSignInRequest,
  GoogleSignUpRequest,
  LocalSignInRequest,
  LocalSignUpRequest,
  PostsResponse,
  PretotypeUserSubmitRequest,
  PretotypeUserSubmitResponse,
  SendEmailCodeRequest,
  UserWithTokenResponse,
} from '@/shared/api/entities/schemas';

type GetApisProps = {
  callWithToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token: string },
  ) => Promise<R | ErrorResponse>;
  callWithoutToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: never },
  ) => Promise<R | ErrorResponse>;
};

type Api = (_: {
  body: never;
  token: string;
  params: never;
  query: never;
}) => Promise<{ status: number; data: unknown }>;

export const getApis = ({ callWithToken, callWithoutToken }: GetApisProps) =>
  ({
    'GET /echo/:message': ({ params }: { params: EchoParams }) =>
      callWithoutToken<SuccessResponse<never>>({
        method: 'GET',
        path: `echo/${params.message}`,
      }),
    'POST /pretotype': ({ body }: { body: PretotypeUserSubmitRequest }) =>
      callWithoutToken<SuccessResponse<PretotypeUserSubmitResponse>>({
        method: 'POST',
        path: 'pretotype',
        body,
      }),
    'POST /user/signup/local': ({ body }: { body: LocalSignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/signup/local',
        body,
      }),
    'POST /user/signup/google': ({ body }: { body: GoogleSignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/signup/google',
        body,
      }),
    'POST /user/signin/local': ({ body }: { body: LocalSignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/signin/local',
        body,
      }),
    'POST /user/signin/google': ({ body }: { body: GoogleSignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/signin/google',
        body,
      }),
    'POST /user/signup/send-code': ({ body }: { body: SendEmailCodeRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/signup/send-code',
        body,
      }),
    'POST /user/signup/verify-email': ({
      body,
    }: {
      body: EmailVerifyRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/signup/verify-email',
        body,
      }),
    'POST /user/signup/id-duplicate': ({
      body,
    }: {
      body: CheckLocalIdDuplicateRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/signup/id-duplicate',
        body,
      }),
    'GET /pretotype/mock': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<PretotypeUserSubmitResponse[]>>({
        method: 'GET',
        path: 'pretotype/list',
        token,
      }),
    'GET /post': () =>
      callWithoutToken<SuccessResponse<PostsResponse[]>>({
        method: 'GET',
        path: 'post',
      }),
  }) satisfies Record<string, Api>;
