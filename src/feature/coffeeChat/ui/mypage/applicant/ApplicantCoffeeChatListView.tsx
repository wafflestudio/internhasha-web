import { useQuery } from '@tanstack/react-query';

import { TagStatus } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ICON_SRC } from '@/entities/asset';
import { NoCoffeeChat } from '@/feature/coffeeChat/ui/mypage/common/NoCoffeeChat';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getShortenedDate } from '@/util/postFormatFunctions';

export const ApplicantCoffeeChatListView = () => {
  const { coffeeChatListData } = useGetCoffeeChatList();
  const { toCoffeeChatDetail } = useRouteNavigation();
  const { API_BASE_URL } = useGuardContext(EnvContext);
  if (coffeeChatListData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }
  if (
    coffeeChatListData?.type === 'success' &&
    coffeeChatListData.data.coffeeChatList.length === 0
  ) {
    return <NoCoffeeChat />;
  }

  return (
    <div className="flex w-full flex-col gap-3 text-grey-900">
      {coffeeChatListData !== undefined ? (
        coffeeChatListData.data.coffeeChatList.map((coffeeChat) => (
          <div
            key={coffeeChat.id}
            className="relative flex h-[50px] cursor-pointer items-center justify-between rounded-xl bg-white px-6 duration-300 hover:shadow-md"
            onClick={() => {
              toCoffeeChatDetail({ coffeeChatId: coffeeChat.id });
            }}
          >
            {coffeeChat.changed && (
              <div className="absolute left-[-5px] top-[20px]">
                <img src={ICON_SRC.BADGES} />
              </div>
            )}
            <div className="flex items-center gap-[10px]">
              <div className="h-[30px] w-[30px] rounded-md">
                {coffeeChat.company.imageKey !== undefined ? (
                  <img
                    src={`${API_BASE_URL}/${coffeeChat.company.imageKey}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={ICON_SRC.FAVICON.BLUE}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <span className="text-14 font-regular">
                {coffeeChat.company.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-grey-300">
                {getShortenedDate(coffeeChat.createdAt)}
              </span>
              {coffeeChat.coffeeChatStatus !== 'WAITING' && (
                <>
                  <div className="h-[18px] w-[2px] bg-grey-200"></div>
                  <span
                    className={
                      coffeeChat.coffeeChatStatus === 'ACCEPTED'
                        ? 'text-green-400'
                        : coffeeChat.coffeeChatStatus === 'REJECTED'
                          ? 'text-red-400'
                          : 'text-grey-800'
                    }
                  >
                    {getShortenedDate(coffeeChat.updatedAt)}
                  </span>
                </>
              )}
              <TagStatus coffeeChatStatus={coffeeChat.coffeeChatStatus} />
            </div>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={`loading-${idx}`}
              className="flex h-[50px] cursor-pointer items-center justify-between rounded-md bg-white px-[24px]"
            >
              <Skeleton className="h-[18px] w-[350px]" />
              <Skeleton className="h-6 w-[80px]" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const useGetCoffeeChatList = () => {
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
