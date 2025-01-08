import { createContext } from 'react';

export type ReSignInModalContext = {
  isOpen: boolean;
  setModalOpen(input: boolean): void;
};

export const ReSignInModalContext = createContext<ReSignInModalContext | null>(
  null,
);
