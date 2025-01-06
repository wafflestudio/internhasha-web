import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/button';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { ServiceContext } from '@/shared/context/ServiceContext.ts';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const LandingPage = () => {
  const { toEcho, toSignUpSelect, toSignInSelect } = useRouteNavigation();

  const { data: companyListData, isLoading, isError } = useGetCompanyList();

  return (
    <div>
      <p>랜딩페이지</p>
      <Button onClick={toSignUpSelect}>회원가입 페이지로 이동</Button>
      <Button onClick={toSignInSelect}>로그인 페이지로 이동</Button>
      <Button onClick={toEcho}>에코 페이지로 이동</Button>

      {!isLoading && !isError && companyListData != null && (
        <ul>
          {companyListData.map((company) => (
            <li key={company.id}>{company.name}</li> // Adjust keys and fields as per your API response
          ))}
        </ul>
      )}
    </div>
  );
};

const useGetCompanyList = () => {
  const { companyListService } = useGuardContext(ServiceContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['companyList'],
    queryFn: async () => {
      const response = await companyListService.getCompanyList();
      if (response.type === 'success') {
        return response.data;
      }
      throw new Error('회사 정보를 가져오는데 실패했습니다.');
    },
  });

  return { data, isLoading, isError };
};
