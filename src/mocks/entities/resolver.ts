import type { DefaultBodyType, StrictResponse } from 'msw';

export type Resolver<
  TRequest extends DefaultBodyType,
  TResponse extends DefaultBodyType,
> = (params: {
  request: { json: () => Promise<TRequest> };
}) => Promise<StrictResponse<TResponse>>;
