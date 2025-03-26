import { createContext } from 'react';

export type UserContext = {
  role: 'APPLICANT' | 'COMPANY' | null;
  id: string | null;
};

export const UserContext = createContext<UserContext | null>(null);
