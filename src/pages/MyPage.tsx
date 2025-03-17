import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { CoffeeChatTabs } from '@/feature/coffeeChat/ui/CoffeeChatTabs';

export const MyPage = () => {
  return (
    <div className="min-h-screen bg-grey-light">
      <GlobalNavigationBar />
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col py-[30px] mx-auto gap-10 w-full px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-darker">마이페이지</h1>
        <CoffeeChatTabs />
      </div>
    </div>
  );
};
