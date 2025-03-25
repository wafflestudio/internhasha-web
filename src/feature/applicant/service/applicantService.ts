import type { Apis, LocalServerDTO } from '@/api';
import type { JobMinorCategory, Link } from '@/entities/post';
import type { ServiceResponse } from '@/entities/response';

export type ApplicantService = {
  getProfile({
    token,
  }: {
    token: string;
  }): ServiceResponse<LocalServerDTO.ApplicantResponse>;
  putProfile({
    token,
    body,
  }: {
    token: string;
    body: {
      enrollYear: number;
      department: string;
      positions?: JobMinorCategory[];
      slogan?: string;
      explanation?: string;
      stacks?: string[];
      imageKey?: string;
      cvKey?: string;
      portfolioKey?: string;
      links?: Link[];
    };
  }): ServiceResponse<LocalServerDTO.ApplicantResponse>;
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
  putProfile: async ({ token, body }) => {
    const { status, data } = await apis['PUT /applicant/me']({ token, body });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
