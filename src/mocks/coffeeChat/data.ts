import { type CoffeeChatResponse } from '@/mocks/coffeeChat/schemas';

export const mockCoffeeChats: CoffeeChatResponse[] = [
  {
    id: '1',
    postId: '371c8818-9538-4baa-b9f2-908d2fd5b5c8',
    title: 'React 프론트엔드 개발자',
    company: {
      name: 'A 기업',
    },
    createdAt: '2025-03-13T15:48:33.253748',
    updatedAt: '2025-03-13T15:48:33.253748',
    coffeeChatStatus: 'WAITING',
    changed: false,
    applicant: {
      name: '웨이',
    },
  },
  {
    id: '2',
    postId: 'post2',
    title: '백엔드 개발자',
    company: {
      name: 'B 기업',
    },
    createdAt: '2025-01-02T11:00:00Z',
    updatedAt: '2025-01-02T11:00:00Z',
    coffeeChatStatus: 'ACCEPTED',
    changed: true,
    applicant: {
      name: '지원자2',
    },
  },
  {
    id: '3',
    postId: 'post3',
    title: '디자이너',
    company: {
      name: 'C 기업',
    },
    createdAt: '2025-01-03T12:00:00Z',
    updatedAt: '2025-01-03T12:00:00Z',
    coffeeChatStatus: 'CANCELED',
    changed: false,
    applicant: {
      name: '지원자3',
    },
  },
  {
    id: '4',
    postId: 'post4',
    title: '데이터 엔지니어',
    company: {
      name: 'D 기업',
    },
    createdAt: '2025-01-04T13:00:00Z',
    updatedAt: '2025-01-04T13:00:00Z',
    coffeeChatStatus: 'REJECTED',
    changed: true,
    applicant: {
      name: '지원자4',
    },
  },
  {
    id: '5',
    postId: 'post5',
    title: '마케터',
    company: {
      name: 'E 기업',
    },
    createdAt: '2025-01-05T14:00:00Z',
    updatedAt: '2025-01-05T14:00:00Z',
    coffeeChatStatus: 'WAITING',
    changed: false,
    applicant: {
      name: '지원자5',
    },
  },
];
