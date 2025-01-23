import { createContext } from 'react';

import type { AuthService } from '@/feature/auth';
import type { PostService } from '@/feature/post';
import type { ResumeService } from '@/feature/resume';
import type { UserService } from '@/feature/user';
import type { FileService } from '@/shared/file/fileService';

export type ServiceContext = {
  authService: AuthService;
  postService: PostService;
  userService: UserService;
  resumeService: ResumeService;
  fileService: FileService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
