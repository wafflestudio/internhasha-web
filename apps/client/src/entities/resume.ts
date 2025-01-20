import type { User } from '@/entities/user';

export type Resume = {
  id: string;
  postId: string;
  author: Omit<User, 'localId'>;
  content: string;
  phoneNumber: string;
  createdAt: string;
};
