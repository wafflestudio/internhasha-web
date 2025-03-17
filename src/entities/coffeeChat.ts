export type CoffeeChatStatus = 'WAITING' | 'ACCEPTED' | 'CANCELED' | 'REJECTED';

export type CoffeeChat = {
  id: string;
  postId: string;
  title: string;
  company: {
    name: string;
    imageKey?: string;
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

type CoffeeChatStatusMapEntry = {
  status: CoffeeChatStatus;
  variant: 'default' | 'accepted' | 'canceled' | 'rejected';
  label: string;
};

export const COFFEE_CHAT_STATUS_MAP: Record<
  CoffeeChatStatus,
  CoffeeChatStatusMapEntry
> = {
  WAITING: { status: 'WAITING', variant: 'default', label: '대기중' },
  ACCEPTED: { status: 'ACCEPTED', variant: 'accepted', label: '성사됨' },
  CANCELED: { status: 'CANCELED', variant: 'canceled', label: '취소됨' },
  REJECTED: { status: 'REJECTED', variant: 'rejected', label: '거절됨' },
};
