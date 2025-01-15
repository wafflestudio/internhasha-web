import { createContext } from 'react';

import type { AuthService } from '@/feature/auth/service/authService';
import type { EchoService } from '@/feature/echo/service/echoService';

export type ServiceContext = {
  echoService: EchoService;
  authService: AuthService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
