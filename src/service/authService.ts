import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { Apis } from '@/shared/api';
import type { TokenLocalStorage } from '@/shared/token/localstorage';
import type { TokenState } from '@/shared/token/state';

export type AuthService = {
  localSignIn({
    id,
    password,
  }: {
    id: string;
    password: string;
  }): ServiceResponse<User & { accessToken: string; refreshToken: string }>;
};

export const implAuthService = ({
  apis,
  tokenLocalStorage,
  tokenState,
}: {
  apis: Apis;
  tokenLocalStorage: TokenLocalStorage;
  tokenState: TokenState;
}): AuthService => ({
  localSignIn: async ({ id, password }) => {
    const body = { id, password };
    const { status, data } = await apis['POST /signup']({ body });

    if (status === 200) {
      const token = data.accessToken;

      tokenState.setToken({ token });
      tokenLocalStorage.setToken({ token });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
});
