import type { Apis } from '@/api';
import type {
  CoffeeChatCount,
  CoffeeChatListResponse,
  CoffeeChatStatus,
} from '@/api/apis/localServer/schemas';
import type { CoffeeChat, CoffeeChatRequest } from '@/entities/coffeeChat';
import type { ServiceResponse } from '@/entities/response';

export type CoffeeChatService = {
  getCoffeeChatDetail: ({
    token,
    coffeeChatId,
  }: {
    token: string;
    coffeeChatId: string;
  }) => ServiceResponse<CoffeeChat>;
  getCoffeeChatList: ({
    token,
  }: {
    token: string;
  }) => ServiceResponse<CoffeeChatListResponse>;
  getCoffeeChatCount: ({
    token,
  }: {
    token: string;
  }) => ServiceResponse<CoffeeChatCount>;
  createCoffeeChat: ({
    token,
    coffeeChatContents,
    postId,
  }: {
    token: string;
    coffeeChatContents: CoffeeChatRequest;
    postId: string;
  }) => ServiceResponse<CoffeeChat>;
  updateCoffeeChatStatus: ({
    token,
    body,
  }: {
    token: string;
    body: { coffeeChatStatus: CoffeeChatStatus; coffeeChatList: string[] };
  }) => ServiceResponse<CoffeeChat>;
  cancelCoffeeChat: ({
    token,
    body,
  }: {
    token: string;
    body: { coffeeChatStatus: 'CANCELED'; coffeeChatList: string[] };
  }) => ServiceResponse<CoffeeChat>;
};

export const implCoffeeChatService = ({
  apis,
}: {
  apis: Apis;
}): CoffeeChatService => ({
  getCoffeeChatDetail: async ({
    token,
    coffeeChatId,
  }: {
    token: string;
    coffeeChatId: string;
  }) => {
    const params = { coffeeChatId };

    const { status, data } = await apis['GET /coffeeChat/:coffeeChatId']({
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
  getCoffeeChatList: async ({ token }: { token: string }) => {
    const { status, data } = await apis['GET /coffeeChat']({
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
  getCoffeeChatCount: async ({ token }: { token: string }) => {
    const { status, data } = await apis['GET /coffeeChat/count']({
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
  createCoffeeChat: async ({
    token,
    coffeeChatContents,
    postId,
  }: {
    token: string;
    coffeeChatContents: CoffeeChatRequest;
    postId: string;
  }) => {
    const body = coffeeChatContents;
    const params = { postId };

    const { status, data } = await apis['POST /coffeeChat/:postId']({
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
  updateCoffeeChatStatus: async ({
    token,
    body,
  }: {
    token: string;
    body: { coffeeChatStatus: CoffeeChatStatus; coffeeChatList: string[] };
  }) => {
    const { status, data } = await apis['PATCH /coffeeChat']({
      token,
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

  cancelCoffeeChat: async ({
    token,
    body,
  }: {
    token: string;
    body: { coffeeChatStatus: 'CANCELED'; coffeeChatList: string[] };
  }) => {
    const { status, data } = await apis['PATCH /coffeeChat']({
      token,
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
