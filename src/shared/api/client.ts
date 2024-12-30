import { getApis } from '@/shared/api/api';
import type {
  ErrorResponse,
  ExternalCallParams,
  InternalCallParams,
  ResponseNecessary,
} from '@/shared/api/entities';

type ImplApiProps = {
  externalCall(_: ExternalCallParams): Promise<ResponseNecessary>;
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
          ? { 'x-access-token': content.token }
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
    p: InternalCallParams & { token?: string },
  ) => internalCall<R | ErrorResponse>(p);

  return getApis({ callWithToken, callWithoutToken });
};

export type Apis = ReturnType<typeof implApi>;
