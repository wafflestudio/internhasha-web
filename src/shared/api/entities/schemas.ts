export type EchoParams = {
  message: string;
};

export type PretotypeUserSubmitRequest = {
  email: string;
  isSubscribed: boolean;
};

export type LocalSignUpRequest = {
  id: string;
  password: string;
};

export type PretotypeUserSubmitDto = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

export type SignUpResponse = {
  id: string;
  username: string;
  refreshToken: string;
  accessToken: string;
};
