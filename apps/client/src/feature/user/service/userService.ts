import type { Apis } from '@waffle/api';

import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';

export type UserService = {
  getMyInfo({
    token,
  }: {
    token: string;
  }): ServiceResponse<Omit<User, 'localId'>>;
};

export const implUserService = ({ apis }: { apis: Apis }): UserService => ({
  getMyInfo: async ({ token }) => {
    const { status, data } = await apis['GET /user/info']({ token });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
});
