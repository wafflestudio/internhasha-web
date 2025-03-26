import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import type { UserRole } from '@/entities/user';
import { useGuardContext } from '@/shared/context/hooks';
import { TokenContext } from '@/shared/context/TokenContext';
import { UserContext } from '@/shared/context/UserContext';
import { PATH } from '@/shared/route/constants';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const ProtectedRoute = ({ role }: { role: UserRole | 'SIGN_IN' }) => {
  const { token } = useGuardContext(TokenContext);
  const { role: currentRole } = useGuardContext(UserContext);

  if (token === null) {
    return <ReSignInModal />;
  }

  if (role === 'SIGN_IN') {
    return <Outlet />;
  }

  if (currentRole === role) {
    return <Outlet />;
  }

  return <RouteNavigator link={PATH.INDEX} />;
};
