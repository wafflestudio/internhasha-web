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

export type PretotypeUserSubmitDto = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

export type SignUpResponse = {
  id: BigInteger;
  name: string;
  email: string;
  phoneNumber: string;
};

export type SignInResponse = {
  userResponse: {
    id: BigInteger;
    name: string;
    email: string;
    phoneNumber: string;
  };
  accessToken: string;
  refreshToken: string;
};
