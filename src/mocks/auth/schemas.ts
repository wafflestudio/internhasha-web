// Skeleton of Mock Response
type MockErrorResponse = {
  error: string;
};

export type MockResponse<T> = T | MockErrorResponse;

// DTO
type UserBriefDTO = {
  id: string;
  userRole: 'APPLICANT' | 'COMPANY';
};

// Request
export type SendEmailCodeRequest = {
  snuMail: string;
};

export type EmailVerifyRequest = {
  snuMail: string;
  code: string;
};

export type GoogleSignUpRequest = {
  snuMail: string;
  googleAccesToken: string;
};

export type SignInRequest = {
  mail: string;
  password: string;
};

export type LocalIdRequest = {
  localId: string;
};

// Response
export type UserWithTokenResponse = {
  user: UserBriefDTO;
  accessToken: string;
};

export type AccessTokenResponse = {
  accessToken: string;
};
