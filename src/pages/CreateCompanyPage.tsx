import { PageLayout } from '@/components/ui/layout';
import { CreateCompanyProfileForm } from '@/feature/company';

export const CreateCompanyPage = () => {
  return (
    <PageLayout className="bg-white">
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm md:w-screen-md">
        <h2 className="text-2xl font-bold text-grey-900">회사 정보 작성</h2>
        <CreateCompanyProfileForm />
      </div>
    </PageLayout>
  );
};
