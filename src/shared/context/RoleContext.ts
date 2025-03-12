import { createContext } from 'react';

export type RoleContext = {
  role: 'APPLICANT' | 'COMPANY' | null;
};

export const RoleContext = createContext<RoleContext | null>(null);
