import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { Apis } from '@/shared/api';
import type { TokenLocalStorage } from '@/shared/token/localstorage';
import type { TokenState } from '@/shared/token/state';

export type AuthService = {
  localSignUp({
    username,
    localId,
    password,
    snuMail,
  }: {
    username: string;
    snuMail: string;
    localId: string;
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
    snuMail,
    googleAccessToken,
  }: {
    snuMail: string;
    googleAccessToken: string;
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
  sendEmailCode({ snuMail }: { snuMail: string }): ServiceResponse<void>;
  verifyCode({
    snuMail,
    code,
  }: {
    snuMail: string;
    code: string;
  }): ServiceResponse<void>;
  checkLocalIdDuplicate({
    localId,
  }: {
    localId: string;
  }): ServiceResponse<void>;
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
  localSignUp: async ({ username, localId, password, snuMail }) => {
    const body = { username, localId, password, snuMail };
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
    return { type: 'error', status, message: data.error };
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
    return { type: 'error', status, message: data.error };
  },
  googleSignUp: async ({ snuMail, googleAccessToken }) => {
    const body = { snuMail, googleAccessToken };
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
    return { type: 'error', status, message: data.error };
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
    return { type: 'error', status, message: data.error };
  },
  sendEmailCode: async ({ snuMail }) => {
    const body = { snuMail };
    const { status, data } = await apis['POST /user/signup/send-code']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  verifyCode: async ({ code, snuMail }) => {
    const body = { snuMail, code };
    const { status, data } = await apis['POST /user/signup/verify-email']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  checkLocalIdDuplicate: async ({ localId }) => {
    const body = { localId };
    const { status, data } = await apis['POST /user/signup/id-duplicate']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
});
