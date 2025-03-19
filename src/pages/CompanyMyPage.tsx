import { useState } from 'react';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CoffeeChatNumberBadge,
  CompanyCoffeeChatListView,
} from '@/feature/coffeeChat';
import { CompanyProfile } from '@/feature/company';
import { MyPostList } from '@/feature/post/ui/mypage/company/MyPostList';

export const CompanyMyPage = () => {
  const [currentTab, setCurrentTab] = useState<
    'POST' | 'COFFEE_CHAT' | 'PROFILE'
  >('COFFEE_CHAT');

  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="mx-auto flex w-full flex-col gap-10 px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <Tabs
          defaultValue="COFFEE_CHAT"
          className="w-full"
          value={currentTab}
          onValueChange={(value) => {
            setCurrentTab(value as 'POST' | 'COFFEE_CHAT' | 'PROFILE');
          }}
        >
          <div className="flex flex-col gap-[30px]">
            <TabsList className="flex gap-[30px]">
              <TabsTrigger value="COFFEE_CHAT" className="gap-1">
                나에게 신청된 커피챗
                <CoffeeChatNumberBadge />
              </TabsTrigger>
              <TabsTrigger value="POST">작성한 공고</TabsTrigger>
              <TabsTrigger value="PROFILE">내 정보</TabsTrigger>
            </TabsList>

            <TabsContent value="COFFEE_CHAT">
              <CompanyCoffeeChatListView />
            </TabsContent>
            <TabsContent value="POST">
              <MyPostList />
            </TabsContent>
            <TabsContent value="PROFILE">
              <CompanyProfile />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
