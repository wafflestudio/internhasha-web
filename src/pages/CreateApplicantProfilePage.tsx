import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { CreateProfileForm } from '@/feature/applicant';

export const CreateApplicantProfilePage = () => {
  return (
    <div className="min-h-screen">
      <GlobalNavigationBar />
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm">
        <h2 className="text-2xl font-bold">프로필 작성</h2>
        <CreateProfileForm />
      </div>
    </div>
  );
};
