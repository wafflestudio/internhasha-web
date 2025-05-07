import { useQuery } from '@tanstack/react-query';

import { TagStatus } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ICON_SRC } from '@/entities/asset';
import { CoffeeChatInfo } from '@/feature/coffeeChat/ui/mypage/common/CoffeeChatInfo';
import { CompanyCoffeeChatListViewSkeleton } from '@/feature/coffeeChat/ui/mypage/company/CompanyCoffeeChatListViewSkeleton';
import { CompanyNoCoffeeChat } from '@/feature/coffeeChat/ui/mypage/company/CompanyNoCoffeeChat';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { getShortenedDate } from '@/util/postFormatFunctions';

type CompanyCoffeeChatListViewProps = {
  selectedChats: string[];
  setSelectedChats: React.Dispatch<React.SetStateAction<string[]>>;
  isSelectMode: boolean;
};

export const CompanyCoffeeChatListView = ({
  selectedChats,
  setSelectedChats,
  isSelectMode,
}: CompanyCoffeeChatListViewProps) => {
  const { coffeeChatListData } = useGetCoffeeChatList();
  const { toCoffeeChatDetail } = useRouteNavigation();
  const handleSelectChat = (coffeeChatId: string) => {
    setSelectedChats((prev) =>
      prev.includes(coffeeChatId)
        ? prev.filter((id) => id !== coffeeChatId)
        : [...prev, coffeeChatId],
    );
  };

  if (coffeeChatListData === undefined) {
    return <CompanyCoffeeChatListViewSkeleton />;
  }

  if (coffeeChatListData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const { coffeeChatList } = coffeeChatListData.data;

  if (coffeeChatList.length === 0) {
    return <CompanyNoCoffeeChat />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 커피챗 설명 */}
      <CoffeeChatInfo />
      {/* 커피챗 리스트 */}
      <div className="flex w-full flex-col gap-3">
        {coffeeChatList.map((coffeeChat) => (
          <div key={coffeeChat.id} className="flex items-center gap-4">
            {isSelectMode && (
              <div className="flex w-[20px] items-center justify-center">
                {coffeeChat.coffeeChatStatus === 'WAITING' && (
                  <Checkbox
                    checked={selectedChats.includes(coffeeChat.id)}
                    onClick={() => {
                      handleSelectChat(coffeeChat.id);
                    }}
                  />
                )}
              </div>
            )}
            <div
              key={coffeeChat.id}
              className="relative ml-2 flex flex-1 cursor-pointer items-center justify-between rounded-xl bg-white px-6 py-4 duration-300 hover:shadow-md max-xs:flex-col max-xs:items-start max-xs:gap-0 max-xs:px-4 max-xs:py-3"
              onClick={() => {
                toCoffeeChatDetail({ coffeeChatId: coffeeChat.id });
              }}
            >
              {coffeeChat.coffeeChatStatus === 'WAITING' && !isSelectMode && (
                <div className="absolute left-[-5px] top-[25px] max-xs:top-[35px]">
                  <img src={ICON_SRC.BADGES} />
                </div>
              )}
              <div className="flex items-center gap-2 max-xs:justify-start">
                <span className="truncate text-14 font-regular text-grey-900">
                  {coffeeChat.applicant.name}
                </span>
                <span className="truncate text-12 font-regular text-grey-700">
                  {coffeeChat.positionType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-13 font-regular max-xs:w-full max-xs:justify-end">
                <span className="text-grey-400">
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
          </div>
        ))}
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
    select: (responseData) => {
      if (responseData.type === 'success') {
        return {
          ...responseData,
          data: {
            ...responseData.data,
            coffeeChatList: [...responseData.data.coffeeChatList].sort(
              (a, b) => {
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
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              },
            ),
          },
        };
      }
      return responseData;
    },
    enabled: token !== null,
  });

  return { coffeeChatListData };
};
