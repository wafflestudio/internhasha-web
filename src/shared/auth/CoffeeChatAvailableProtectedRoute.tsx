import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { PATH } from '@/shared/route/constants';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

export const CoffeeChatAvailableProtectedRoute = () => {
  const { applicantProfileResponse } = useGetApplicantProfile();
  if (applicantProfileResponse === undefined) {
    return null;
  }
  if (applicantProfileResponse.type === 'success') {
    return <Outlet />;
  }
  return <RouteNavigator link={PATH.INDEX} />;
};

const useGetApplicantProfile = () => {
  const { token } = useGuardContext(TokenContext);
  const { applicantService } = useGuardContext(ServiceContext);

  const { data: applicantProfileResponse } = useQuery({
    queryKey: ['ApplicantService', 'getProfile', token] as const,
    queryFn: async ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }

      return applicantService.getProfile({
        token: t,
      });
    },
    enabled: token !== null,
  });

  return { applicantProfileResponse };
};
