import { createContext } from 'react';

import type { AuthService } from '@/feature/auth';
import type { PostService } from '@/feature/post';
import type { UserService } from '@/feature/user';
import type { EchoService } from '@/service/echoService';
import type { ResumeService } from '@/service/resumeService';
import type { FileService } from '@/shared/file/fileService';

export type ServiceContext = {
  echoService: EchoService;
  authService: AuthService;
  postService: PostService;
  userService: UserService;
  resumeService: ResumeService;
  fileService: FileService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
