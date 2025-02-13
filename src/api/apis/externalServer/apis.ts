import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '../../entities';
import type { UploadFileRequest } from './schemas';

type GetApisProps = {
  callWithoutToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: never },
  ) => Promise<R | ErrorResponse>;
};

type Api = (_: {
  path: string;
  body: never;
  token: string;
  contentType: never;
  params: never;
  query: never;
}) => Promise<{ status: number; data: unknown }>;

export const getExternalServerApis = ({ callWithoutToken }: GetApisProps) =>
  ({
    'PUT upload-file': ({
      path,
      body,
      contentType,
    }: {
      path: string;
      body: UploadFileRequest;
      contentType: string;
    }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'PUT',
        contentType,
        path,
        body,
      }),
  }) satisfies Record<string, Api>;
