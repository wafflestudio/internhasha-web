import { useQuery } from '@tanstack/react-query';
import type React from 'react';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const CoffeeChatNumberBadge = ({
  onClick,
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const { coffeeChatCountData } = useGetCoffeeChatCount();

  if (coffeeChatCountData === undefined) return null;

  if (coffeeChatCountData.type === 'error') {
    return null;
  }
  if (coffeeChatCountData.data.num === 0) {
    return null;
  }
  return (
    <button
      className="float-end ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-red text-11 font-medium text-white no-underline data-[state=active]:no-underline"
      onClick={onClick}
    >
      {coffeeChatCountData.data.num >= 10 ? '9+' : coffeeChatCountData.data.num}
    </button>
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
