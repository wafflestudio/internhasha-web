import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/tabs/tabs.tsx';
import { ResumeListView } from '@/feature/resume';
import { MyInfo } from '@/feature/user';
import { BookmarkListView } from '@/feature/post/ui/BookmarkListView.tsx';

export const MyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-[20%]">
          마이페이지
        </h1>

        <Tabs defaultValue="coffeeChat" className="w-full ml-[20%] max-w-[90%]">
          <TabsList
            className="flex space-x-6
          text-lg font-medium text-gray-500
          bg-gray-50 pb-2
          rounded-none"
          >
            <TabsTrigger value="coffeeChat">신청한 커피챗</TabsTrigger>
            <TabsTrigger value="favorites">관심 공고</TabsTrigger>
            <TabsTrigger value="myInfo">내 정보</TabsTrigger>
          </TabsList>

          <TabsContent value="coffeeChat">
            <ResumeListView />
          </TabsContent>
          <TabsContent value="favorites">
            <BookmarkListView/>
          </TabsContent>
          <TabsContent value="myInfo">
            <MyInfo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
