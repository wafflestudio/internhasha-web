import { HttpResponse } from 'msw';

import type {
  PretotypeAddUserRequest,
  PretotypeAddUserResponse,
} from '@/mocks/echo/schemas';
import type { Resolver } from '@/mocks/entities/resolver';

type echoResolver = {
  pretotypeAddUser: Resolver<PretotypeAddUserRequest, PretotypeAddUserResponse>;
};

export const echoResolver: echoResolver = {
  pretotypeAddUser: async ({ request }) => {
    const { email, isSubscribed } = await request.json();
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const context = {
      email,
      isSubscribed,
      createdAt: formattedDate,
    };

    return HttpResponse.json(context, { status: 200 });
  },
};
