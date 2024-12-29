import { http } from 'msw';

import { echoResolver } from '@/shared/mocks/resolvers/echoResolvers';

export const handlers = [
  http.post('/api/pretotype', echoResolver.pretotypeAddUser),
];
