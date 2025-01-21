import { createContext } from 'react';

import type { PostService } from '@/feature/post';
import type { AuthService } from '@/service/authService';
import type { EchoService } from '@/service/echoService';
import type { ResumeService } from '@/service/resumeService';
import type { UserService } from '@/service/userService';

export type ServiceContext = {
  echoService: EchoService;
  authService: AuthService;
  postService: PostService;
  userService: UserService;
  resumeService: ResumeService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
