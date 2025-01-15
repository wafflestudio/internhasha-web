import { createContext } from 'react';

import type { AuthService } from '@/feature/auth/service/authService';
import type { EchoService } from '@/feature/echo/service/echoService';
import type { UserService } from '@/feature/user';

export type ServiceContext = {
  echoService: EchoService;
  authService: AuthService;
  userService: UserService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
