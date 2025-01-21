import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from "../../entities";
import type {
  AccessTokenRequest,
  ApplyCoffeeChatRequest,
  CreateAndUpdatePostRequest,
  EchoParams,
  EmailVerifyRequest,
  FileUploadRequest,
  GoogleEmailResponse,
  IdRequest,
  PostDetailResponse,
  PostIdParams,
  PostPathParams,
  PostsResponse,
  PresignedUrlResponse,
  PretotypeUserSubmitRequest,
  PretotypeUserSubmitResponse,
  ResumeIdParams,
  ResumeListResponse,
  ResumeResponse,
  SignInRequest,
  SignUpRequest,
  SnuMailRequest,
  TokenResponse,
  UserResponse,
  UserWithTokenResponse,
} from "./schemas";

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
    "GET /echo/:message": ({ params }: { params: EchoParams }) =>
      callWithoutToken<SuccessResponse<never>>({
        method: "GET",
        path: `echo/${params.message}`,
      }),
    "POST /pretotype": ({ body }: { body: PretotypeUserSubmitRequest }) =>
      callWithoutToken<SuccessResponse<PretotypeUserSubmitResponse>>({
        method: "POST",
        path: "pretotype",
        body,
      }),
    "POST /user/signup": ({ body }: { body: SignUpRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: "POST",
        path: "user/signup",
        body,
      }),
    "POST /user/snu-mail-verification/google-email": ({
      body,
    }: {
      body: AccessTokenRequest;
    }) =>
      callWithoutToken<SuccessResponse<GoogleEmailResponse>>({
        method: "POST",
        path: "user/snu—mail-verification/google-email",
        body,
      }),
    "POST /user/snu-mail-verification/request": ({
      body,
    }: {
      body: SnuMailRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: "POST",
        path: "user/snu-mail-verification/request",
        body,
      }),
    "POST /user/snu-mail-verification/verify": ({
      body,
    }: {
      body: EmailVerifyRequest;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: "POST",
        path: "user/snu-mail-verification/verify",
        body,
      }),
    "POST /user/signin": ({ body }: { body: SignInRequest }) =>
      callWithoutToken<SuccessResponse<UserWithTokenResponse>>({
        method: "POST",
        path: "user/signin",
        body,
      }),
    "POST /user/signup/check-id": ({ body }: { body: IdRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: "POST",
        path: "user/signup/check-id",
        body,
      }),
    "POST /user/refresh-token": () =>
      callWithoutToken<SuccessResponse<TokenResponse>>({
        method: "POST",
        path: "user/refresh-token",
      }),
    "POST /user/signout": ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<void>>({
        method: "POST",
        path: "user/signout",
        token,
      }),
    "GET /user/info": ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<UserResponse>>({
        method: "GET",
        path: "user/info",
        token,
      }),
    "GET /post": ({ params }: { params: PostPathParams }) =>
      callWithoutToken<SuccessResponse<PostsResponse>>({
        method: "GET",
        path: `post?${params.postPath}`,
      }),
    "GET /post/:postId": ({
      token,
      params,
    }: {
      token?: string;
      params: PostIdParams;
    }) =>
      callWithOptionalToken<SuccessResponse<PostDetailResponse>>({
        method: "GET",
        path: `post/${params.postId}`,
        token,
      }),
    "POST /admin/post": ({
      token,
      body,
    }: {
      token: string;
      body: CreateAndUpdatePostRequest;
    }) =>
      callWithToken<SuccessResponse<PostDetailResponse>>({
        method: "POST",
        path: "admin/post",
        token,
        body,
      }),
    "PATCH /admin/post/:postId": ({
      token,
      params,
      body,
    }: {
      token: string;
      params: PostIdParams;
      body: CreateAndUpdatePostRequest;
    }) =>
      callWithToken<SuccessResponse<PostDetailResponse>>({
        method: "PATCH",
        path: `admin/post/${params.postId}`,
        token,
        body,
      }),
    "GET /resume/:resumeId": ({
      token,
      params,
    }: {
      token: string;
      params: ResumeIdParams;
    }) => {
      return callWithToken<SuccessResponse<ResumeResponse>>({
        method: "GET",
        path: `resume/${params.resumeId}`,
        token,
      });
    },
    "GET /resume": ({ token }: { token: string }) => {
      return callWithToken<SuccessResponse<ResumeListResponse>>({
        method: "GET",
        path: "resume",
        token,
      });
    },
    "POST /resume/:postId": ({
      token,
      params,
      body,
    }: {
      token: string;
      params: PostIdParams;
      body: ApplyCoffeeChatRequest;
    }) => {
      return callWithToken<SuccessResponse<ResumeResponse>>({
        method: "POST",
        path: `resume/${params.postId}`,
        token,
        body,
      });
    },
    "DELETE /resume/:resumeId": ({
      token,
      params,
    }: {
      token: string;
      params: ResumeIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: "DELETE",
        path: `resume/${params.resumeId}`,
        token,
      });
    },
    "POST /admin/post/upload/presigned": ({
      token,
      body,
    }: {
      token: string;
      body: FileUploadRequest;
    }) => {
      return callWithToken<SuccessResponse<PresignedUrlResponse>>({
        method: "POST",
        path: "admin/post/upload/presigned",
        token,
        body,
      });
    },
  }) satisfies Record<string, Api>;
