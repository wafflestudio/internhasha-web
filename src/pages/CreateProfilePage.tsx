import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { CreateProfileForm } from '@/feature/applicant';
import type { ProfileRouteBody } from '@/shared/route/scheme';
import { useRouteLocation } from '@/shared/route/useRouteLocation';

export const CreateProfilePage = () => {
  const state = useRouteLocation() as { body: ProfileRouteBody } | null;

  if (state === null) {
    return (
      <div className="min-h-screen">
        <GlobalNavigationBar />
        <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg">
          <h2 className="text-2xl font-bold">내 프로필 작성</h2>
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
