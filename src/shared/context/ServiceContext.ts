import { createContext } from 'react';

import type { ApplicantService } from '@/feature/applicant';
import type { AuthService } from '@/feature/auth';
import type { CoffeeChatService } from '@/feature/coffeeChat';
import type { CompanyService } from '@/feature/company';
import type { PostService } from '@/feature/post';
import type { FileService } from '@/shared/file/fileService';
import type { StorageService } from '@/shared/storage/implStorageService';

export type ServiceContext = {
  authService: AuthService;
  postService: PostService;
  coffeeChatService: CoffeeChatService;
  fileService: FileService;
  applicantService: ApplicantService;
  companyService: CompanyService;
  storageService: StorageService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
