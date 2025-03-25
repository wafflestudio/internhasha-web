import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { CoffeeChatStatus } from '@/api/apis/localServer/schemas';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const useGetCoffeeChatDetail = ({
  coffeeChatId,
}: {
  coffeeChatId: string;
}) => {
  const { token } = useGuardContext(TokenContext);
  const { coffeeChatService } = useGuardContext(ServiceContext);

  const { data: coffeeChatDetailData } = useQuery({
    queryKey: ['user', 'coffeeChat', coffeeChatId, token] as const,
    queryFn: ({ queryKey: [, , , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.getCoffeeChatDetail({
        token: t,
        coffeeChatId: coffeeChatId,
      });
    },
    enabled: token !== null,
  });

  return { coffeeChatDetailData: coffeeChatDetailData };
};

export const useUpdateCoffeeChatStatus = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { coffeeChatService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toMyPage } = useRouteNavigation();
  const queryClient = useQueryClient();

  const { mutate: updateCoffeeChatStatus, isPending } = useMutation({
    mutationFn: ({
      coffeeChatList,
      coffeeChatStatus,
    }: {
      coffeeChatList: string[];
      coffeeChatStatus: CoffeeChatStatus;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.updateCoffeeChatStatus({
        token,
        body: {
          coffeeChatStatus,
          coffeeChatList,
        },
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        toMyPage({ query: { tab: 'COFFEE_CHAT' } });
      } else {
        setResponseMessage(response.code);
      }
    },
    onError: () => {
      setResponseMessage('취소에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });
  return {
    updateCoffeeChatStatus,
    isPending,
  };
};
