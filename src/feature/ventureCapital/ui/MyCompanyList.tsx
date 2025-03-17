import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ICON_SRC } from '@/entities/asset';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const MyCompanyList = () => {
  const { companyData } = useGetCompanies();
  const { toCreatePost } = useRouteNavigation();

  if (companyData === undefined) {
    return (
      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={`loading-${index}`}
            className="flex h-[50px] items-center justify-between rounded-md bg-white px-[18px]"
          >
            <Skeleton className="h-[28px] w-[120px]" />
            <Skeleton className="h-[28px] w-[96px]" />
          </div>
        ))}
      </div>
    );
  }

  if (companyData.type === 'error') {
    return (
      <div>데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.</div>
    );
  }

  const company = companyData.data;

  return (
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
      {company.map((item, idx) => (
        <div
          key={`company-list-${idx}`}
          className="flex h-[50px] items-center justify-between rounded-md bg-white px-[18px]"
        >
          <span>{item.companyName}</span>
          <Button
            variant="secondary"
            onClick={() => {
              toCreatePost({ companyId: item.id });
            }}
            className="test-sm flex h-[28px] px-2"
          >
            <img src={ICON_SRC.EDIT} />
            공고 작성
          </Button>
        </div>
      ))}
    </div>
  );
};

const useGetCompanies = () => {
  const { ventureCapitalService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { data: companyData } = useQuery({
    queryKey: ['postService', 'getMyCompany'],
    queryFn: async () => {
      if (token === null) {
        throw new Error('토큰이 존재하자 않습니다.');
      }
      return ventureCapitalService.getMyCompanys({
        token,
      });
    },
  });

  return { companyData };
};
