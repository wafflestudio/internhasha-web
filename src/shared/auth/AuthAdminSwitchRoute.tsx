import type { ReactNode } from 'react';

import { useGuardContext } from '@/shared/context/hooks';
import { RoleContext } from '@/shared/context/RoleContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const AuthCompanySwitchRoute = ({
  companyPage,
  nonCompanyPage,
}: {
  companyPage: ReactNode;
  nonCompanyPage: ReactNode;
}) => {
  const { token } = useGuardContext(TokenContext);
  const { role } = useGuardContext(RoleContext);

  if (token !== null && role === 'COMPANY') {
    return <>{companyPage}</>;
  }

  return <>{nonCompanyPage}</>;
};
