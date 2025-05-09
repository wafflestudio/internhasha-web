import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICON_SRC } from '@/entities/asset';
import type { MyPageRouteQuery } from '@/entities/route';
import {
  CoffeeChatNumberBadge,
  CompanyCoffeeChatListView,
} from '@/feature/coffeeChat';
import { CompanyCoffeeChatButton } from '@/feature/coffeeChat/ui/mypage/company/CompanyCoffeeChatButton';
import { CompanyProfileView } from '@/feature/company';
import { MyPostList } from '@/feature/post/ui/mypage/company/MyPostList';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteQueryParams } from '@/shared/route/useRouteParams';
type MyPageTab = MyPageRouteQuery['tab'];

export const CompanyMyPage = () => {
  const queryParams = useRouteQueryParams() as MyPageRouteQuery | null;
  const { toCreatePost, toMyPage, toPatchCompany } = useRouteNavigation();
  const [isExistProfile, setIsExistProfile] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [selectedChats, setSelectedChats] = useState<string[]>([]);

  const [isSelectMode, setIsSelectMode] = useState(false);

  const handleTabChange = (tab: string) => {
    toMyPage({ query: { tab: tab as MyPageTab } });
  };

  const WideTabBar = () => {
    return (
      <Tabs
        value={
          queryParams !== null && queryParams.tab !== 'BOOKMARK'
            ? queryParams.tab
            : 'COFFEE_CHAT'
        }
        onValueChange={handleTabChange}
        className="hidden w-full sm:block"
      >
        <div className="flex flex-col gap-[30px]">
          <TabsList className="gap-[30px]">
            <TabsTrigger value="COFFEE_CHAT" className="gap-1">
              나에게 신청된 커피챗
              <CoffeeChatNumberBadge />
            </TabsTrigger>
            <TabsTrigger value="POST">작성한 공고</TabsTrigger>
            <TabsTrigger value="PROFILE">내 정보</TabsTrigger>
            <TabsContent value="POST" className="ml-auto">
              {isExistProfile && (
                <Button
                  onClick={() => {
                    if (companyId === null) {
                      return;
                    }
                    toCreatePost({ companyId: companyId });
                  }}
                  className="font-medium"
                  size="sm"
                >
                  <img src={ICON_SRC.PLUS} />
                  공고 추가
                </Button>
              )}
            </TabsContent>
            <TabsContent value="PROFILE" className="ml-auto">
              {isExistProfile && (
                <Button
                  onClick={toPatchCompany}
                  className="font-medium"
                  size="sm"
                >
                  <img src={ICON_SRC.EDIT.WHITE} />
                  회사 정보 수정
                </Button>
              )}
            </TabsContent>
            <TabsContent value="COFFEE_CHAT" className="ml-auto">
              <CompanyCoffeeChatButton
                isSelectMode={isSelectMode}
                setIsSelectMode={setIsSelectMode}
                selectedChats={selectedChats}
                setSelectedChats={setSelectedChats}
              />
            </TabsContent>
          </TabsList>

          <TabsContent value="COFFEE_CHAT">
            <CompanyCoffeeChatListView
              setSelectedChats={setSelectedChats}
              selectedChats={selectedChats}
              isSelectMode={isSelectMode}
            />
          </TabsContent>
          <TabsContent value="POST">
            <MyPostList
              setIsExistProfile={setIsExistProfile}
              setCompanyId={setCompanyId}
            />
          </TabsContent>
          <TabsContent value="PROFILE">
            <CompanyProfileView setIsExistProfile={setIsExistProfile} />
          </TabsContent>
        </div>
      </Tabs>
    );
  };

  const NarrowTabBar = () => {
    return (
      <Tabs
        value={
          queryParams !== null && queryParams.tab !== 'BOOKMARK'
            ? queryParams.tab
            : 'COFFEE_CHAT'
        }
        onValueChange={handleTabChange}
        className="block w-full sm:hidden"
      >
        <div className="flex flex-col gap-[30px]">
          <TabsList className="align flex gap-3" size="small">
            <TabsTrigger value="COFFEE_CHAT" className="gap-1" size="small">
              <div className="flex flex-col gap-1">
                <span>나에게 신청된</span>
                <span>커피챗</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="POST" size="small">
              <div className="flex flex-col gap-1">작성한 공고</div>
            </TabsTrigger>
            <TabsTrigger value="PROFILE" size="small">
              내 정보
            </TabsTrigger>
          </TabsList>

          {queryParams?.tab === 'POST' && isExistProfile && (
            <div className="flex w-full">
              <Button
                onClick={() => {
                  if (companyId === null) {
                    return;
                  }
                  toCreatePost({ companyId: companyId });
                }}
                className="w-full"
                size="sm"
              >
                <img src={ICON_SRC.PLUS} />
                공고 추가
              </Button>
            </div>
          )}
          {queryParams?.tab === 'PROFILE' && isExistProfile && (
            <div className="flex w-full">
              <Button onClick={toPatchCompany} className="w-full" size="sm">
                <img src={ICON_SRC.EDIT.WHITE} />
                회사 정보 수정
              </Button>
            </div>
          )}
          {(queryParams === null || queryParams.tab === 'COFFEE_CHAT') && (
            <div className="flex w-full">
              <CompanyCoffeeChatButton
                isSelectMode={isSelectMode}
                setIsSelectMode={setIsSelectMode}
                selectedChats={selectedChats}
                setSelectedChats={setSelectedChats}
              />
            </div>
          )}

          <TabsContent value="COFFEE_CHAT">
            <CompanyCoffeeChatListView
              setSelectedChats={setSelectedChats}
              selectedChats={selectedChats}
              isSelectMode={isSelectMode}
            />
          </TabsContent>
          <TabsContent value="POST">
            <MyPostList
              setIsExistProfile={setIsExistProfile}
              setCompanyId={setCompanyId}
            />
          </TabsContent>
          <TabsContent value="PROFILE">
            <CompanyProfileView setIsExistProfile={setIsExistProfile} />
          </TabsContent>
        </div>
      </Tabs>
    );
  };

  return (
    <PageLayout>
      <div className="mx-auto flex max-w-[698px] flex-col gap-10 px-6 py-[30px]">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <WideTabBar />
        <NarrowTabBar />
      </div>
    </PageLayout>
  );
};
