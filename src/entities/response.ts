export type ServiceResponse<T> = T extends undefined
  ? Promise<{ type: 'success' }>
  : Promise<{ type: 'success'; data: T } | { type: 'error'; message: string }>;
