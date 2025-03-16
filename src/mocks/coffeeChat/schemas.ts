export enum CoffeeChatStatus {
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
}
export type CoffeeChatUserInfo = {
  name: string;
  image?: string; // 이미지 S3 key
};
export type CoffeeChatDTO = {
  id: string;
  postId: string;
  title: string;
  company: CoffeeChatUserInfo;
  createdAt: string;
  updatedAt: string;
  coffeeChatStatus: CoffeeChatStatus;
  changed: boolean;
  applicant: CoffeeChatUserInfo;
};

export type CoffeeChatResponse = CoffeeChatDTO;

export type CoffeeChatListResponse = { coffeeChatList: CoffeeChatDTO[] };
