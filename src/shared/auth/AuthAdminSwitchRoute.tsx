import type { ReactNode } from 'react';

import { useGuardContext } from '@/shared/context/hooks';
import { TokenContext } from '@/shared/context/TokenContext';
import { UserContext } from '@/shared/context/UserContext';

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
