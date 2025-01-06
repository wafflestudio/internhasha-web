import { echoHandlers } from '@/mocks/echo/handlers';
import { postsHandlers } from '@/mocks/post/handlers.ts';

export const handlers = [...echoHandlers, ...postsHandlers];
