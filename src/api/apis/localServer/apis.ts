import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '../../entities';
import type {
  AccessTokenRequest,
  BookmarkPageParams,
  CoffeeChatIdParams,
  CoffeeChatListResponse,
  CoffeeChatResponse,
  CreateAndUpdatePostRequest,
  CreateCoffeeChatRequest,
  CreateCompanyRequest,
  CreatePostRequest,
  EchoParams,
  EmailVerifyRequest,
  FileUploadRequest,
  GoogleEmailResponse,
  IdRequest,
  PositionRespone,
  PostBriefDTO,
  PostDetailResponse,
  PostIdParams,
  PostPathParams,
  PostsResponse,
  PresignedUrlResponse,
  PretotypeUserSubmitRequest,
  PretotypeUserSubmitResponse,
  SignInRequest,
  SignUpRequest,
  SnuMailRequest,
  TokenResponse,
  UserResponse,
  UserWithTokenResponse,
} from './schemas';

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
    'POST /user/signup': ({ body }: { body: SignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/signup',
        body,
      }),
    'POST /user/snu-mail-verification/google-email': ({
      body,
    }: {
      body: AccessTokenRequest;
    }) =>
      callWithoutToken<SuccessResponse<GoogleEmailResponse>>({
        method: 'POST',
        path: 'user/snu-mail-verification/google-email',
        body,
      }),
    'POST /user/snu-mail-verification/request': ({
      body,
    }: {
      body: SnuMailRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/snu-mail-verification/request',
        body,
      }),
    'POST /user/snu-mail-verification/verify': ({
      body,
    }: {
      body: EmailVerifyRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/snu-mail-verification/verify',
        body,
      }),
    'POST /user/help/find-Id': ({
      body,
    }: {
      body: SnuMailRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/help/find-Id',
        body,
      }),
    'POST /user/help/reset-password': ({
      body,
    }: {
      body: SnuMailRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/help/reset-password',
        body,
      }),
    'POST /user/signin': ({ body }: { body: SignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: 'POST',
        path: 'user/signin',
        body,
      }),
    'POST /user/signup/check-id': ({ body }: { body: IdRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/signup/check-id',
        body,
      }),
    'POST /user/refresh-token': () =>
      callWithoutToken<SuccessResponse<TokenResponse>>({
        method: 'POST',
        path: 'user/refresh-token',
      }),
    'POST /user/signout': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/signout',
        token,
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
    }) =>
      callWithOptionalToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post?${params.postPath}`,
        token,
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
      return callWithToken<SuccessResponse<CoffeeChatResponse>>({
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
    'POST /post/upload/presigned': ({
      token,
      body,
    }: {
      token: string;
      body: FileUploadRequest;
    }) => {
      return callWithToken<SuccessResponse<PresignedUrlResponse>>({
        method: 'POST',
        path: 'post/upload/presigned',
        token,
        body,
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
        path: `post/bookmarks?${params.bookmarkPage}`,
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
    'POST /post/company': ({
      token,
      body,
    }: {
      token: string;
      body: CreateCompanyRequest;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'post/company',
        token,
        body,
      });
    },
    'POST /post/position': ({
      token,
      body,
    }: {
      token: string;
      body: CreatePostRequest;
    }) => {
      return callWithToken<SuccessResponse<PositionRespone>>({
        method: 'POST',
        path: `post/position`,
        token,
        body,
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
      return callWithToken<SuccessResponse<PostsResponse>>({
        method: 'GET',
        path: `post/position/me?${params.postPath}`,
        token,
      });
    },
  }) satisfies Record<string, Api>;
