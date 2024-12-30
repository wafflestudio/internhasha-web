import { createContext } from 'react';

import type { AuthService } from '@/service/authService';
import type { EchoService } from '@/service/echoService';

export type ServiceContext = {
  echoService: EchoService;
  authService: AuthService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
