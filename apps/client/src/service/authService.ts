import type { Apis } from '@waffle/api';

import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { TokenLocalStorage } from '@/shared/token/localstorage';
import type { TokenState } from '@/shared/token/state';

export type AuthService = {
  signUp({
    authType,
    info,
  }: {
    authType: 'LOCAL_APPLICANT' | 'SOCIAL_APPLICANT';
    info:
      | {
          name: string;
          localLoginId: string;
          snuMail: string;
          password: string;
        }
      | {
          provider: 'google';
          snuMail: string;
          token: string;
        };
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  signIn({
    authType,
    info,
  }: {
    authType: 'LOCAL' | 'SOCIAL';
    info:
      | {
          localLoginId: string;
          password: string;
        }
      | {
          provider: 'google';
          token: string;
        };
  }): ServiceResponse<{
    user: Pick<User, 'id' | 'username' | 'isAdmin'>;
    accessToken: string;
  }>;
  checkGoogleEmail({
    token,
  }: {
    token: string;
  }): ServiceResponse<{ googleEmail: string }>;
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
  reissueAccessToken(): ServiceResponse<{ accessToken: string }>;
  logout({ token }: { token: string }): ServiceResponse<void>;
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
  signUp: async ({ authType, info }) => {
    const body = { authType, info };
    const { status, data } = await apis['POST /user/signup']({ body });

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
  signIn: async ({ authType, info }) => {
    const body = { authType, info };
    const { status, data } = await apis['POST /user/signin']({ body });

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
  sendEmailCode: async ({ snuMail }) => {
    const body = { snuMail };
    const { status, data } = await apis[
      'POST /user/snu-mail-verification/request'
    ]({
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
    const { status, data } = await apis[
      'POST /user/snu-mail-verification/verify'
    ]({
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
    const body = { id: localId };
    const { status, data } = await apis['POST /user/signup/check-id']({
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
  reissueAccessToken: async () => {
    const { status, data } = await apis['POST /user/refresh-token']();

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
  checkGoogleEmail: async ({ token }) => {
    const body = { accessToken: token };
    const { status, data } = await apis[
      'POST /user/snu-mail-verification/google-email'
    ]({
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
  logout: async ({ token }) => {
    const { status, data } = await apis['POST /user/signout']({ token });
    tokenLocalStorage.removeToken();
    tokenState.removeToken();
    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
});
