import { createContext } from 'react';

import type { ApplicantService } from '@/feature/applicant/service/applicantService';
import type { AuthService } from '@/feature/auth';
import type { CoffeeChatService } from '@/feature/coffeeChat';
import type { LandingService } from '@/feature/landing/service/landingService';
import type { PostService } from '@/feature/post';
import type { UserService } from '@/feature/user';
import type { VentureCapitalService } from '@/feature/ventureCapital/service/ventureCapitalService';
import type { FileService } from '@/shared/file/fileService';

export type ServiceContext = {
  authService: AuthService;
  postService: PostService;
  userService: UserService;
  coffeeChatService: CoffeeChatService;
  fileService: FileService;
  landingService: LandingService;
  ventureCapitalService: VentureCapitalService;
  applicantService: ApplicantService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
