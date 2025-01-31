import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from "../../entities";
import type {
  AccessTokenRequest,
  BookmarkPageParams,
  CompanyIdParams,
  CreateAndUpdatePostRequest,
  CreateCompanyRequest,
  CreatePostRequest,
  CreateResumeRequest,
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
        path: "user/snu-mail-verification/google-email",
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
    "GET /user/me": ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<UserResponse>>({
        method: "GET",
        path: "user/me",
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
      body: CreateResumeRequest;
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
    "POST /post/upload/presigned": ({
      token,
      body,
    }: {
      token: string;
      body: FileUploadRequest;
    }) => {
      return callWithToken<SuccessResponse<PresignedUrlResponse>>({
        method: "POST",
        path: "post/upload/presigned",
        token,
        body,
      });
    },
    "POST /post/:postId/bookmark": ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: "POST",
        path: `post/${params.postId}/bookmark`,
        token,
      });
    },
    "GET /post/bookmarks": ({
      token,
      params,
    }: {
      token: string;
      params: BookmarkPageParams;
    }) => {
      if (params.bookmarkPage === undefined) {
        return callWithToken<SuccessResponse<PostsResponse>>({
          method: "GET",
          path: `post/bookmarks`,
          token,
        });
      }
      return callWithToken<SuccessResponse<PostsResponse>>({
        method: "GET",
        path: `post/bookmarks?${params.bookmarkPage}`,
        token,
      });
    },
    "DELETE /post/:postId/bookmark": ({
      token,
      params,
    }: {
      token: string;
      params: PostIdParams;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: "DELETE",
        path: `post/${params.postId}/bookmark`,
        token,
      });
    },
    "POST /post/company": ({
      token,
      body,
    }: {
      token: string;
      body: CreateCompanyRequest;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: "POST",
        path: "post/company",
        token,
        body,
      });
    },
    "POST /post/company/:companyId/position": ({
      token,
      params,
      body,
    }: {
      token: string;
      params: CompanyIdParams;
      body: CreatePostRequest;
    }) => {
      return callWithToken<SuccessResponse<void>>({
        method: "POST",
        path: `post/company/${params.companyId}/position`,
        token,
        body,
      });
    },
  }) satisfies Record<string, Api>;
