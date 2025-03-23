import { HttpResponse, type HttpResponseResolver } from 'msw';

import {
  mockApplicantCoffeeChats,
  mockCoffeeChatBriefLists,
} from '@/mocks/coffeeChat/data';
import type {
  CoffeeChatApplicant,
  CoffeeChatDetailList,
  CoffeeChatListResponse,
  CoffeeChatResponse,
  CoffeeChatStatus,
} from '@/mocks/coffeeChat/schemas';

type CoffeeChatResolver = {
  getCoffeeChatList: HttpResponseResolver<never, never, CoffeeChatListResponse>;
  getCoffeeChatDetail: HttpResponseResolver<never, never, CoffeeChatResponse>;
  createCoffeeChat: HttpResponseResolver<never, never, CoffeeChatResponse>;
  updateCoffeeChatStatus: HttpResponseResolver<
    never,
    { coffeeChatStatus: CoffeeChatStatus; coffeeChatList: string[] },
    CoffeeChatDetailList
  >;
  deleteCoffeeChat: HttpResponseResolver<never, never, never>;
};

export const coffeeChatResolver: CoffeeChatResolver = {
  getCoffeeChatList: () => {
    const response = mockCoffeeChatBriefLists;
    return HttpResponse.json(response, { status: 200 });
  },

  getCoffeeChatDetail: ({ params }) => {
    const { coffeeChatId } = params;
    const response = mockApplicantCoffeeChats.find(
      (r) => r.id === coffeeChatId,
    );

    if (response == null) {
      return HttpResponse.json(response, { status: 404 });
    }

    return HttpResponse.json(response, { status: 200 });
  },

  createCoffeeChat: async ({ request, params }) => {
    const { postId } = params;
    const { name } = await request.json();

    const newCoffeeChat: CoffeeChatApplicant = {
      id: `${mockApplicantCoffeeChats.length + 1}`,
      postId,
      title: '커피챗 제목',
      company: {
        name: name,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coffeeChatStatus: 'WAITING',
      content: '커피챗 내용',
      changed: false,
    };

    return HttpResponse.json(newCoffeeChat, { status: 200 });
  },

  updateCoffeeChatStatus: async ({ request }) => {
    const { coffeeChatList, coffeeChatStatus } = await request.json();

    const updatedCoffeeChats = coffeeChatList
      .map((id: string) => {
        const coffeeChat = mockApplicantCoffeeChats.find(
          (chat) => chat.id === id,
        );

        if (coffeeChat !== undefined) {
          // Create a new object with updated status to avoid mutating the original
          return {
            ...coffeeChat,
            coffeeChatStatus,
            updatedAt: new Date().toISOString(),
            changed: true,
          };
        }
        return null;
      })
      .filter(Boolean) as CoffeeChatResponse[];

    if (updatedCoffeeChats.length === 0) {
      return HttpResponse.json(null, { status: 404 });
    }

    return HttpResponse.json(
      { succeeded: updatedCoffeeChats, failed: [] },
      { status: 200 },
    );
  },

  deleteCoffeeChat: ({ params }) => {
    const { coffeeChatId } = params;
    const coffeeChatExists = mockApplicantCoffeeChats.some(
      (r) => r.id === coffeeChatId,
    );

    if (!coffeeChatExists) {
      return HttpResponse.json(
        { error: '이력서를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return HttpResponse.json(null, { status: 200 });
  },
};
