import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const AuthProtectedRoute = () => {
  const hasReissued = useRef(false);
  const { token } = useGuardContext(TokenContext);
  const { reissueToken, isPending } = useRefreshToken();

  if (token === null && !isPending && !hasReissued.current) {
    reissueToken();
    hasReissued.current = true;
  }

  return token === null ? <ReSignInModal /> : <Outlet />;
};

const useRefreshToken = () => {
  const { authService } = useGuardContext(ServiceContext);

  const { mutate: reissueToken, isPending } = useMutation({
    mutationFn: () => {
      return authService.reissueAccessToken();
    },
  });

  return {
    reissueToken,
    isPending,
  };
};
