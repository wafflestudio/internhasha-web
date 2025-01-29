import { useLocation } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { Link, Series } from '@/entities/post';
import { CreateCompanyForm } from '@/feature/company';
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
    externalDescriptionLink?: Link[];
    tags?: string[];
  };
};

export const CreateCompanyPage = () => {
  const location = useLocation();
  const state = location.state as Body | null;

  if (state === null) {
    return (
      <div className="min-h-screen">
        <GlobalNavigationBar />
        <div className="flex flex-col w-[280px] sm:w-[460px] justify-center gap-[50px] mt-[30px] mx-auto">
          <h2 className="text-2xl font-bold">회사 정보 작성</h2>
          <CreateCompanyForm />
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
