import { createContext } from 'react';

export type TokenContext = {
  token: string | null;
  role: 'NORMAL' | 'CURATOR' | null;
};

export const TokenContext = createContext<TokenContext | null>(null);
