import { companyHandlers } from '@/mocks/company/handlers.ts';
import { echoHandlers } from '@/mocks/echo/handlers';

export const handlers = [...echoHandlers, ...companyHandlers];
