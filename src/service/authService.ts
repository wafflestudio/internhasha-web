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
  }): ServiceResponse<{
    userResponse: Omit<User, 'password'>;
    accessToken: string;
    refreshToken: string;
  }>;
  localSignIn({
    localId,
    password,
  }: {
    localId: string;
    password: string;
  }): ServiceResponse<{
    userResponse: Omit<User, 'password'>;
    accessToken: string;
    refreshToken: string;
  }>;
  socialSignUp({
    email,
    token,
    authProvider,
  }: {
    email: string;
    token: string;
    authProvider: string;
  }): ServiceResponse<{
    userResponse: Omit<User, 'password'>;
    accessToken: string;
    refreshToken: string;
  }>;
  googleSignIn({
    googleAccessToken,
  }: {
    googleAccessToken: string;
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
  localSignIn: async ({ localId, password }) => {
    const body = { localId, password };
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
  socialSignUp: async ({ email, token, authProvider }) => {
    const body = { email, token, authProvider };
    const { status, data } = await apis['POST /signup/google']({ body });

    if (status === 200) {
      const accessToken = data.accessToken;

      tokenLocalStorage.setToken({ token: accessToken });
      tokenState.setToken({ token: accessToken });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
  googleSignIn: async ({ googleAccessToken }) => {
    const body = { googleAccessToken };
    const { status, data } = await apis['POST /signin/google']({ body });

    if (status === 200) {
      const accessToken = data.accessToken;

      tokenLocalStorage.setToken({ token: accessToken });
      tokenState.setToken({ token: accessToken });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
});
