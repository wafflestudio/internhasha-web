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
  username: string;
  localId: string;
  password: string;
  snuMail: string;
};

export type LocalSignInRequest = {
  localId: string;
  password: string;
};

export type GoogleSignUpRequest = {
  snuMail: string;
  googleAccessToken: string;
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

export type CheckLocalIdDuplicateRequest = {
  localId: string;
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

export type PostsResponse = {
  id: string;
  name: string;
  description: string;
};
