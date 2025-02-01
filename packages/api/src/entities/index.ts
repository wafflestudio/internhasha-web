export type ResponseNecessary = {
  status: number;
  data: unknown;
};

export type SuccessResponse<T, Status extends number = 200> = {
  status: Status;
  data: T;
};

export type ErrorResponse<
  Status extends number = 400 | 401 | 403 | 404 | 409 | 500,
> = {
  status: Status;
  data: {
    timestamp: string;
    message: string;
    code: string;
  };
};

export type ExternalCallParams = {
  method: string;
  path: string;
  body?: Record<string, unknown> | File;
  headers?: Record<string, string>;
  credentials?: string;
};

export type InternalCallParams = {
  method: string;
  path: string;
  contentType?: string;
  body?: Record<string, unknown> | File;
  token?: string;
};
