import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoffeeChatNumberBadge } from '@/feature/coffeeChat';
import { CompanyCoffeeChatListView } from '@/feature/coffeeChat/ui/CompanyCoffeeChatListView';
import { MyPage } from '@/feature/ventureCapital/ui/MyPage';
import { MyPostList } from '@/feature/ventureCapital/ui/MyPostList';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const VentureCapitalMyTab = () => {
  const [currentTab, setCurrentTab] = useState<
    'POST' | 'COFFEE_CHAT' | 'MYPAGE'
  >('COFFEE_CHAT');
  const { coffeeChatCountData } = useGetCoffeeChatCount();

  if (coffeeChatCountData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }
  return (
    <Tabs
      defaultValue="COFFEE_CHAT"
      className="w-full"
      value={currentTab}
      onValueChange={(value) => {
        setCurrentTab(value as 'POST' | 'COFFEE_CHAT' | 'MYPAGE');
      }}
    >
      <div className="flex flex-col gap-[30px]">
        <TabsList className="flex gap-[30px]">
          <TabsTrigger value="COFFEE_CHAT" className="gap-1">
            나에게 신청된 커피챗
                <CoffeeChatNumberBadge />

          </TabsTrigger>
          <TabsTrigger value="POST">작성한 공고</TabsTrigger>
          <TabsTrigger value="MYPAGE">내 정보</TabsTrigger>
        </TabsList>

        <TabsContent value="COFFEE_CHAT">
          <CompanyCoffeeChatListView />
        </TabsContent>
        <TabsContent value="POST">
          <MyPostList />
        </TabsContent>
        <TabsContent value="MYPAGE">
          <MyPage />
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
