import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { CoffeeChatTabs } from '@/feature/coffeeChat/ui/CoffeeChatTabs';

export const MyPage = () => {
  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="mx-auto flex w-full flex-col gap-10 px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <CoffeeChatTabs />
      </div>
    </div>
  );
};
