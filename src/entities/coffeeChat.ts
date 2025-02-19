import type { User } from '@/entities/user';

export type CoffeeChat = {
  id: string;
  positionTitle: string;
  companyName: string;
  postId: string;
  author: Pick<
    User,
    'id' | 'name' | 'userRole' | 'snuMail' | 'phoneNumber' | 'profileImageLink'
  >;
  content: string;
  phoneNumber: string;
  createdAt: string;
};

export type CoffeeChatListResponse = {
  coffeeChatList: CoffeeChat[];
};

export type CoffeeChatRequest = {
  phoneNumber: string;
  content: string;
};
