import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const AuthProtectedRoute = () => {
  const hasReissued = useRef(false);
  const { token } = useGuardContext(TokenContext);
  const { reissueToken } = useRefreshToken();

  if (token === null && !hasReissued.current) {
    reissueToken();
    hasReissued.current = true;
    return <div>로딩중...</div>;
  }

  return token === null ? <ReSignInModal /> : <Outlet />;
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
