import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { TagCoffeeChat } from '@/components/ui/tagCoffeeChat';
import { ICON_SRC } from '@/entities/asset';
import { NoCoffeeChat } from '@/feature/coffeeChat/ui/NoCoffeeChat';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getShortenedDate } from '@/util/postFormatFunctions';

export const CoffeeChatListView = () => {
  const { coffeeChatListData } = useGetCoffeeChatList();
  const { toCoffeeChatDetail } = useRouteNavigation();

  if (coffeeChatListData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }
  if (
    coffeeChatListData?.type === 'success' &&
    Array.isArray(coffeeChatListData.data) &&
    coffeeChatListData.data.length === 0
  ) {
    return <NoCoffeeChat />;
  }

  return (
    <div className="flex flex-col w-full gap-3">
      {coffeeChatListData !== undefined ? (
        coffeeChatListData.data.coffeeChatList.map((coffeeChat) => (
          <div
            key={coffeeChat.id}
            className="flex px-6 h-[50px] justify-between items-center cursor-pointer bg-white rounded-xl duration-300 hover:shadow-md"
            onClick={() => {
              toCoffeeChatDetail({ coffeeChatId: coffeeChat.id });
            }}
          >
            <div className="flex items-center gap-2">
              {/* TODO: changed 말고 다른 read 변수에 따라 변해야함 */}
              {coffeeChat.changed && <img src={ICON_SRC.BADGES} />}
              <span className="text-grey-darker font-regular text-14 truncate">
                {coffeeChat.company.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-grey-normal">
                {getShortenedDate(coffeeChat.createdAt)}
              </span>
              <TagCoffeeChat coffeeChatStatus={coffeeChat.coffeeChatStatus} />
            </div>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={`loading-${idx}`}
              className="flex px-[24px] h-[50px] justify-between items-center cursor-pointer bg-white rounded-md"
            >
              <Skeleton className="w-[350px] h-[18px]" />
              <Skeleton className="w-[80px] h-6" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export const useGetCoffeeChatList = () => {
  const { token } = useGuardContext(TokenContext);
  const { coffeeChatService } = useGuardContext(ServiceContext);

  const { data: coffeeChatListData } = useQuery({
    queryKey: ['coffeeChatService', 'getCoffeeChatList', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return coffeeChatService.getCoffeeChatList({ token: t });
    },
    enabled: token !== null,
  });

  if (coffeeChatListData?.type === 'success') {
    coffeeChatListData.data.coffeeChatList.sort((a, b) => {
      if (
        a.coffeeChatStatus === 'WAITING' &&
        b.coffeeChatStatus !== 'WAITING'
      ) {
        return -1;
      }
      if (
        a.coffeeChatStatus !== 'WAITING' &&
        b.coffeeChatStatus === 'WAITING'
      ) {
        return 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  return { coffeeChatListData };
};
