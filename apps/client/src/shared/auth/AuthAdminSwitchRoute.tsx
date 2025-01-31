import { jwtDecode } from 'jwt-decode';
import type { ReactNode } from 'react';

import type { DecodedToken } from '@/entities/decodedToken';
import { useGuardContext } from '@/shared/context/hooks';
import { TokenContext } from '@/shared/context/TokenContext';

export const AuthCompanySwitchRoute = ({
  companyPage,
  nonCompanyPage,
}: {
  companyPage: ReactNode;
  nonCompanyPage: ReactNode;
}) => {
  const { token } = useGuardContext(TokenContext);
  if (token === null) {
    return <>{nonCompanyPage}</>;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.role === 'CURATOR') {
      return <>{companyPage}</>;
    }
  } catch {
    return <>{nonCompanyPage}</>;
  }

  return <>{nonCompanyPage}</>;
};
