import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import type { DecodedToken } from '@/entities/decodedToken';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const AuthCompanySwitchRoute = ({
  companyPage,
  nonCompanyPage,
}: {
  companyPage: ReactNode;
  nonCompanyPage: ReactNode;
}) => {
  const hasReissued = useRef(false);
  const { token } = useGuardContext(TokenContext);
  const { reissueToken } = useRefreshToken();

  if (token === null && !hasReissued.current) {
    reissueToken();
    hasReissued.current = true;
    return <div>로딩중...</div>;
  }

  if (token === null) {
    return <>{nonCompanyPage}</>;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.role === 'ROLE_POST_ADMIN') {
      return <>{companyPage}</>;
    }
  } catch {
    return <>{nonCompanyPage}</>;
  }

  return <>{nonCompanyPage}</>;
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
