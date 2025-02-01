import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MyCompanyList } from '@/feature/ventureCapital/ui/MyCompanyList';
import { MyPage } from '@/feature/ventureCapital/ui/MyPage';
import { MyPostList } from '@/feature/ventureCapital/ui/MyPostList';

export const VentureCapitalLandingTab = () => {
  return (
    <Tabs defaultValue="COMPANY" className="w-full">
      <div className="flex flex-col gap-[30px]">
        <TabsList className="flex text-lg font-medium">
          <TabsTrigger value="COMPANY">관리 기업</TabsTrigger>
          <TabsTrigger value="RESUME">작성한 공고</TabsTrigger>
          <TabsTrigger value="MYPAGE">내 정보</TabsTrigger>
        </TabsList>

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
