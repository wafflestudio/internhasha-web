export type ServiceResponse<T> = T extends undefined
  ? Promise<{ type: 'success' }>
  : Promise<
      | { type: 'success'; data: T }
      | {
          type: 'error';
          code: string;
          message: string;
        }
    >;
