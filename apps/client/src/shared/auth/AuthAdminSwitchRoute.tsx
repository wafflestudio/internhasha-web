import type { ReactNode } from 'react';

import { useGuardContext } from '@/shared/context/hooks';
import { TokenContext } from '@/shared/context/TokenContext';

export const AuthCompanySwitchRoute = ({
  companyPage,
  nonCompanyPage,
}: {
  companyPage: ReactNode;
  nonCompanyPage: ReactNode;
}) => {
  const { token, role } = useGuardContext(TokenContext);

  if (token !== null && role === 'CURATOR') {
    return <>{companyPage}</>;
  }

  return <>{nonCompanyPage}</>;
};
