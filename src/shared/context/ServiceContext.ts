import { createContext } from 'react';

import type { AuthService } from '@/service/authService';
import type { EchoService } from '@/service/echoService';
import type { PostService } from '@/service/postService.ts';

export type ServiceContext = {
  echoService: EchoService;
  authService: AuthService;
  postService: PostService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
