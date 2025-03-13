import type {
  ErrorResponse,
  InternalFileCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '../../entities';
import type { UploadFileRequest } from './schemas';

type GetApisProps = {
  callWithFile: <R extends ResponseNecessary>(
    p: InternalFileCallParams,
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

export const getExternalServerApis = ({ callWithFile }: GetApisProps) =>
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
      callWithFile<SuccessResponse<void>>({
        method: 'PUT',
        contentType,
        path,
        body,
      }),
  }) satisfies Record<string, Api>;
