import { useQuery } from '@tanstack/react-query';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoffeeChatListView } from '@/feature/coffeeChat';
import { BookmarkListView } from '@/feature/post/ui/BookmarkListView';
import { MyInfo } from '@/feature/user';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
export const CoffeeChatTabs = () => {
  const { coffeeChatCountData } = useGetCoffeeChatCount();

  if (coffeeChatCountData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  return (
    <Tabs defaultValue="COFFEE_CHAT" className="w-full">
      <div className="flex flex-col gap-[30px]">
        <TabsList className="flex  gap-[30px]">
          <TabsTrigger value="COFFEE_CHAT" className="gap-1">
            신청한 커피챗
            {coffeeChatCountData?.type === 'success' && (
              <span className="float-end flex items-center justify-center w-4 h-4 text-white text-11 font-medium bg-[#B3261E] rounded-full ml-1 no-underline data-[state=active]:no-underline">
                {coffeeChatCountData.data.num}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="BOOKMARK">관심 공고</TabsTrigger>
          <TabsTrigger value="MY_INFO">내 정보</TabsTrigger>
        </TabsList>

        <TabsContent value="COFFEE_CHAT">
          <CoffeeChatListView />
        </TabsContent>
        <TabsContent value="BOOKMARK">
          <BookmarkListView />
        </TabsContent>
        <TabsContent value="MY_INFO">
          <MyInfo />
        </TabsContent>
      </div>
    </Tabs>
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
