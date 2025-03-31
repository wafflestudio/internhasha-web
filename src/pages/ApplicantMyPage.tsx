import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { MyPageRouteQuery } from '@/entities/route';
import { ApplicantInfo } from '@/feature/applicant';
import { ApplicantCoffeeChatListView } from '@/feature/coffeeChat';
import { CoffeeChatNumberBadge } from '@/feature/coffeeChat';
import { BookmarkListView } from '@/feature/post/ui/mypage/applicant/BookmarkListView';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteQueryParams } from '@/shared/route/useRouteParams';

type MyPageTab = MyPageRouteQuery['tab'];

export const ApplicantMyPage = () => {
  const queryParams = useRouteQueryParams() as MyPageRouteQuery | null;
  const { toMyPage } = useRouteNavigation();

  const handleTabChange = (tab: string) => {
    toMyPage({ query: { tab: tab as MyPageTab } });
  };

  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="mx-auto flex w-full flex-col gap-10 px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <Tabs
          value={queryParams !== null ? queryParams.tab : 'COFFEE_CHAT'}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex flex-col gap-[30px]">
            <TabsList className="flex gap-[30px]">
              <TabsTrigger value="COFFEE_CHAT" className="gap-1">
                신청한 커피챗
                <CoffeeChatNumberBadge />
              </TabsTrigger>
              <TabsTrigger value="BOOKMARK">관심 공고</TabsTrigger>
              <TabsTrigger value="PROFILE">내 정보</TabsTrigger>
            </TabsList>

            <TabsContent value="COFFEE_CHAT">
              <ApplicantCoffeeChatListView />
            </TabsContent>
            <TabsContent value="BOOKMARK">
              <BookmarkListView />
            </TabsContent>
            <TabsContent value="PROFILE">
              <div className="w-[700px] gap-6 rounded-lg bg-white px-[24px] py-[48px] text-grey-900">
                <ApplicantInfo fetchOwnInfo={true} />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
