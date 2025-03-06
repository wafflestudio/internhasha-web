import { useLocation } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { Link, Series } from '@/entities/post';
import { CreateProfileForm } from '@/feature/applicant';
import { PatchCompanyForm } from '@/feature/company/ui/PatchCompanyForm';

type Body = {
  companyBody?: {
    id: string;
    companyName: string;
    explanation: string;
    email: string;
    slogan: string;
    investAmount?: number;
    investCompany: string[];
    series: Series;
    irDeckLink?: string;
    landingPageLink?: string;
    imageLink?: string;
    links?: Link[];
    tags?: string[];
  };
};

export const CreateProfilePage = () => {
  const location = useLocation();
  const state = location.state as Body | null;

  if (state?.companyBody === undefined) {
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
      <h1>회사 정보 수정하기</h1>
      <PatchCompanyForm />
    </div>
  );
};
