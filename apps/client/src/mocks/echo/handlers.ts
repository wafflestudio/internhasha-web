import { http } from 'msw';

import { echoResolver } from '@/mocks/echo/resolvers';

export const echoHandlers = [
  http.post('*/api/pretotype', echoResolver.pretotypeAddUser),
];
