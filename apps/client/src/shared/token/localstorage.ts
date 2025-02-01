import { jwtDecode } from 'jwt-decode';

import type { DecodedToken } from '@/entities/decodedToken';

const LOCAL_STORAGE_TOKEN_KEY = 'waffle-token';
const LOCAL_STORAGE_ROLE_KEY = 'waffle-role';

export type TokenLocalStorageRepository = {
  setToken({ token }: { token: string }): void;
  getToken(): { token: string | null; role: 'NORMAL' | 'CURATOR' | null };
  removeToken(): void;
};

export const implTokenLocalStorageRepository =
  (): TokenLocalStorageRepository => ({
    setToken: ({ token }) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.role === 'CURATOR' || decoded.role === 'NORMAL') {
          localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, decoded.role);
          return;
        }
        localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY);
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY);
      }
    },
    getToken: () => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      const role = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY) as
        | 'NORMAL'
        | 'CURATOR'
        | null;
      return { token, role };
    },
    removeToken: () => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_ROLE_KEY);
    },
  });
