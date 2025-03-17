import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { VentureCapitalMyTab } from '@/feature/ventureCapital';

export const VentureCapitalMyPage = () => {
  return (
    <div className="min-h-screen bg-grey-50">
      <GlobalNavigationBar />
      <div className="mx-auto flex w-full flex-col gap-10 px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-2xl font-bold text-grey-900">마이페이지</h1>
        <VentureCapitalMyTab />
      </div>
    </div>
  );
};
