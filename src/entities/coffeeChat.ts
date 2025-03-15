type CoffeeChatStatus = 'WAITING' | 'ACCEPTED' | 'CANCELED' | 'REJECTED';

export type CoffeeChat = {
  id: string;
  postId: string;
  title: string;
  company: {
    name: string;
    imageKey: string;
  };
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  content: string;
};

export type CoffeeChatListResponse = {
  coffeeChatList: CoffeeChat[];
};

export type CoffeeChatRequest = {
  phoneNumber: string;
  content: string;
};
