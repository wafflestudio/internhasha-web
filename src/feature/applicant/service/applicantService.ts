import type { Apis, LocalServerDTO } from '@/api';
import type { ServiceResponse } from '@/entities/response';

export type ApplicantService = {
  getProfile({
    token,
  }: {
    token: string;
  }): ServiceResponse<LocalServerDTO.Applicant>;
};

export const implApplicantService = ({
  apis,
}: {
  apis: Apis;
}): ApplicantService => ({
  getProfile: async ({ token }) => {
    const { status, data } = await apis['GET /applicant/me']({ token });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
