import { createContext } from 'react';

export type EnvContext = {
  API_BASE_URL: string;
  APP_ENV: 'prod' | 'dev' | 'mock';
  GOOGLE_CLIENT_ID: string;
};

export const EnvContext = createContext<EnvContext | null>(null);
