import { authHandlers } from '@/mocks/auth/handlers';
import { echoHandlers } from '@/mocks/echo/handlers';
import { postsHandlers } from '@/mocks/post/handlers';

export const handlers = [...echoHandlers, ...authHandlers, ...postsHandlers];
