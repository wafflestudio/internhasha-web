export type CoffeeChatStatus = 'WAITING' | 'ACCEPTED' | 'CANCELED' | 'REJECTED';

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
