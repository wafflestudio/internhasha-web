import { getExternalServerApis, getLocalServerApis } from '@/api/apis';
import type {
  ErrorResponse,
  ExternalCallParams,
  ExternalFileCallParams,
  InternalCallParams,
  InternalFileCallParams,
  ResponseNecessary,
} from '@/api/entities';

type ImplApiProps = {
  externalCall(_: ExternalCallParams): Promise<ResponseNecessary>;
};

type ImplExternalApiProps = {
  externalFileCall(
    _: ExternalFileCallParams,
    returnFile: boolean,
  ): Promise<ResponseNecessary>;
};

export const implApi = ({ externalCall }: ImplApiProps) => {
  const internalCall = async <R extends ResponseNecessary>(content: {
    method: string;
    path: string;
    body?: Record<string, unknown>;
    token?: string;
  }) => {
    const response = await externalCall({
      method: content.method,
      path: content.path,
      body: content.body,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
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

  return getLocalServerApis({
    callWithToken,
    callWithoutToken,
    callWithOptionalToken,
  });
};

export const implExternalApi = ({ externalFileCall }: ImplExternalApiProps) => {
  const internalFileCall = async <R extends ResponseNecessary>(
    content: {
      method: string;
      path: string;
      contentType?: string;
      body?: Record<string, unknown> | File;
    },
    returnFile: boolean = false,
  ) => {
    const response = await externalFileCall(
      {
        method: content.method,
        path: content.path,
        body: content.body,
        headers: {
          ...(content.contentType !== undefined
            ? { 'content-type': content.contentType }
            : {}),
        },
      },
      returnFile,
    );

    return response as R;
  };
  const callWithFile = <R extends ResponseNecessary>(
    p: InternalFileCallParams,
    returnFile: boolean = false,
  ) => internalFileCall<R | ErrorResponse>(p, returnFile);

  return getExternalServerApis({ callWithFile });
};

export type Apis = ReturnType<typeof getLocalServerApis>;
export type ExternalApis = ReturnType<typeof getExternalServerApis>;
