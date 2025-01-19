import { http } from 'msw';

import { resumeResolver } from '@/mocks/resume/resolvers';
import type {
  ResumeListResponse,
  ResumeResponse,
} from '@/mocks/resume/schemas.ts';

export const resumeHandlers = [
  http.get<never, never, ResumeListResponse>(
    '*/api/resume',
    resumeResolver.getResumeList,
  ),

  http.get<never, never, ResumeResponse>(
    '*/api/resume/:resumeId',
    resumeResolver.getResumeDetail,
  ),

  http.post('*/api/resume/:postId', resumeResolver.applyCoffeeChat),

  http.delete('*/api/resume/:resumeId', resumeResolver.deleteCoffeeChat),
];
