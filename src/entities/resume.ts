import type { User } from '@/entities/user';

export type Resume = {
  id: string;
  positionTitle: string;
  companyName: string;
  postId: string;
  author: Pick<
    User,
    'id' | 'name' | 'userRole' | 'snuMail' | 'phoneNumber' | 'profileImageLink'
  >;
  content: string;
  phoneNumber: string;
  createdAt: string;
};

export type ResumeListResponse = {
  resumeList: Resume[];
};

export type ResumeRequest = {
  phoneNumber: string;
  content: string;
};
