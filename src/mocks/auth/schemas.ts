// DTO
type UserBriefDTO = {
  id: string;
  username: string;
  isAdmin: boolean;
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

// Response
export type UserWithTokenResponse = {
  user: UserBriefDTO;
  accessToken: string;
};
