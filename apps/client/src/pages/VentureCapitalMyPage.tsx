import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { VentureCapitalMyTab } from '@/feature/ventureCapital';

export const VentureCapitalMyPage = () => {
  return (
    <div className="min-h-screen bg-grey-light">
      <GlobalNavigationBar />
      <div className="flex flex-col py-[30px] mx-auto gap-10 w-full px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-darker">마이페이지</h1>
        <VentureCapitalMyTab />
      </div>
    </div>
  );
};
