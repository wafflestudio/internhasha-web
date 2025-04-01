import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { CreateCompanyProfileForm } from '@/feature/company';

export const CreateCompanyPage = () => {
  return (
    <div className="min-h-screen">
      <GlobalNavigationBar />
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg">
        <h2 className="text-2xl font-bold text-grey-900">회사 정보 작성</h2>
        <CreateCompanyProfileForm />
      </div>
    </div>
  );
};
