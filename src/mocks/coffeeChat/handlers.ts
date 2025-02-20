import { http } from 'msw';

import { coffeeChatResolver } from '@/mocks/coffeeChat/resolvers';
import type {
  CoffeeChatListResponse,
  CoffeeChatResponse,
} from '@/mocks/coffeeChat/schemas';

export const coffeeChatHandlers = [
  http.get<never, never, CoffeeChatListResponse>(
    '*/api/coffeeChat',
    coffeeChatResolver.getCoffeeChatList,
  ),

  http.get<never, never, CoffeeChatResponse>(
    '*/api/coffeeChat/:coffeeChatId',
    coffeeChatResolver.getCoffeeChatDetail,
  ),

  http.post('*/api/coffeeChat/:postId', coffeeChatResolver.createCoffeeChat),

  http.delete(
    '*/api/coffeeChat/:coffeeChatId',
    coffeeChatResolver.deleteCoffeeChat,
  ),
];
