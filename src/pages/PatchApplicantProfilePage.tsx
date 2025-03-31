import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { PatchProfileForm } from '@/feature/applicant/ui/form/PatchProfileForm';

export const PatchApplicantProfilePage = () => {
  return (
    <div className="min-h-screen">
      <GlobalNavigationBar />
      <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg">
        <h2 className="text-2xl font-bold">프로필 수정</h2>
        <PatchProfileForm />
      </div>
    </div>
  );
};
