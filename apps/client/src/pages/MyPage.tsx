import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs/tabs.tsx';
import { ResumeListView } from '@/feature/resume';
import { MyInfo } from '@/feature/user';

export const MyPage = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="max-w-screen-lg mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">마이페이지</h1>

        <Tabs defaultValue="coffeeChat" className="w-full bg-gray-">
          <TabsList className="flex space-x-6
          text-lg font-medium text-gray-500
          border-b bg-gray-50 border-gray-200 pb-2
          rounded-none">
            <TabsTrigger value="coffeeChat">신청한 커피챗</TabsTrigger>
            <TabsTrigger value="favorites">관심 공고</TabsTrigger>
            <TabsTrigger value="myInfo">내 정보</TabsTrigger>
          </TabsList>

          <TabsContent value="coffeeChat">
            <ResumeListView />
          </TabsContent>
          <TabsContent value="favorites">
            <span>관심 공고</span>
          </TabsContent>
          <TabsContent value="myInfo">
            <MyInfo />
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};
