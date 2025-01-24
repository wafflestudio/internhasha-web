import type { Post } from '@/entities/post';
import type { Resume } from '@/entities/resume';

type UserRole = 'NORMAL' | 'CURATOR';

export type User = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  userRole: UserRole;
  snuMail: string;
  phoneNumber?: string;
  resumes: Resume[];
  posts: Post[];
  profileImageLink: string;
  isMerged: boolean;
};
