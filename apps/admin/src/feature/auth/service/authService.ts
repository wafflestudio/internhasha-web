import type { Apis } from '@waffle/api';

import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { TokenLocalStorage } from '@/shared/token/tokenLocalStorageRepository';
import type { TokenState } from '@/shared/token/tokenStateRepository';

export type AuthService = {
  localSignIn({
    localId,
    password,
  }: {
    localId: string;
    password: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  reissueAccessToken(): ServiceResponse<{ accessToken: string }>;
  logout({ token }: { token: string }): ServiceResponse<void>;
};

export const implAuthService = ({
  apis,
  tokenLocalStorageRepository,
  tokenStateRepository,
}: {
  apis: Apis;
  tokenLocalStorageRepository: TokenLocalStorage;
  tokenStateRepository: TokenState;
}): AuthService => ({
  localSignIn: async ({ localId, password }) => {
    const { status, data } = await apis['POST /user/signin']({
      body: {
        authType: 'LOCAL',
        info: {
          localLoginId: localId,
          password,
        },
      },
    });

    if (status === 200) {
      const token = data.accessToken;

      tokenLocalStorageRepository.setToken({ token });
      tokenStateRepository.setToken({ token });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  reissueAccessToken: async () => {
    const { status, data } = await apis['POST /user/refresh-token']();

    if (status === 200) {
      const accessToken = data.accessToken;

      tokenLocalStorageRepository.setToken({ token: accessToken });
      tokenStateRepository.setToken({ token: accessToken });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  logout: async ({ token }) => {
    const { status, data } = await apis['POST /user/signout']({ token });
    tokenLocalStorageRepository.removeToken();
    tokenStateRepository.removeToken();
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
});
