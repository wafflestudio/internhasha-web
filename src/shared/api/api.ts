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
  GoogleEmailResponse,
  GoogleSignInRequest,
  GoogleSignUpRequest,
  LocalSignInRequest,
  LocalSignUpRequest,
  PostDetailResponse,
  PostIdParams,
  PostPathParams,
  PostsResponse,
  PretotypeUserSubmitRequest,
  PretotypeUserSubmitResponse,
  SendEmailCodeRequest,
  TokenResponse,
  UserResponse,
  UserWithTokenResponse,
} from '@/shared/api/entities/schemas';

type GetApisProps = {
  callWithToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token: string },
  ) => Promise<R | ErrorResponse>;
  callWithoutToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: never },
  ) => Promise<R | ErrorResponse>;
  callWithOptionalToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: string },
  ) => Promise<R | ErrorResponse>;
};

type Api = (_: {
  body: never;
  token: string;
  params: never;
  query: never;
}) => Promise<{ status: number; data: unknown }>;

export const getApis = ({
  callWithToken,
  callWithoutToken,
  callWithOptionalToken,
}: GetApisProps) =>
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
    'POST /user/signup/google-email': ({
      body,
    }: {
      body: GoogleSignInRequest;
    }) =>
      callWithoutToken<SuccessResponse<GoogleEmailResponse>>({
        method: 'POST',
        path: 'user/signup/google-email',
        body,
      }),
    'POST /user/google': ({ body }: { body: GoogleSignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/google',
        body,
      }),
    'POST /user/local': ({ body }: { body: LocalSignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/local',
        body,
      }),
    'POST /user/token/refresh': () =>
      callWithoutToken<SuccessResponse<TokenResponse>>({
        method: 'POST',
        path: 'user/token/refresh',
      }),
    'POST /user/logout': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/logout',
        token,
      }),
    'GET /user/info': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<UserResponse>>({
        method: 'GET',
        path: 'user/info',
        token,
      }),
    'GET /post': ({ params }: { params: PostPathParams }) =>
      callWithoutToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post?${params.postPath}`,
      }),
    'GET /post/:postId': ({
      token,
      params,
    }: {
      token?: string;
      params: PostIdParams;
    }) =>
      callWithOptionalToken<SuccessResponse<PostDetailResponse>>({
        method: 'GET',
        path: `post/${params.postId}`,
        token,
      }),
    'POST /admin/post': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<PostDetailResponse>>({
        method: 'POST',
        path: 'admin/post',
        token,
      }),
    'PATCH /admin/post/:postId': ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) =>
      callWithToken<SuccessResponse<PostDetailResponse>>({
        method: 'PATCH',
        path: `admin/post/${params.postId}`,
        token,
      }),
  }) satisfies Record<string, Api>;
