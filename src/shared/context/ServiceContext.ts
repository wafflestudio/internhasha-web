import { createContext } from 'react';

import type { EchoService } from '@/feature/echo';

export type ServiceContext = {
  echoService: EchoService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
