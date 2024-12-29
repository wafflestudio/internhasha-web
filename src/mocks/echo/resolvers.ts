import { HttpResponse } from 'msw';

type PretotypeAddUserRequest = {
  email: string;
  isSubscribed: boolean;
};

export const echoResolver = {
  pretotypeAddUser: async ({
    request,
  }: {
    request: { json: () => Promise<PretotypeAddUserRequest> };
  }) => {
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
