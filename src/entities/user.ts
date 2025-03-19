export type UserRole = 'APPLICANT' | 'COMPANY';

export type User = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  userRole: UserRole;
  snuMail: string;
  phoneNumber?: string;
  profileImageLink?: string;
  isMerged: boolean;
};
