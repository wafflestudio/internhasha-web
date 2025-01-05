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
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
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
  googleSignUp({
    email,
    token,
    authProvider,
  }: {
    email: string;
    token: string;
    authProvider: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  googleSignIn({
    googleAccessToken,
  }: {
    googleAccessToken: string;
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
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
    const { status, data } = await apis['POST /user/signup/local']({ body });

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
    const { status, data } = await apis['POST /user/signin/local']({ body });

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
  googleSignUp: async ({ email, token, authProvider }) => {
    const body = { email, token, authProvider };
    const { status, data } = await apis['POST /user/signup/google']({ body });

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
    const { status, data } = await apis['POST /user/signin/google']({ body });

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
