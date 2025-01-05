import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '@/shared/api/entities/params';
import type {
  CompanyListResponse,
  EchoParams,
  LocalSignInRequest,
  LocalSignUpRequest,
  PretotypeUserSubmitRequest,
  PretotypeUserSubmitResponse,
  SocialSignInRequest,
  SocialSignUpRequest,
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
    'POST /signup': ({ body }: { body: LocalSignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'signup',
        body,
      }),
    'POST /signup/google': ({ body }: { body: SocialSignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'signin',
        body,
      }),
    'POST /signin': ({ body }: { body: LocalSignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'signin',
        body,
      }),
    'POST /signin/google': ({ body }: { body: SocialSignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'signin',
        body,
      }),
    'GET /pretotype/mock': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<PretotypeUserSubmitResponse[]>>({
        method: 'GET',
        path: 'pretotype/list',
        token,
      }),
    'GET /company-list': () =>
      callWithoutToken<SuccessResponse<CompanyListResponse[]>>({
        method: 'GET',
        path: 'company-list',
      }),
  }) satisfies Record<string, Api>;
