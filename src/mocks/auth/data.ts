import type { UserWithTokenResponse } from '@/mocks/auth/schemas';

export const mockUser: UserWithTokenResponse = {
  user: {
    id: 'asdf',
    userRole: 'COMPANY',
  },
  accessToken: 'asdf',
};
