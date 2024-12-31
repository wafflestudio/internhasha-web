export type ResponseNecessary = {
  status: number;
  data: unknown;
};

export type SuccessResponse<T, Status extends number = 200> = {
  status: Status;
  data: T;
};

export type ErrorResponse<Status extends number = 400 | 401 | 403 | 404 | 500> =
  {
    status: Status;
    data: {
      error: string;
    };
  };

export type ExternalCallParams = {
  method: string;
  path: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  credentials?: string;
};

export type InternalCallParams = {
  method: string;
  path: string;
  body?: Record<string, unknown>;
  token?: string;
};
