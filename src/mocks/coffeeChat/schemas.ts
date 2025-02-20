type UserDTO = {
  id: string;
  snuMail: string;
  username: string;
  phoneNumber?: string;
  isAdmin: boolean;
  localId?: string;
  googleId?: string;
};

export type CoffeeChatDTO = {
  id: string;
  postId: string;
  author: UserDTO;
  content: string;
  phoneNumber: string;
  createdAt: string;
};

export type CoffeeChatResponse = CoffeeChatDTO;

export type CoffeeChatListResponse = { coffeeChatList: CoffeeChatDTO[] };
