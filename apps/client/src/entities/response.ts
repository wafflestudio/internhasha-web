export type ServiceResponse<T> = T extends undefined
  ? Promise<{ type: 'success' }>
  : Promise<
      | { type: 'success'; data: T }
      | {
          type: 'error';
          status: 400 | 401 | 403 | 404 | 409 | 500;
          message: string;
        }
    >;
