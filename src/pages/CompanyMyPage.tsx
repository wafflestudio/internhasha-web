import { useState } from 'react';

import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="w-max-[698px] mx-auto flex flex-col gap-10 px-6 py-[30px]">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <Tabs
          value={
            queryParams !== null && queryParams.tab !== 'BOOKMARK'
              ? queryParams.tab
              : 'COFFEE_CHAT'
          }
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex flex-col gap-[30px]">
            <TabsList className="align flex gap-[30px]">
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
      </div>
    </div>
  );
};
