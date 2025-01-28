import { useLocation } from 'react-router';

import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import type { Link, Series } from '@/entities/post';
import { PATH } from '@/entities/route';
import { CreateCompanyForm } from '@/feature/company';
import { PatchCompanyForm } from '@/feature/company/ui/PatchCompanyForm';
import { RouteNavigator } from '@/shared/route/RouteNavigator';

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
  const state = location.state as Body | undefined;

  if (state === undefined) {
    return <RouteNavigator link={PATH.INDEX} />;
  }

  const { companyBody } = state;

  if (companyBody === undefined) {
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
      <h1>채용 공고 작성하기</h1>
      <PatchCompanyForm />
    </div>
  );
};
