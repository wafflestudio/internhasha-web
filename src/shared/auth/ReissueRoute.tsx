import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const ReissueRoute = () => {
  const hasReissued = useRef(false);
  const { token } = useGuardContext(TokenContext);
  const { reissueToken } = useRefreshToken();

  useEffect(() => {
    if (token === null && !hasReissued.current) {
      hasReissued.current = true;
      reissueToken();
    }
  }, [token, reissueToken]);

  if (token === null && !hasReissued.current) {
    return null;
  }

  return <Outlet />;
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
