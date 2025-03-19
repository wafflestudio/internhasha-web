import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { useGuardContext } from '@/shared/context/hooks';
import { TokenContext } from '@/shared/context/TokenContext';

export const AuthProtectedRoute = () => {
  const { token } = useGuardContext(TokenContext);

  return token === null ? <ReSignInModal /> : <Outlet />;
};
