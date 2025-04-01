import type { Apis, LocalServerDTO } from '@/api';
import type { ServiceResponse } from '@/entities/response';
import type { RoleStateRepository } from '@/shared/role/state';
import type { TokenStateRepository } from '@/shared/token/state';

export type AuthService = {
  signUp({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): ServiceResponse<LocalServerDTO.UserWithTokenResponse>;
  signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): ServiceResponse<LocalServerDTO.UserWithTokenResponse>;
  logout({ token }: { token: string }): ServiceResponse<void>;
  reissueAccessToken(): ServiceResponse<LocalServerDTO.TokenResponse>;
  sendEmailCode({ snuMail }: { snuMail: string }): ServiceResponse<void>;
  verifyCode({
    snuMail,
    code,
  }: {
    snuMail: string;
    code: string;
  }): ServiceResponse<void>;
  sendEmailPassword({ email }: { email: string }): ServiceResponse<void>;
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
  signUp: async ({ name, email, password }) => {
    const body: LocalServerDTO.SignUpRequest = {
      authType: 'APPLICANT',
      info: {
        type: 'APPLICANT',
        name,
        email,
        password,
      },
    };
    const { status, data } = await apis['POST /auth/user']({ body });

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
  signIn: async ({ email, password }) => {
    const body = { mail: email, password };
    const { status, data } = await apis['POST /auth/user/session']({ body });

    if (status === 200) {
      const token = data.token;

      tokenStateRepository.setToken({ token });
      roleStateRepository.setRole({ role: data.user.userRole });
      roleStateRepository.setId({ id: data.user.id });

      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  sendEmailCode: async ({ snuMail }) => {
    const body = { snuMail };
    const { status, data } = await apis['POST /auth/mail/verify']({
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
    const { status, data } = await apis['POST /auth/mail/validate']({
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
    const { status, data } = await apis['GET /auth/token']();

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
  logout: async ({ token }) => {
    const { status, data } = await apis['DELETE /auth/user/session']({ token });

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
  sendEmailPassword: async ({ email }) => {
    const body = { email };
    const { status, data } = await apis['POST /auth/password']({
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
