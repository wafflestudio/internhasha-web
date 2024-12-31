import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { Apis } from '@/shared/api';
import type { TokenLocalStorage } from '@/shared/token/localstorage';
import type { TokenState } from '@/shared/token/state';

export type AuthService = {
  localSignUp({
    name,
    email,
    phoneNumber,
    password,
  }: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): ServiceResponse<Omit<User, 'password'>>;
  localSignIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): ServiceResponse<{
    userResponse: Omit<User, 'password'>;
    accessToken: string;
    refreshToken: string;
  }>;
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
  localSignUp: async ({ name, email, phoneNumber, password }) => {
    const body = { name, email, phoneNumber, password, authProvider: 'LOCAL' };
    const { status, data } = await apis['POST /signup']({ body });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
  localSignIn: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const body = { email, password, authProvider: 'LOCAL' };
    const { status, data } = await apis['POST /signin']({ body });

    if (status === 200) {
      const token = data.accessToken;

      tokenLocalStorage.setToken({ token });
      tokenState.setToken({ token });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
});
