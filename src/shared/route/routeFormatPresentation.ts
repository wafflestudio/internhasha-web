import type { MyPageRouteQuery, PostFilterRouteQuery } from '@/entities/route';

export const routeFormatPresentation = {
  formatRoutes: () => {
    const createRouteParams = ({
      query,
    }: {
      query?: Record<string, string | number | undefined | (string | number)[]>;
    }) => {
      if (query === undefined) {
        return '';
      }
      const updatedParams = new URLSearchParams();

      Object.entries(query).forEach(([key, value]) => {
        if (value === undefined) {
          updatedParams.delete(key);
          return;
        }
        if (Array.isArray(value) && value.length === 0) {
          updatedParams.delete(key);
          return;
        }
        updatedParams.set(key, String(value));
      });

      return `?${updatedParams.toString()}`;
    };

    return {
      INDEX: ({ query }: { query?: PostFilterRouteQuery }) =>
        `/${createRouteParams({ query })}`,
      POST_DETAIL: ({ postId }: { postId: string }) => `/post/${postId}`,
      CREATE_COFFEE_CHAT: ({ postId }: { postId: string }) =>
        `/post/${postId}/coffeeChat/create`,
      COFFEE_CHAT_DETAIL: ({ coffeeChatId }: { coffeeChatId: string }) =>
        `/coffeeChat/${coffeeChatId}`,
      CREATE_POST: ({ companyId }: { companyId: string }) =>
        `/post/create/${companyId}`,
      MY_PAGE: ({ query }: { query?: MyPageRouteQuery }) =>
        `/mypage/${createRouteParams({ query })}`,
    };
  },
};
