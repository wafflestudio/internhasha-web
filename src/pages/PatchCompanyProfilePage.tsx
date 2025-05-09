import { PageLayout } from '@/components/ui/layout';
import { PatchCompanyProfileForm } from '@/feature/company/ui/form/PatchCompanyForm';

export const PatchCompanyProfilePage = () => {
  return (
    <PageLayout className="bg-white">
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm md:w-screen-md">
        <h2 className="text-2xl font-bold">프로필 수정</h2>
        <PatchCompanyProfileForm />
      </div>
    </PageLayout>
  );
};
