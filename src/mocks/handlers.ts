import { applicantHandlers } from '@/mocks/applicant/handlers';
import { authHandlers } from '@/mocks/auth/handlers';
import { coffeeChatHandlers } from '@/mocks/coffeeChat/handlers';
import { echoHandlers } from '@/mocks/echo/handlers';
import { postsHandlers } from '@/mocks/post/handlers';

export const handlers = [
  ...echoHandlers,
  ...authHandlers,
  ...postsHandlers,
  ...coffeeChatHandlers,
  ...applicantHandlers,
];
