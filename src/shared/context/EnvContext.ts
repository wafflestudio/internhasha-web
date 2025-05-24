import { createContext } from 'react';

export type EnvContext = {
  APP_ENV: 'prod' | 'dev' | 'mock';
  GOOGLE_CLIENT_ID: string;
  SHOW_MODAL: boolean;
  SHOW_MODAL_SEASON: Date | null;
};

export const EnvContext = createContext<EnvContext | null>(null);
