import type { Apis } from '@/api';
import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { RoleStateRepository } from '@/shared/role/state';
import type { TokenStateRepository } from '@/shared/token/state';

export type AuthService = {
  signUp({
    authType,
    info,
  }: {
    authType: 'LOCAL_NORMAL' | 'SOCIAL_NORMAL' | 'LOCAL_CURATOR';
    info:
      | {
          type: 'LOCAL_NORMAL';
          name: string;
          localLoginId: string;
          snuMail: string;
          password: string;
        }
      | {
          type: 'SOCIAL_NORMAL';
          provider: 'google';
          snuMail: string;
          token: string;
        }
      | {
          type: 'LOCAL_CURATOR';
          secretPassword: string;
          name: string;
          localLoginId: string;
          password: string;
        };
  }): ServiceResponse<{
    user: Omit<User, 'createdAt' | 'updatedAt'>;
    token: string;
  }>;
  signIn({
    authType,
    info,
  }: {
    authType: 'LOCAL' | 'SOCIAL';
    info:
      | {
          type: 'LOCAL';
          localLoginId: string;
          password: string;
        }
      | {
          type: 'SOCIAL';
          provider: 'google';
          token: string;
        };
  }): ServiceResponse<{
    user: Omit<User, 'createdAt' | 'updatedAt'>;
    token: string;
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
  sendEmailId({ snuMail }: { snuMail: string }): ServiceResponse<void>;
  sendEmailPassword({ snuMail }: { snuMail: string }): ServiceResponse<void>;
};

export const implAuthService = ({
  apis,
  tokenStateRepository,
  roleStateRepository,
}: {
  apis: Apis;
  tokenStateRepository: TokenStateRepository;
  roleStateRepository: RoleStateRepository;
}): AuthService => ({
  signUp: async ({ authType, info }) => {
    const body = { authType, info };
    const { status, data } = await apis['POST /user/signup']({ body });

    if (status === 200) {
      const token = data.token;

      tokenStateRepository.setToken({ token });
      roleStateRepository.setRole({ role: data.user.userRole });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  signIn: async ({ authType, info }) => {
    const body = { authType, info };
    const { status, data } = await apis['POST /user/signin']({ body });

    if (status === 200) {
      const token = data.token;

      tokenStateRepository.setToken({ token });
      roleStateRepository.setRole({ role: data.user.userRole });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
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
    return { type: 'error', code: data.code, message: data.message };
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
    return { type: 'error', code: data.code, message: data.message };
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
    return { type: 'error', code: data.code, message: data.message };
  },
  reissueAccessToken: async () => {
    const { status, data } = await apis['POST /user/refresh-token']();

    if (status === 200) {
      const accessToken = data.accessToken;

      tokenStateRepository.setToken({ token: accessToken });
      roleStateRepository.setRoleByToken({ token: accessToken });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
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
    return { type: 'error', code: data.code, message: data.message };
  },
  logout: async ({ token }) => {
    const { status, data } = await apis['POST /user/signout']({ token });

    tokenStateRepository.removeToken();
    roleStateRepository.removeRole();

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  sendEmailId: async ({ snuMail }) => {
    const body = { snuMail };
    const { status, data } = await apis['POST /user/help/find-Id']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  sendEmailPassword: async ({ snuMail }) => {
    const body = { snuMail };
    const { status, data } = await apis['POST /user/help/reset-password']({
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
