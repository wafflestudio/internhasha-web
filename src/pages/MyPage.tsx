import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookmarkListView } from '@/feature/post/ui/BookmarkListView';
import { ResumeListView } from '@/feature/resume';
import { MyInfo } from '@/feature/user';

export const MyPage = () => {
  return (
    <div className="min-h-screen bg-grey-light">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col py-[30px] mx-auto gap-10 w-full px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-darker">마이페이지</h1>

        <Tabs defaultValue="COFFEE_CHAT" className="w-full">
          <div className="flex flex-col gap-[30px]">
            <TabsList className="flex text-lg font-semibold">
              <TabsTrigger value="COFFEE_CHAT">신청한 커피챗</TabsTrigger>
              <TabsTrigger value="BOOKMARK">관심 공고</TabsTrigger>
              <TabsTrigger value="MY_INFO">내 정보</TabsTrigger>
            </TabsList>

            <TabsContent value="COFFEE_CHAT">
              <ResumeListView />
            </TabsContent>
            <TabsContent value="BOOKMARK">
              <BookmarkListView />
            </TabsContent>
            <TabsContent value="MY_INFO">
              <MyInfo />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
