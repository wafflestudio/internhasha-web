import { useLocation } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { JobMinorCategory } from '@/entities/post';
import { CreateProfileForm } from '@/feature/applicant';

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
  const location = useLocation();
  const state = location.state as Body | null;

  if (state?.profileBody === undefined) {
    return (
      <div className="min-h-screen">
        <GlobalNavigationBar />
        <div className="flex flex-col w-full sm:w-screen-sm md:w-screen-md lg:w-screen-lg justify-center gap-[50px] mx-auto my-[30px] px-6">
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
