export type ResponseNecessary = {
  status: number;
  data: unknown;
};

// TODO: 200 이외의 코드가 내려왔을 때 대응 필요
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
