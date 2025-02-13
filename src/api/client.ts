import { getExternalServerApis, getLocalServerApis } from './apis';
import type {
  ErrorResponse,
  ExternalCallParams,
  InternalCallParams,
  ResponseNecessary,
} from './entities';

type ImplApiProps = {
  externalCall(_: ExternalCallParams): Promise<ResponseNecessary>;
};

export const implApi = ({ externalCall }: ImplApiProps) => {
  const internalCall = async <R extends ResponseNecessary>(content: {
    method: string;
    path: string;
    contentType?: string;
    body?: Record<string, unknown> | File;
    token?: string;
  }) => {
    const response = await externalCall({
      method: content.method,
      path: content.path,
      body: content.body,
      headers: {
        ...(content.contentType !== undefined
          ? { 'content-type': content.contentType }
          : { 'content-type': 'application/json;charset=UTF-8' }),
        ...(content.token !== undefined
          ? { Authorization: `Bearer ${content.token}` }
          : {}),
      },
      credentials: 'include',
    });

    return response as R;
  };

  const callWithToken = <R extends ResponseNecessary>(
    p: InternalCallParams & { token: string },
  ) => internalCall<R | ErrorResponse>(p);

  const callWithoutToken = <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: never },
  ) => internalCall<R | ErrorResponse>(p);

  const callWithOptionalToken = <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: string },
  ) => internalCall<R | ErrorResponse>(p);

  return {
    ...getLocalServerApis({
      callWithToken,
      callWithoutToken,
      callWithOptionalToken,
    }),
    ...getExternalServerApis({ callWithoutToken }),
  };
};

export type Apis = ReturnType<typeof getLocalServerApis>;
export type ExternalApis = ReturnType<typeof getExternalServerApis>;
