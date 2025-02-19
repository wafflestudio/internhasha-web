import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { PATH } from '@/entities/route';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CompanyProtectedRoute = () => {
  const hasReissued = useRef(false);
  const { token, role } = useGuardContext(TokenContext);
  const { reissueToken } = useRefreshToken();

  useEffect(() => {
    if (token === null && !hasReissued.current) {
      hasReissued.current = true;
    }
  }, [token]);

  if (token === null && !hasReissued.current) {
    reissueToken();
    return null;
  }

  if (token === null) {
    return <ReSignInModal />;
  }

  if (role === 'CURATOR') {
    return <Outlet />;
  }

  return <RouteNavigator link={PATH.INDEX} />;
};

const useRefreshToken = () => {
  const { authService } = useGuardContext(ServiceContext);
  const queryClient = useQueryClient();

  const { mutate: reissueToken } = useMutation({
    mutationFn: async () => {
      const response = await authService.reissueAccessToken();
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
    onError: () => {
      return;
    },
  });

  return {
    reissueToken,
  };
};
