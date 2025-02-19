import type { Apis } from '@/api';
import type {
  CoffeeChat,
  CoffeeChatListResponse,
  CoffeeChatRequest,
} from '@/entities/coffeeChat';
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
  createCoffeeChat: ({
    token,
    coffeeChatContents,
    postId,
  }: {
    token: string;
    coffeeChatContents: CoffeeChatRequest;
    postId: string;
  }) => ServiceResponse<CoffeeChat>;
  deleteCoffeeChat: ({
    token,
    coffeeChatId,
  }: {
    token: string;
    coffeeChatId: string;
  }) => ServiceResponse<void>;
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
  deleteCoffeeChat: async ({
    token,
    coffeeChatId,
  }: {
    token: string;
    coffeeChatId: string;
  }) => {
    const params = { coffeeChatId };
    const { status, data } = await apis['DELETE /coffeeChat/:coffeeChatId']({
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
