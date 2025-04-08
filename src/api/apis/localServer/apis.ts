import type {
  ApplicantResponse,
  BookmarkPageParams,
  ChangePasswordRequest,
  CheckSnuMailVerificationRequest,
  CoffeeChatApplicant,
  CoffeeChatCountResponse,
  CoffeeChatDetailList,
  CoffeeChatIdParams,
  CoffeeChatListResponse,
  CoffeeChatResponse,
  CoffeeChatStatusRequest,
  CompanyResponse,
  CreateAndUpdatePostRequest,
  CreateCoffeeChatRequest,
  CreateCompanyRequest,
  CreatePositionRequest,
  MailRequest,
  PositionRespone,
  PostBriefDTO,
  PostDetailResponse,
  PostIdParams,
  PostPathParams,
  PostsResponse,
  PutApplicantRequest,
  S3DownloadParams,
  S3DownloadResp,
  S3UploadReq,
  S3UploadResp,
  SignInRequest,
  SignUpRequest,
  SnuMailRequest,
  TokenResponse,
  UserResponse,
  UserWithTokenResponse,
} from '@/api/apis/localServer/schemas';
import { encodeQueryParams } from '@/api/apis/utils/queryEncodeUtil';
import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '@/api/entities';

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

export const getLocalServerApis = ({
  callWithToken,
  callWithoutToken,
  callWithOptionalToken,
}: GetApisProps) =>
  ({
    'POST /auth/user': ({ body }: { body: SignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'auth/user',
        body,
      }),
    'DELETE /auth/user': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<void>>({
        method: 'DELETE',
        path: 'auth/user',
        token,
      }),
    'POST /auth/user/session': ({ body }: { body: SignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'auth/user/session',
        body,
      }),
    'DELETE /auth/user/session': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<void>>({
        method: 'DELETE',
        path: 'auth/user/session',
        token,
      }),
    'GET /auth/token': () =>
      callWithoutToken<SuccessResponse<TokenResponse>>({
        method: 'GET',
        path: 'auth/token',
      }),
    'POST /auth/mail': ({ body }: { body: MailRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'auth/mail',
        body,
      }),
    'POST /auth/mail/verify': ({ body }: { body: SnuMailRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'auth/mail/verify',
        body,
      }),
    'POST /auth/mail/validate': ({
      body,
    }: {
      body: CheckSnuMailVerificationRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'auth/mail/validate',
        body,
      }),
    'PATCH /auth/password': ({
      token,
      body,
    }: {
      token: string;
      body: ChangePasswordRequest;
    }) =>
      callWithToken<SuccessResponse<void>>({
        method: 'PATCH',
        path: 'auth/password',
        body,
        token,
      }),
    'POST /auth/password': ({ body }: { body: MailRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'auth/password',
        body,
      }),
    'GET /user/me': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<UserResponse>>({
        method: 'GET',
        path: 'user/me',
        token,
      }),
    'GET /post': ({
      params,
      token,
    }: {
      params: PostPathParams;
      token?: string;
    }) => {
      const queryParameters = encodeQueryParams({ params });

      return callWithOptionalToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post?${queryParameters}`,
        token,
      });
    },
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
    'POST /admin/post': ({
      token,
      body,
    }: {
      token: string;
      body: CreateAndUpdatePostRequest;
    }) =>
      callWithToken<SuccessResponse<PostDetailResponse>>({
        method: 'POST',
        path: 'admin/post',
        token,
        body,
      }),
    'PATCH /admin/post/:postId': ({
      token,
      params,
      body,
    }: {
      token: string;
      params: PostIdParams;
      body: CreateAndUpdatePostRequest;
    }) =>
      callWithToken<SuccessResponse<PostDetailResponse>>({
        method: 'PATCH',
        path: `admin/post/${params.postId}`,
        token,
        body,
      }),
    'GET /coffeeChat/:postId/status': ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<{ isSubmitted: boolean }>>({
        method: 'GET',
        path: `coffeeChat/${params.postId}/status`,
        token,
      });
    },
    'GET /coffeeChat/:coffeeChatId': ({
      token,
      params,
    }: {
      token: string;
      params: CoffeeChatIdParams;
    }) => {
      return callWithToken<SuccessResponse<CoffeeChatResponse>>({
        method: 'GET',
        path: `coffeeChat/${params.coffeeChatId}`,
        token,
      });
    },
    'GET /coffeeChat/count': ({ token }: { token: string }) => {
      return callWithToken<SuccessResponse<CoffeeChatCountResponse>>({
        method: 'GET',
        path: 'coffeeChat/count',
        token,
      });
    },
    'PATCH /coffeeChat': ({
      token,
      body,
    }: {
      token: string;
      body: CoffeeChatStatusRequest;
    }) => {
      return callWithToken<SuccessResponse<CoffeeChatDetailList>>({
        method: 'PATCH',
        path: `coffeeChat`,
        token,
        body,
      });
    },
    'GET /coffeeChat': ({ token }: { token: string }) => {
      return callWithToken<SuccessResponse<CoffeeChatListResponse>>({
        method: 'GET',
        path: 'coffeeChat',
        token,
      });
    },
    'POST /coffeeChat/:postId': ({
      token,
      params,
      body,
    }: {
      token: string;
      params: PostIdParams;
      body: CreateCoffeeChatRequest;
    }) => {
      return callWithToken<SuccessResponse<CoffeeChatApplicant>>({
        method: 'POST',
        path: `coffeeChat/${params.postId}`,
        token,
        body,
      });
    },
    'DELETE /coffeeChat/:coffeeChatId': ({
      token,
      params,
    }: {
      token: string;
      params: CoffeeChatIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'DELETE',
        path: `coffeeChat/${params.coffeeChatId}`,
        token,
      });
    },
    'POST /s3': ({ token, body }: { token: string; body: S3UploadReq }) => {
      return callWithToken<SuccessResponse<S3UploadResp>>({
        method: 'POST',
        path: 's3',
        token,
        body,
      });
    },
    'GET /s3': ({
      token,
      params,
    }: {
      token: string;
      params: S3DownloadParams;
    }) => {
      const queryParameters = encodeQueryParams({ params });
      return callWithToken<SuccessResponse<S3DownloadResp>>({
        method: 'GET',
        path: `s3?${queryParameters}`,
        token,
      });
    },
    'POST /post/:postId/bookmark': ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'POST',
        path: `post/${params.postId}/bookmark`,
        token,
      });
    },
    'GET /post/bookmarks': ({
      token,
      params,
    }: {
      token: string;
      params: BookmarkPageParams;
    }) => {
      if (params.bookmarkPage === undefined) {
        return callWithToken<SuccessResponse<PostsResponse>>({
          method: 'GET',
          path: `post/bookmarks`,
          token,
        });
      }
      return callWithToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post/bookmarks?${new URLSearchParams({ pages: params.bookmarkPage })}`,
        token,
      });
    },
    'DELETE /post/:postId/bookmark': ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'DELETE',
        path: `post/${params.postId}/bookmark`,
        token,
      });
    },
    'GET /company/me': ({ token }: { token: string }) => {
      return callWithToken<SuccessResponse<CompanyResponse>>({
        method: 'GET',
        path: 'company/me',
        token,
      });
    },
    'PUT /company/me': ({
      token,
      body,
    }: {
      token: string;
      body: CreateCompanyRequest;
    }) => {
      return callWithToken<SuccessResponse<CompanyResponse>>({
        method: 'PUT',
        path: 'company/me',
        token,
        body,
      });
    },
    'POST /post/position': ({
      token,
      body,
    }: {
      token: string;
      body: CreatePositionRequest;
    }) => {
      return callWithToken<SuccessResponse<PositionRespone>>({
        method: 'POST',
        path: `post/position`,
        token,
        body,
      });
    },
    'PUT /post/position/:positionId': ({
      token,
      body,
      params,
    }: {
      token: string;
      body: CreatePositionRequest;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<PositionRespone>>({
        method: 'PUT',
        path: `post/position/${params.postId}`,
        token,
        body,
      });
    },
    'PATCH /post/position/:positionId/close': ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'PATCH',
        path: `post/position/${params.postId}/close`,
        token,
      });
    },
    'GET /post/company/me': ({ token }: { token: string }) => {
      return callWithToken<SuccessResponse<PostBriefDTO[]>>({
        method: 'GET',
        path: 'post/company/me',
        token,
      });
    },
    'GET /post/position/me': ({
      token,
      params,
    }: {
      token: string;
      params: PostPathParams;
    }) => {
      const queryParameters = encodeQueryParams({ params });

      return callWithToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post/position/me?${queryParameters}`,
        token,
      });
    },
    'GET /applicant/me': ({ token }: { token: string }) => {
      return callWithToken<SuccessResponse<ApplicantResponse>>({
        method: 'GET',
        path: `applicant/me`,
        token,
      });
    },
    'PUT /applicant/me': ({
      token,
      body,
    }: {
      token: string;
      body: PutApplicantRequest;
    }) => {
      return callWithToken<SuccessResponse<ApplicantResponse>>({
        method: 'PUT',
        path: `applicant/me`,
        token,
        body,
      });
    },
  }) satisfies Record<string, Api>;
