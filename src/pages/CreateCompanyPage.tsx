import { useLocation } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { Link, Series } from '@/entities/post';
import { CreateCompanyForm } from '@/feature/company';
import { PatchCompanyForm } from '@/feature/company';

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

export const CreateCompanyPage = () => {
  const location = useLocation();
  const state = location.state as Body | null;

  if (state?.companyBody === undefined) {
    return (
      <div className="min-h-screen">
        <GlobalNavigationBar />
        <div className="mx-auto my-[30px] flex w-full flex-col justify-center gap-[50px] px-6 sm:w-screen-sm md:w-screen-md lg:w-screen-lg">
          <h2 className="text-2xl font-bold text-grey-900">회사 정보 작성</h2>
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
