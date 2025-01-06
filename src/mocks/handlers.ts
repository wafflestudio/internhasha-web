import { authHandlers } from '@/mocks/auth/handlers';
import { echoHandlers } from '@/mocks/echo/handlers';

export const handlers = [...echoHandlers, ...authHandlers];
