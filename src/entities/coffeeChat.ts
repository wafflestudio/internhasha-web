import type { Applicant } from '@/mocks/applicant/schemas';

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

export type CompanyCoffeeChat = {
  id: string;
  postId: string;
  title: string;
  company: {
    companyName: string;
    companyImageKey?: string;
  };
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  content: string;
  applicant: Applicant;
};

export type CoffeeChatRequest = {
  phoneNumber: string;
  content: string;
};

type CoffeeChatStatusMapEntry = {
  status: CoffeeChatStatus;
  variant: 'pending' | 'accepted' | 'canceled' | 'rejected';
  label: string;
};

export const COFFEE_CHAT_STATUS_MAP: Record<
  CoffeeChatStatus,
  CoffeeChatStatusMapEntry
> = {
  WAITING: { status: 'WAITING', variant: 'pending', label: '대기' },
  ACCEPTED: { status: 'ACCEPTED', variant: 'accepted', label: '성사' },
  CANCELED: { status: 'CANCELED', variant: 'canceled', label: '취소' },
  REJECTED: { status: 'REJECTED', variant: 'rejected', label: '거절' },
};
