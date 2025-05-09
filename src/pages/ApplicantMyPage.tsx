import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICON_SRC } from '@/entities/asset';
import type { MyPageRouteQuery } from '@/entities/route';
import { ApplicantProfileView } from '@/feature/applicant/ui/mypage/ApplicantProfileView';
import { ApplicantCoffeeChatListView } from '@/feature/coffeeChat';
import { CoffeeChatNumberBadge } from '@/feature/coffeeChat';
import { BookmarkListView } from '@/feature/post/ui/mypage/applicant/BookmarkListView';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteQueryParams } from '@/shared/route/useRouteParams';

type MyPageTab = MyPageRouteQuery['tab'];

export const ApplicantMyPage = () => {
  const queryParams = useRouteQueryParams() as MyPageRouteQuery | null;
  const { toMyPage, toPatchProfile } = useRouteNavigation();
  const [isExistProfile, setIsExistProfile] = useState(false);

  const handleTabChange = (tab: string) => {
    toMyPage({ query: { tab: tab as MyPageTab } });
  };

  const WideTabBar = () => {
    return (
      <Tabs
        value={queryParams !== null ? queryParams.tab : 'COFFEE_CHAT'}
        onValueChange={handleTabChange}
        className="hidden w-full sm:block"
      >
        <div className="flex flex-col gap-[30px]">
          <TabsList className="flex gap-[30px]">
            <TabsTrigger value="COFFEE_CHAT" className="gap-1">
              신청한 커피챗
              <CoffeeChatNumberBadge />
            </TabsTrigger>
            <TabsTrigger value="BOOKMARK">관심 공고</TabsTrigger>
            <TabsTrigger value="PROFILE">내 정보</TabsTrigger>
            <TabsContent value="PROFILE" className="ml-auto">
              {isExistProfile && (
                <Button
                  onClick={toPatchProfile}
                  className="font-medium"
                  size="sm"
                >
                  <img src={ICON_SRC.EDIT.WHITE} />
                  프로필 수정
                </Button>
              )}
            </TabsContent>
          </TabsList>

          <TabsContent value="COFFEE_CHAT">
            <ApplicantCoffeeChatListView />
          </TabsContent>
          <TabsContent value="BOOKMARK">
            <BookmarkListView />
          </TabsContent>
          <TabsContent value="PROFILE">
            <ApplicantProfileView setIsExistProfile={setIsExistProfile} />
          </TabsContent>
        </div>
      </Tabs>
    );
  };

  const NarrowTabBar = () => {
    return (
      <Tabs
        value={queryParams !== null ? queryParams.tab : 'COFFEE_CHAT'}
        onValueChange={handleTabChange}
        className="block w-full sm:hidden"
      >
        <div className="flex flex-col gap-6">
          <TabsList size="small" className="gap-3">
            <TabsTrigger value="COFFEE_CHAT" size="small">
              <div className="flex flex-col items-center gap-1">
                <span>신청한 커피챗</span>
                <CoffeeChatNumberBadge />
              </div>
            </TabsTrigger>
            <TabsTrigger value="BOOKMARK" size="small">
              관심 공고
            </TabsTrigger>
            <TabsTrigger value="PROFILE" size="small">
              내 정보
            </TabsTrigger>
          </TabsList>

          {queryParams?.tab === 'PROFILE' && isExistProfile && (
            <div className="flex justify-end">
              <Button
                onClick={toPatchProfile}
                className="w-full text-xs font-medium sm:w-fit"
                size="sm"
              >
                <img
                  src={ICON_SRC.EDIT.WHITE}
                  alt="Edit"
                  className="mr-1 h-4 w-4"
                />
                프로필 수정
              </Button>
            </div>
          )}

          <TabsContent value="COFFEE_CHAT">
            <ApplicantCoffeeChatListView />
          </TabsContent>
          <TabsContent value="BOOKMARK">
            <BookmarkListView />
          </TabsContent>
          <TabsContent value="PROFILE">
            <ApplicantProfileView setIsExistProfile={setIsExistProfile} />
          </TabsContent>
        </div>
      </Tabs>
    );
  };

  return (
    <PageLayout>
      <div className="mx-auto flex w-full max-w-[698px] flex-col gap-10 px-6 py-[30px]">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <WideTabBar />
        <NarrowTabBar />
      </div>
    </PageLayout>
  );
};
