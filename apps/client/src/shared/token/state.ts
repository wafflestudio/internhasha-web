import { jwtDecode } from 'jwt-decode';

import type { DecodedToken } from '@/entities/decodedToken';
export type TokenStateRepository = {
  setToken({ token }: { token: string }): void;
  removeToken(): void;
};

export const implTokenStateRepository = ({
  setToken,
  setRole,
}: {
  setToken(token: string | null): void;
  setRole(role: 'NORMAL' | 'CURATOR' | null): void;
}): TokenStateRepository => ({
  setToken: ({ token }) => {
    setToken(token);
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role === 'CURATOR' || decoded.role === 'NORMAL') {
        setRole(decoded.role);
        return;
      }
      setRole(null);
    } catch {
      setRole(null);
    }
  },
  removeToken: () => {
    setToken(null);
    setRole(null);
  },
});
