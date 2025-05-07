import { useQuery } from '@tanstack/react-query';

import { TagStatus } from '@/components/ui/badge';
import { ICON_SRC } from '@/entities/asset';
import { ApplicantCoffeeChatListSkeleton } from '@/feature/coffeeChat/ui/mypage/applicant/ApplicantCoffeeChatListSkeleton';
import { ApplicantNoCoffeeChat } from '@/feature/coffeeChat/ui/mypage/applicant/ApplicantNoCoffeeChat';
import { CoffeeChatInfo } from '@/feature/coffeeChat/ui/mypage/common/CoffeeChatInfo';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getShortenedDate } from '@/util/date';

export const ApplicantCoffeeChatListView = () => {
  const { coffeeChatListData } = useGetCoffeeChatList();
  const { toCoffeeChatDetail } = useRouteNavigation();
  if (coffeeChatListData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }
  if (
    coffeeChatListData?.type === 'success' &&
    coffeeChatListData.data.coffeeChatList.length === 0
  ) {
    return <ApplicantNoCoffeeChat />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 커피챗 관련 설명 */}
      <CoffeeChatInfo />
      {/* 커피챗 리스트 */}
      <div className="flex w-full flex-col gap-3 text-grey-900">
        {coffeeChatListData !== undefined ? (
          coffeeChatListData.data.coffeeChatList.map((coffeeChat) => (
            <div
              key={coffeeChat.id}
              className="relative flex flex-row items-center justify-between rounded-xl bg-white px-6 py-4 duration-300 hover:shadow-md max-xs:flex-col max-xs:items-start max-xs:gap-0 max-xs:px-4 max-xs:py-3"
              onClick={() => {
                toCoffeeChatDetail({ coffeeChatId: coffeeChat.id });
              }}
            >
              {coffeeChat.changed && (
                <div className="absolute left-[-5px] top-[20px]">
                  <img src={ICON_SRC.BADGES} />
                </div>
              )}
              <div className="flex items-center gap-[10px] max-xs:justify-start">
                <div className="h-[30px] w-[30px] rounded-md">
                  {coffeeChat.company.imageKey !== undefined ? (
                    <img
                      src={`/${coffeeChat.company.imageKey}`}
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
              <div className="flex items-center gap-2 max-xs:w-full max-xs:justify-end">
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
          <ApplicantCoffeeChatListSkeleton />
        )}
      </div>
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
