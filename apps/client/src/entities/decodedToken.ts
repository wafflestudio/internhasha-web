export type DecodedToken = {
  role: string;
  exp?: number;
  iat?: number;
  sub?: string;
};
