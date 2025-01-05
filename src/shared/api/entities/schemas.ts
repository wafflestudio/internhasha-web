// DTO
type UserBriefDTO = {
  id: string;
  username: string;
  isAdmin: boolean;
};

// Params
export type EchoParams = {
  message: string;
};

// Request
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
  localId: string;
  password: string;
};

export type SocialSignUpRequest = {
  email: string;
  token: string;
  authProvider: string;
};

export type SendEmailCodeRequest = {
  snuMail: string;
};

export type EmailVerifyRequest = {
  snuMail: string;
  code: string;
};

export type GoogleSignInRequest = {
  googleAccessToken: string;
};

// Response
export type PretotypeUserSubmitResponse = {
  email: string;
  isSubscribed: boolean;
  createdAt: string;
};

export type UserWithTokenResponse = {
  user: UserBriefDTO;
  accessToken: string;
};
