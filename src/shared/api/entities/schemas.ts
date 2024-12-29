export type EchoParams = {
  message: string;
};

export type PretotypeUserSubmitRequest = {
  email: string;
  isSubscribed: boolean;
};

export type PretotypeUserSubmitDto = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};
