import { PageLayout } from '@/components/ui/layout';
import { PatchProfileForm } from '@/feature/applicant/ui/form/PatchProfileForm';

export const PatchApplicantProfilePage = () => {
  return (
    <PageLayout className="bg-white">
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm">
        <h2 className="text-2xl font-bold">프로필 수정</h2>
        <PatchProfileForm />
      </div>
    </PageLayout>
  );
};
