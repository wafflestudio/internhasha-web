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
      <div>
        <GlobalNavigationBar />
        <h1>회사 정보 작성하기</h1>
        <CreateCompanyForm />
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
