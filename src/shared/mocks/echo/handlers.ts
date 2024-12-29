import { http } from 'msw';

import { echoResolver } from '@/shared/mocks/echo/resolvers';

export const echoHandlers = [
  http.post('/api/pretotype', echoResolver.pretotypeAddUser),
];
