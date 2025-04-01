import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICON_SRC } from '@/entities/asset';
import type { MyPageRouteQuery } from '@/entities/route';
import {
  CoffeeChatNumberBadge,
  CompanyCoffeeChatListView,
} from '@/feature/coffeeChat';
import { CompanyProfile } from '@/feature/company';
import { MyPostList } from '@/feature/post/ui/mypage/company/MyPostList';
import { useGuardContext } from '@/shared/context/hooks';
import { UserContext } from '@/shared/context/UserContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { useRouteQueryParams } from '@/shared/route/useRouteParams';
type MyPageTab = MyPageRouteQuery['tab'];

export const CompanyMyPage = () => {
  const queryParams = useRouteQueryParams() as MyPageRouteQuery | null;
  const { id } = useGuardContext(UserContext);
  const { toCreatePost, toMyPage } = useRouteNavigation();
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
                <Button
                  onClick={() => {
                    if (id === null) {
                      return;
                    }
                    toCreatePost({ companyId: id });
                  }}
                >
                  <img src={ICON_SRC.PLUS} />
                  공고 추가
                </Button>
              </TabsContent>
            </TabsList>

            <TabsContent value="COFFEE_CHAT">
              <CompanyCoffeeChatListView />
            </TabsContent>
            <TabsContent value="POST">
              <MyPostList />
            </TabsContent>
            <TabsContent value="PROFILE">
              <CompanyProfile />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
