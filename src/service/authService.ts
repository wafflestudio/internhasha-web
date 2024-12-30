import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { Apis } from '@/shared/api';

export type AuthService = {
  localSignIn({
    id,
    password,
  }: {
    id: string;
    password: string;
  }): ServiceResponse<User & { accessToken: string; refreshToken: string }>;
};

export const implAuthService = ({ apis }: { apis: Apis }): AuthService => ({
  localSignIn: async ({ id, password }) => {
    const body = { id, password };
    const { status, data } = await apis['POST /signup']({ body });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
});
