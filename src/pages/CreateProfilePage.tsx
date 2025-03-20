import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { JobMinorCategory } from '@/entities/post';
import { CreateProfileForm } from '@/feature/applicant';
import { useRouteLocation } from '@/shared/route/useRouteLocation';

type ExternalLink = {
  link: string;
  description: string;
};

type Body = {
  profileBody?: {
    enrollYear?: string;
    department?: string;
    positions?: JobMinorCategory[];
    slogan?: string;
    explanation?: string;
    stack?: string[];
    imagePreview?: { file: File; url: string } | null;
    cvPreview?: { file: File; url: string } | null;
    portfolioPreview?: { file: File; url: string } | null;
    links?: ExternalLink[];
  };
};

export const CreateProfilePage = () => {
  const state = useRouteLocation() as Body | null;

  if (state?.profileBody === undefined) {
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
