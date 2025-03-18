import { useQuery } from '@tanstack/react-query';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const CoffeeChatNumberBadge = () => {
  const { coffeeChatCountData } = useGetCoffeeChatCount();

  if (coffeeChatCountData === undefined) return null;

  if (coffeeChatCountData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  return (
    <span className="float-end ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B3261E] text-11 font-medium text-white no-underline data-[state=active]:no-underline">
      {coffeeChatCountData.data.num}
    </span>
  );
};
const useGetCoffeeChatCount = () => {
  const { token } = useGuardContext(TokenContext);
  const { coffeeChatService } = useGuardContext(ServiceContext);

  const { data: coffeeChatCountData } = useQuery({
    queryKey: ['coffeeChatService', 'getCoffeeChatCount', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.getCoffeeChatCount({ token: t });
    },
    enabled: token !== null,
  });

  return { coffeeChatCountData };
};
