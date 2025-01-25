import type { Apis } from '@waffle/api';

import type { ServiceResponse } from '@/entities/response';
import type { Resume, ResumeListResponse, ResumeRequest } from '@/entities/resume';

export type ResumeService = {
  getResumeDetail: ({
    token,
    resumeId,
  }: {
    token: string;
    resumeId: string;
  }) => ServiceResponse<Resume>;
  getResumeList: ({
    token,
  }: {
    token: string;
  }) => ServiceResponse<ResumeListResponse>;
  createResume: ({
    token,
    resumeContents,
    postId,
  }: {
    token: string;
    resumeContents: ResumeRequest;
    postId: string;
  }) => ServiceResponse<Resume>;
  deleteResume: ({
    token,
    resumeId,
  }: {
    token: string;
    resumeId: string;
  }) => ServiceResponse<void>;
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
    return { type: 'error', code: data.code, message: data.message };
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
    return { type: 'error', code: data.code, message: data.message };
  },
  createResume: async ({
    token,
    resumeContents,
    postId,
  }: {
    token: string;
    resumeContents: ResumeRequest
    postId: string;
  }) => {
    const body = resumeContents;
    const params = { postId };

    const { status, data } = await apis['POST /resume/:postId']({
      token,
      params,
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
  deleteResume: async ({
    token,
    resumeId,
  }: {
    token: string;
    resumeId: string;
  }) => {
    const params = { resumeId };
    const { status, data } = await apis['DELETE /resume/:resumeId']({
      token,
      params,
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
