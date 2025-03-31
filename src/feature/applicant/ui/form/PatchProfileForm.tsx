import { useQuery } from '@tanstack/react-query';

import { CreateProfileForm } from '@/feature/applicant/ui/form/CreateProfileForm';
import { SkeletonProfileForm } from '@/feature/applicant/ui/form/SkeletonProfileForm';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const PatchProfileForm = () => {
  const { applicantInfoData } = useApplicantInfo();

  if (applicantInfoData === undefined) {
    return <SkeletonProfileForm />;
  }
  if (applicantInfoData.type === 'error') {
    return null;
  }
  return <CreateProfileForm initialState={applicantInfoData.data} />;
};

const useApplicantInfo = () => {
  const { token } = useGuardContext(TokenContext);
  const { applicantService } = useGuardContext(ServiceContext);
  const { data: applicantInfoData } = useQuery({
    queryKey: ['applicantService', 'getProfile', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return applicantService.getProfile({ token: t });
    },
  });

  return { applicantInfoData };
};
