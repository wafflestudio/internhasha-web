import { jwtDecode } from 'jwt-decode';

import type { DecodedToken } from '@/entities/decodedToken';

export type RoleStateRepository = {
  setRole({ role }: { role: 'APPLICANT' | 'COMPANY' | null }): void;
  setRoleByToken({ token }: { token: string }): void;
  removeRole(): void;
};

export const implRoleStateRepository = ({
  setRole,
}: {
  setRole(role: 'APPLICANT' | 'COMPANY' | null): void;
}): RoleStateRepository => ({
  setRole: ({ role }) => {
    setRole(role);
  },
  setRoleByToken: ({ token }) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role === 'APPLICANT' || decoded.role === 'COMPANY') {
        setRole(decoded.role);
        return;
      }
      setRole(null);
    } catch {
      setRole(null);
    }
  },
  removeRole: () => {
    setRole(null);
  },
});
