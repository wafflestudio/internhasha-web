import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApplicantInfo } from '@/feature/applicant';
import { ApplicantCoffeeChatListView } from '@/feature/coffeeChat';
import { CoffeeChatNumberBadge } from '@/feature/coffeeChat';
import { BookmarkListView } from '@/feature/post/ui/mypage/applicant/BookmarkListView';

export const ApplicantMyPage = () => {
  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="mx-auto flex w-full flex-col gap-10 px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <Tabs defaultValue="COFFEE_CHAT" className="w-full">
          <div className="flex flex-col gap-[30px]">
            <TabsList className="flex gap-[30px]">
              <TabsTrigger value="COFFEE_CHAT" className="gap-1">
                신청한 커피챗
                <CoffeeChatNumberBadge />
              </TabsTrigger>
              <TabsTrigger value="BOOKMARK">관심 공고</TabsTrigger>
              <TabsTrigger value="MY_INFO">내 정보</TabsTrigger>
            </TabsList>

            <TabsContent value="COFFEE_CHAT">
              <ApplicantCoffeeChatListView />
            </TabsContent>
            <TabsContent value="BOOKMARK">
              <BookmarkListView />
            </TabsContent>
            <TabsContent value="MY_INFO">
              <ApplicantInfo />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
