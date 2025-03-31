import { useQuery } from '@tanstack/react-query';

import { CreateCompanyProfileForm } from '@/feature/company/ui/form/CreateCompanyForm';
import { SkeletonCompanyProfileForm } from '@/feature/company/ui/form/SkeletonCompanyProfileForm';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const PatchCompanyProfileForm = () => {
  const { companyInfoData } = useCompanyInfo();

  if (companyInfoData === undefined) {
    return <SkeletonCompanyProfileForm />;
  }
  if (companyInfoData.type === 'error') {
    return null;
  }
  return <CreateCompanyProfileForm initialState={companyInfoData.data} />;
};

const useCompanyInfo = () => {
  const { token } = useGuardContext(TokenContext);
  const { companyService } = useGuardContext(ServiceContext);
  const { data: companyInfoData } = useQuery({
    queryKey: ['companyService', 'getMyInfo', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return companyService.getMyInfo({ token: t });
    },
  });

  return { companyInfoData };
};
