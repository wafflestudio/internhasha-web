import type {ServiceResponse} from "@/entities/response.ts";
import type {Apis} from "@/shared/api";
import type { ResumeListResponse, ResumeResponse } from '@/shared/api/entities';

export type ResumeService = {
  getResumeDetail: ({
    token,
    resumeId,
  }: {
    token: string;
    resumeId: string;
  }) => ServiceResponse<ResumeResponse>;
  getResumeList: ({
    token,
  }: {
    token: string;
  }) => ServiceResponse<ResumeListResponse>;
};

export const implResumeService = ({ apis }: { apis: Apis }): ResumeService => ({
  getResumeDetail: async ({
    token,
    resumeId,
  }: {
    token: string;
    resumeId: string;
  }) => {
    const params = { resumeId };

    const { status, data } = await apis['GET /resume/:resumeId']({
      token,
      params,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', status, message: data.error };
  },
  getResumeList: async ({ token }: { token: string }) => {

    const { status, data } = await apis['GET /resume']({
      token,
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
