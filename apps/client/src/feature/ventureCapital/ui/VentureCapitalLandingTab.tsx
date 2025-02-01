import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICON_SRC } from '@/entities/asset';
import { MyCompanyList } from '@/feature/ventureCapital/ui/MyCompanyList';
import { MyPage } from '@/feature/ventureCapital/ui/MyPage';
import { MyPostList } from '@/feature/ventureCapital/ui/MyPostList';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const VentureCapitalLandingTab = () => {
  const { toCreateCompany } = useRouteNavigation();
  const [currentTab, setCurrentTab] = useState<'COMPANY' | 'RESUME' | 'MYPAGE'>(
    'COMPANY',
  );
  return (
    <Tabs
      defaultValue="COMPANY"
      className="w-full"
      value={currentTab}
      onValueChange={(value) => {
        setCurrentTab(value as 'COMPANY' | 'RESUME' | 'MYPAGE');
      }}
    >
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-4 xs:flex-row w-full xs:justify-between">
          <TabsList className="flex text-lg font-medium">
            <TabsTrigger value="COMPANY">관리 기업</TabsTrigger>
            <TabsTrigger value="RESUME">작성한 공고</TabsTrigger>
            <TabsTrigger value="MYPAGE">내 정보</TabsTrigger>
          </TabsList>
          {currentTab === 'COMPANY' && (
            <Button
              size="sm"
              onClick={() => {
                toCreateCompany({});
              }}
            >
              <img src={ICON_SRC.PLUS} className="text-md" />
              회사 추가
            </Button>
          )}
        </div>

        <TabsContent value="COMPANY">
          <MyCompanyList />
        </TabsContent>
        <TabsContent value="RESUME">
          <MyPostList />
        </TabsContent>
        <TabsContent value="MYPAGE">
          <MyPage />
        </TabsContent>
      </div>
    </Tabs>
  );
};
