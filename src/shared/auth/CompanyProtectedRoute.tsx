import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { PATH } from '@/entities/route';
import { useGuardContext } from '@/shared/context/hooks';
import { RoleContext } from '@/shared/context/RoleContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CompanyProtectedRoute = () => {
  const { token } = useGuardContext(TokenContext);
  const { role } = useGuardContext(RoleContext);

  if (token === null) {
    return <ReSignInModal />;
  }

  if (role === 'COMPANY') {
    return <Outlet />;
  }

  return <RouteNavigator link={PATH.INDEX} />;
};
