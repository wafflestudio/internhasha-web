import type { Apis } from '@waffle/api';

import type { ServiceResponse } from '@/entities/response.ts';
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
  applyCoffeeChat: ({
    token,
    phoneNumber,
    content,
    postId,
  }: {
    token: string;
    phoneNumber: string;
    content: string;
    postId: string;
  }) => ServiceResponse<ResumeResponse>;
  deleteCoffeeChat: ({
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
  applyCoffeeChat: async ({
    token,
    phoneNumber,
    content,
    postId,
  }: {
    token: string;
    phoneNumber: string;
    content: string;
    postId: string;
  }) => {
    const body = { phoneNumber, content };
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
    return { type: 'error', status, message: data.error };
  },
  deleteCoffeeChat: async ({
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
    return { type: 'error', status, message: data.error };
  },
});
