import { authHandlers } from '@/mocks/auth/handlers';
import { echoHandlers } from '@/mocks/echo/handlers';
import { postsHandlers } from '@/mocks/post/handlers';
import { resumeHandlers } from '@/mocks/resume/handlers';

export const handlers = [
  ...echoHandlers,
  ...authHandlers,
  ...postsHandlers,
  ...resumeHandlers,
];
