import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { ProfileRouteQuery } from '@/entities/route';
import { CreateProfileForm } from '@/feature/applicant';
import { useRouteLocation } from '@/shared/route/useRouteParams';

export const CreateProfilePage = () => {
  const body = useRouteLocation() as ProfileRouteQuery | undefined;

  if (body === undefined) {
    return (
      <div className="min-h-screen">
        <GlobalNavigationBar />
        <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg">
          <h2 className="text-2xl font-bold">프로필 작성</h2>
          <CreateProfileForm />
        </div>
      </div>
    );
  }

  return (
    <div>
      <GlobalNavigationBar />
      <h1>프로필 수정하기</h1>
      {/* TODO: 프로필 수정 페이지 생성 */}
    </div>
  );
};
