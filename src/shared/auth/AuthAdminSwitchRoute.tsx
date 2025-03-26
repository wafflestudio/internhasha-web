import type { ReactNode } from 'react';

import { useGuardContext } from '@/shared/context/hooks';
import { UserContext } from '@/shared/context/UserContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const AuthCompanySwitchRoute = ({
  companyPage,
  nonCompanyPage,
}: {
  companyPage: ReactNode;
  nonCompanyPage: ReactNode;
}) => {
  const { token } = useGuardContext(TokenContext);
  const { role } = useGuardContext(UserContext);

  if (token !== null && role === 'COMPANY') {
    return <>{companyPage}</>;
  }

  return <>{nonCompanyPage}</>;
};
