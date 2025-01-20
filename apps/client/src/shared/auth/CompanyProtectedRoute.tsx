import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useRef } from 'react';
import { Outlet } from 'react-router';

import { ReSignInModal } from '@/components/modal/ReSignInModal';
import type { DecodedToken } from '@/entities/decodedToken';
import { PATH } from '@/entities/route';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CompanyProtectedRoute = () => {
  const hasReissued = useRef(false);
  const { token } = useGuardContext(TokenContext);
  const { reissueToken } = useRefreshToken();

  if (token === null && !hasReissued.current) {
    reissueToken();
    hasReissued.current = true;
    return <div>로딩중...</div>;
  }

  if (token === null) {
    return <ReSignInModal />;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.role === 'ROLE_POST_ADMIN') {
      return <Outlet />;
    }
  } catch {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  return <RouteNavigator link={PATH.INDEX} />;
};

const useRefreshToken = () => {
  const { authService } = useGuardContext(ServiceContext);

  const { mutate: reissueToken } = useMutation({
    mutationFn: async () => {
      const response = await authService.reissueAccessToken();
      return response;
    },
    onSuccess: () => {
      return;
    },
    onError: () => {
      return;
    },
  });

  return {
    reissueToken,
  };
};
