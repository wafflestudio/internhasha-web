import { HttpResponse, type HttpResponseResolver } from 'msw';

import { mockResumes } from '@/mocks/resume/data';
import type {
  ResumeDTO,
  ResumeListResponse,
  ResumeResponse} from '@/mocks/resume/schemas.ts';

type ResumeResolver = {
  getResumeList: HttpResponseResolver<never, never, ResumeListResponse>;
  getResumeDetail: HttpResponseResolver<never, never, ResumeResponse>;
  applyCoffeeChat: HttpResponseResolver<never, never, ResumeResponse>;
  deleteCoffeeChat: HttpResponseResolver<never, never, never>;
};

export const resumeResolver: ResumeResolver = {
  getResumeList: () => {
    return HttpResponse.json([mockResumes], { status: 200 });
  },

  getResumeDetail: ({ params }) => {
    const { resumeId } = params;
    const response = mockResumes.find((r) => r.id === resumeId);

    if (response == null) {
      return HttpResponse.json(response, { status: 404 });
    }

    return HttpResponse.json(response, { status: 200 });
  },

  applyCoffeeChat: async ({ request, params }) => {
    const { postId } = params;
    const { phoneNumber, content } = await request.json();

    const newResume: ResumeDTO = {
      id: `${mockResumes.length + 1}`,
      postId,
      author: {
        id: 'newAuthor',
        snuMail: 'newMail',
        username: 'newUser',
        phoneNumber: 'newPhoneNumber',
        isAdmin: false,
        localId: 'newLocalId',
        googleId: 'newGoogleId',
      },
      content,
      phoneNumber,
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(newResume, { status: 200 });
  },

  deleteCoffeeChat: ({ params }) => {
    const { resumeId } = params;
    const resumeExists = mockResumes.some((r) => r.id === resumeId);

    if (!resumeExists) {
      return HttpResponse.json(
        { error: '이력서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json(null, { status: 200 });
  },
};
