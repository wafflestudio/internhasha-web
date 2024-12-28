export type EchoMessage = {
  message: string;
};

export type UserSubmit = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

export const MESSAGE_MAX_LENGTH = 500;
