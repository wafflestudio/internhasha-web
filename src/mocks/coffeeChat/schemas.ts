import type { Applicant } from '@/mocks/applicant/schemas';
export type CoffeeChatStatus = 'WAITING' | 'ACCEPTED' | 'CANCELED' | 'REJECTED';
export type CoffeeChatUserInfo = {
  name: string;
  imageKey?: string; // 이미지 S3 key
};

type CoffeeChatBriefDTO = {
  id: string;
  postId: string;
  title: string;
  company: CoffeeChatUserInfo;
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  content: string;
  applicant: CoffeeChatUserInfo;
};
export type CoffeeChatResponse = CoffeeChatApplicant | CoffeeChatCompany;

export type CoffeeChatListResponse = { coffeeChatList: CoffeeChatBriefDTO[] };
export type CoffeeChatApplicant = {
  id: string;
  postId: string;
  title: string;
  company: CoffeeChatUserInfo;
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  content: string;
};

type CoffeeChatCompany = {
  id: string;
  postId: string;
  title: string;
  company: CoffeeChatUserInfo;
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  content: string;
  applicant: Applicant;
};

export type CoffeeChatDetailList =
  | {
      succeeded: CoffeeChatApplicant[];
      failed: CoffeeChatApplicant[];
    }
  | {
      succeeded: CoffeeChatCompany[];
      failed: CoffeeChatCompany[];
    };
