export type EchoParams = {
  message: string;
};

export type PretotypeUserSubmitRequest = {
  email: string;
  isSubscribed: boolean;
};

export type LocalSignUpRequest = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  authProvider: string;
};

export type LocalSignInRequest = {
  email: string;
  password: string;
  authProvider: string;
};

export type SocialSignUpRequest = {
  email: string;
  token: string;
  authProvider: string;
};

export type SocialSignInRequest = {
  token: string;
  authProvider: string;
};

export type PretotypeUserSubmitResponse = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

export type UserWithTokenResponse = {
  userResponse: {
    id: BigInteger;
    name: string;
    email: string;
    phoneNumber: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type PostsResponse = {
  id: string;
  name: string;
  description: string;
};
