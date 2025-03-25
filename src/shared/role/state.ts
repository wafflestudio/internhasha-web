import { jwtDecode } from 'jwt-decode';

import type { DecodedToken } from '@/entities/decodedToken';

export type RoleStateRepository = {
  setRole({ role }: { role: 'APPLICANT' | 'COMPANY' | null }): void;
  setRoleByToken({ token }: { token: string }): void;
  removeRole(): void;
  setId({ id }: { id: string }): void;
};

export const implRoleStateRepository = ({
  setRole,
  setId,
}: {
  setRole(role: 'APPLICANT' | 'COMPANY' | null): void;
  setId(id: string | null): void;
}): RoleStateRepository => ({
  setRole: ({ role }) => {
    setRole(role);
  },
  setRoleByToken: ({ token }) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role === 'APPLICANT' || decoded.role === 'COMPANY') {
        setRole(decoded.role);
        if (decoded.role === 'COMPANY' && decoded.sub !== undefined)
          setId(decoded.sub);
        return;
      }
      setRole(null);
    } catch {
      setRole(null);
    }
  },
  removeRole: () => {
    setRole(null);
    setId(null);
  },
  setId: ({ id }) => {
    setId(id);
  },
});
