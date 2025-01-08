import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { useGuardContext } from '@/shared/context/hooks';
import { ReSignInModalContext } from '@/shared/context/ReSignInModalContext';

export const AuthProtectedRoute = () => {
  const { isOpen } = useGuardContext(ReSignInModalContext);

  return isOpen ? <ReSignInModal /> : <Outlet />;
};
