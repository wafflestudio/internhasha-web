import { createContext } from 'react';

export type EnvContext = {
  APP_ENV: 'prod' | 'dev' | 'mock';
  GOOGLE_CLIENT_ID: string;
  SHOW_MODAL_SEASON: boolean;
};

export const EnvContext = createContext<EnvContext | null>(null);
