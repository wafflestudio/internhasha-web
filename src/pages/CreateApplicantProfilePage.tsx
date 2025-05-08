import { PageLayout } from '@/components/ui/layout';
import { CreateProfileForm } from '@/feature/applicant';

export const CreateApplicantProfilePage = () => {
  return (
    <PageLayout className="bg-white">
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm">
        <h2 className="text-2xl font-bold">프로필 작성</h2>
        <CreateProfileForm />
      </div>
    </PageLayout>
  );
};
