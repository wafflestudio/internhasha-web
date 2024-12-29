import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '@/shared/api/entities/params';
import type {
  EchoParams,
  PretotypeUserSubmitDto,
  PretotypeUserSubmitRequest,
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
      callWithoutToken<SuccessResponse<PretotypeUserSubmitDto>>({
        method: 'POST',
        path: 'pretotype',
        body,
      }),
    'GET /pretotype/mock': ({ token }: { token: string }) =>
      callWithToken<SuccessResponse<PretotypeUserSubmitDto[]>>({
        method: 'GET',
        path: 'pretotype/list',
        token,
      }),
  }) satisfies Record<string, Api>;
